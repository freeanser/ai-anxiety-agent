// next-app/src/components/features/FirstAid.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { BriefcaseMedical, X, Wind, Zap, Mic, Flame } from 'lucide-react';

import CuteBean from '../visuals/CuteBean';
import NurseBean from '../visuals/NurseBean';

const FirstAid = ({
  isOpen,
  onClose,
  userName,
  beanName = '豆豆',
  apiKey
}) => {
  // --- 內部狀態管理 ---
  const [mode, setMode] = useState('menu'); // 'menu', 'breathing', 'shredder'

  // 呼吸練習狀態
  const [breathPhase, setBreathPhase] = useState('');

  // 焦慮粉碎機狀態
  const [shreddingStep, setShreddingStep] = useState('input'); // 'input', 'analysis', 'burning'
  const [worryInput, setWorryInput] = useState('');
  const [analyzedWorries, setAnalyzedWorries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // --- 重置與關閉邏輯 ---
  const handleClose = () => {
    setMode('menu');
    setWorryInput('');
    setShreddingStep('input');
    onClose();
  };

  const returnToMenu = () => {
    setMode('menu');
    setWorryInput('');
    setShreddingStep('input');
  };

  // --- 語音輸入邏輯 ---
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'zh-TW';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setWorryInput(prev => (prev ? prev + ' ' : '') + transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      try { recognition.start(); } catch (err) { setIsListening(false); }
    } else {
      alert("您的瀏覽器不支援語音輸入功能。");
    }
  };

  // --- Gemini API 分析邏輯 (焦慮粉碎機) ---
  // const analyzeWorries = async () => {
  //   if (!worryInput.trim()) return;
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         contents: [{
  //           parts: [{
  //             text: `你是一位溫暖的心理支持夥伴${beanName}。使用者正在使用「焦慮粉碎機」。使用者的煩惱是：「${worryInput}」。
  //                    請分析這段煩惱，找出其中使用者「無法完全掌控」的因素（例如：他人的想法、他人的情緒、過去已發生的事、未來的結果、運氣、天氣等）。
  //                    請不要列出使用者可以掌控的事（如「準備面試」、「努力練習」）。
  //                    請回傳 JSON 格式，包含一個 uncontrollable_factors 陣列，裡面是簡短的名詞或短句（例如「主考官的心情」、「明天的天氣」）。`
  //           }]
  //         }],
  //         generationConfig: {
  //           responseMimeType: "application/json",
  //           responseSchema: {
  //             type: "OBJECT",
  //             properties: {
  //               uncontrollable_factors: {
  //                 type: "ARRAY",
  //                 items: { type: "STRING" }
  //               }
  //             }
  //           }
  //         }
  //       })
  //     });
  //     const data = await response.json();
  //     const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);

  //     if (result && result.uncontrollable_factors && result.uncontrollable_factors.length > 0) {
  //       setAnalyzedWorries(result.uncontrollable_factors);
  //     } else {
  //       setAnalyzedWorries(['外界的看法', '不可控的結果']);
  //     }
  //     setShreddingStep('analysis');
  //   } catch (error) {
  //     console.error("Analysis failed", error);
  //     setAnalyzedWorries(['外界的看法', '不可控的結果']);
  //     setShreddingStep('analysis');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // --- Gemini API 分析邏輯 (焦慮粉碎機) ---
  const analyzeWorries = async () => {
    if (!worryInput.trim()) return;
    setIsLoading(true);
    try {
      // 1. 準備好要給 AI 的完整提示詞
      const promptText = `你是一位溫暖的心理支持夥伴${beanName}。使用者正在使用「焦慮粉碎機」。使用者的煩惱是：「${worryInput}」。
      請分析這段煩惱，找出其中使用者「無法完全掌控」的因素（例如：他人的想法、他人的情緒、過去已發生的事、未來的結果、運氣、天氣等）。
      請不要列出使用者可以掌控的事（如「準備面試」、「努力練習」）。
      請只回傳乾淨的 JSON 格式，包含一個 uncontrollable_factors 陣列，裡面是簡短的名詞或短句（例如「主考官的心情」、「明天的天氣」），不要包含其他 Markdown 標籤。`;

      // 2. 呼叫你自己的 Next.js 後端 (不用帶 Key！)
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });

      const data = await response.json();

      // 3. 解析後端傳回來的資料
      // (假設後端已經幫我們把 Google 囉嗦的結構拆解，只傳回純文字字串)
      const resultText = data.text;
      const result = JSON.parse(resultText);

      if (result && result.uncontrollable_factors && result.uncontrollable_factors.length > 0) {
        setAnalyzedWorries(result.uncontrollable_factors);
      } else {
        setAnalyzedWorries(['外界的看法', '不可控的結果']);
      }
      setShreddingStep('analysis');
    } catch (error) {
      console.error("Analysis failed", error);
      setAnalyzedWorries(['外界的看法', '不可控的結果']);
      setShreddingStep('analysis');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Effect: 自動燃燒邏輯 ---
  useEffect(() => {
    if (isOpen && mode === 'shredder' && shreddingStep === 'analysis') {
      const timer = setTimeout(() => {
        setShreddingStep('burning');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, mode, shreddingStep]);

  // --- Effect: 呼吸練習循環 ---
  useEffect(() => {
    if (!isOpen || mode !== 'breathing') return;

    const cycle = () => {
      setBreathPhase('吸氣');
      setTimeout(() => {
        setBreathPhase('屏氣');
        setTimeout(() => {
          setBreathPhase('吐氣');
        }, 4000);
      }, 4000);
    };

    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, [isOpen, mode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-fade-in">
      <div className="bg-[#E0F2F1] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center relative p-6 min-h-[400px]">

        {/* 關閉按鈕 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#00695C] hover:bg-[#B2DFDB] rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-[#00695C] mb-6 tracking-wide flex items-center gap-2">
          <BriefcaseMedical /> 急救中心
        </h3>

        {/* === 模式 1: 主選單 === */}
        {mode === 'menu' && (
          <div className="grid grid-cols-1 gap-4 w-full">
            <button onClick={() => setMode('breathing')} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 bg-[#4DB6AC] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Wind size={24} /></div>
              <div className="text-left"><h4 className="font-bold text-[#00695C] text-lg">深呼吸練習</h4><p className="text-[#004D40] text-sm opacity-70">快速平復生理焦慮</p></div>
            </button>
            <button onClick={() => setMode('shredder')} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 bg-[#EF5350] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Zap size={24} /></div>
              <div className="text-left"><h4 className="font-bold text-[#C62828] text-lg">焦慮粉碎機</h4><p className="text-[#B71C1C] text-sm opacity-70">把無法掌控的事燒掉</p></div>
            </button>
          </div>
        )}

        {/* === 模式 2: 深呼吸練習 === */}
        {mode === 'breathing' && (
          <div className="flex flex-col items-center w-full">
            <div className="relative flex items-center justify-center w-56 h-56 mb-6">
              <div className={`absolute inset-0 bg-[#4DB6AC] rounded-full opacity-20 transition-transform duration-[4000ms] ease-in-out ${breathPhase === '吸氣' ? 'scale-100' : (breathPhase === '屏氣' ? 'scale-100' : 'scale-50')}`}></div>
              <div className={`w-28 h-28 bg-[#009688] rounded-full flex items-center justify-center shadow-lg transition-all duration-[4000ms] ease-in-out ${breathPhase === '吸氣' ? 'scale-150 opacity-100' : (breathPhase === '屏氣' ? 'scale-150 opacity-100' : 'scale-100 opacity-80')}`}>
                <span className="text-white font-bold text-xl animate-fade-in">{breathPhase}</span>
              </div>
            </div>
            <p className="text-[#004D40] text-center opacity-80 font-medium mb-6">慢慢吸氣... 屏住... 輕輕吐氣...<br />放鬆肩膀和身體</p>
            <button onClick={returnToMenu} className="text-[#00695C] hover:underline">返回選單</button>
          </div>
        )}

        {/* === 模式 3: 焦慮粉碎機 === */}
        {mode === 'shredder' && (
          <div className="flex flex-col items-center w-full h-full">

            {/* 步驟 A: 輸入煩惱 */}
            {shreddingStep === 'input' && (
              <>
                <div className="w-32 h-32 mb-4 animate-bounce-slow"><NurseBean /></div>
                <p className="text-[#5D4037] mb-4 text-center">告訴{beanName}發生了什麼事，<br />讓你感到不知所措？</p>
                <div className="w-full mt-6 relative">
                  <textarea
                    className="w-full h-32 p-4 rounded-xl bg-white border-2 border-[#E0E0E0] text-[#5D4037] mb-4 outline-none focus:border-[#EF5350] resize-none"
                    placeholder="例如：收到了拒信，覺得自己很差..."
                    value={worryInput}
                    onChange={(e) => setWorryInput(e.target.value)}
                  />
                  <button
                    className={`absolute right-2 bottom-6 p-2 rounded-xl transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-[#8D6E63] hover:bg-[#FFE0B2]'}`}
                    onClick={startListening}
                    title="語音輸入"
                  >
                    <Mic size={20} />
                  </button>
                </div>
                <button
                  onClick={analyzeWorries}
                  disabled={!worryInput.trim() || isLoading}
                  className="w-full py-3 bg-[#EF5350] hover:bg-[#D32F2F] text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? '分析中...' : '幫我分析'}
                </button>
              </>
            )}

            {/* 步驟 B: 分析結果展示 */}
            {shreddingStep === 'analysis' && (
              <div className="relative w-full h-full flex flex-col items-center justify-center animate-fade-in">
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0 animate-flame-fade-in">
                  <Flame size={160} className="text-orange-500/80 filter blur-sm" />
                </div>
                <p className="text-[#5D4037] mb-4 text-center font-bold relative z-20">
                  {beanName}發現這些是<br /><span className="text-[#D32F2F]">你無法掌控的</span>：
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-20">
                  {analyzedWorries.map((worry, idx) => (
                    <div key={idx} className="bg-white border-2 border-[#EF5350] text-[#D32F2F] px-4 py-2 rounded-full font-bold shadow-sm transform rotate-[-2deg] odd:rotate-[2deg]">
                      {worry}
                    </div>
                  ))}
                </div>
                <p className="text-[#5D4037] text-sm mb-4 text-center opacity-80 relative z-20">
                  既然無法掌控，就別讓它們佔據你的心。<br />正在準備銷毀...
                </p>
              </div>
            )}

            {/* 步驟 C: 燃燒與釋放 */}
            {shreddingStep === 'burning' && (
              <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl animate-pulse opacity-50"></div>
                  <Flame size={80} className="text-orange-600 animate-bounce relative z-10 mx-auto" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <span className="text-xs text-white font-bold animate-ping">POOF!</span>
                  </div>
                </div>

                <p className="text-[#5D4037] font-bold text-lg mb-4 text-center">我幫你把這些壞東西都燒乾淨了！</p>
                <div className="text-[#5D4037] text-sm mb-8 opacity-80 text-center leading-relaxed">
                  <p>{userName ? userName : ''}你已經做得很好了。</p>
                  <p>讓我們一起專注在當下能執行的事情是什麼。</p>
                </div>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-[#81C784] hover:bg-[#66BB6A] text-white rounded-xl font-bold transition-all shadow-md active:translate-y-0.5 active:shadow-none flex items-center gap-2"
                >
                  <div className="w-6 h-6"><CuteBean emotion="happy" /></div>
                  需要幫忙時，我都在，隨時可以回來
                </button>
              </div>
            )}

            {shreddingStep !== 'burning' && shreddingStep !== 'analysis' && (
              <button onClick={returnToMenu} className="mt-4 text-[#00695C] hover:underline text-sm">返回選單</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstAid;