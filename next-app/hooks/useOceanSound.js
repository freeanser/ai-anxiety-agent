// next-app/src/hooks/useOceanSound.js

"use client";

// Use Web Audio API to create ocean sound effect
import { useState, useRef } from 'react';

const useOceanSound = () => {
  const audioContextRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const lfoNodeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    // 1. 初始化 AudioContext (瀏覽器要求必須在使用者互動後才能初始化)
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }

    // 2. 切換播放狀態
    if (isPlaying) {
      audioContextRef.current.suspend();
      setIsPlaying(false);
    } else {
      audioContextRef.current.resume();

      // 3. 如果是第一次播放，建立音訊節點網路
      if (!noiseNodeRef.current) {
        const bufferSize = 4096;
        // 注意: createScriptProcessor 已被視為舊標準，但在簡單應用中仍廣泛支援
        const noise = audioContextRef.current.createScriptProcessor(bufferSize, 1, 1);

        let lastOut = 0;
        noise.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // 布朗噪音算法 (Brownian noise approximation) 讓聲音更低沉柔和
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // 補償音量
          }
        };

        // 建立主音量控制
        const masterGain = audioContextRef.current.createGain();
        masterGain.gain.value = 0.15;

        // 建立低通濾波器 (模擬海浪的悶聲)
        const filter = audioContextRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 350;

        // 建立 LFO (低頻振盪器) 來模擬海浪的週期性起伏
        const lfo = audioContextRef.current.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.12; // 海浪頻率 (約 8 秒一次循環)

        // LFO 控制音量的增益
        const lfoGain = audioContextRef.current.createGain();
        lfoGain.gain.value = 0.08;

        // 連接節點: LFO -> LFO Gain -> Master Gain (控制音量變化)
        lfo.connect(lfoGain);
        lfoGain.connect(masterGain.gain);
        lfo.start();

        // 連接節點: Noise -> Filter -> Master Gain -> Output
        noise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(audioContextRef.current.destination);

        // 儲存參照以便後續控制
        noiseNodeRef.current = noise;
        gainNodeRef.current = masterGain;
        lfoNodeRef.current = lfo;
      }
      setIsPlaying(true);
    }
  };

  return { isPlaying, toggleSound };
};

// export default useOceanSound;
export { useOceanSound };