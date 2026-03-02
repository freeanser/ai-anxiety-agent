// next-app/public/src/components/features/Mailbox.jsx

"use client";
import React from 'react';
import { Mail, X, ArrowLeft } from 'lucide-react';

const Mailbox = ({
  isOpen,
  onClose,
  letters = [],
  selectedLetter,
  onSelectLetter,
  onWriteLetter
}) => {
  // 如果信箱沒開啟，不渲染任何東西
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6 animate-fade-in">
      <div className="bg-[#FFF3E0] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col relative h-[600px] border-4 border-[#8D6E63]">

        {/* Header */}
        <div className="bg-[#8D6E63] p-4 flex items-center justify-between text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Mail /> 溫暖信箱
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">

          {/* Letter List (左側列表 / 手機版切換) */}
          <div className={`${selectedLetter ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-[#D7CCC8] bg-[#FFE0B2]/30 overflow-y-auto`}>
            {letters.map(letter => (
              <div
                key={letter.id}
                onClick={() => onSelectLetter(letter)}
                className={`p-4 border-b border-[#D7CCC8] cursor-pointer hover:bg-[#FFE0B2] transition-colors ${selectedLetter?.id === letter.id ? 'bg-[#FFE0B2]' : ''}`}
              >
                <h4 className="font-bold text-[#5D4037] text-sm truncate">{letter.title}</h4>
                <p className="text-xs text-[#8D6E63] truncate mt-1">{letter.content}</p>
              </div>
            ))}
            {letters.length === 0 && <div className="p-4 text-center text-[#8D6E63] text-sm">信箱是空的</div>}
          </div>

          {/* Letter Content (右側內容 / 手機版內容) */}
          <div className={`${selectedLetter ? 'block' : 'hidden md:flex'} w-full md:w-2/3 bg-[#FFF3E0] flex flex-col`}>
            {selectedLetter ? (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto relative">
                {/* 手機版返回按鈕 */}
                <button onClick={() => onSelectLetter(null)} className="md:hidden absolute top-2 left-2 text-[#8D6E63]">
                  <ArrowLeft size={20} />
                </button>

                {/* 信件內容卡片 */}
                <div className="mt-4 md:mt-0 bg-white p-6 shadow-sm rounded-lg flex-1 border border-[#E0E0E0]">
                  <h3 className="font-bold text-xl text-[#5D4037] mb-4 border-b pb-2 border-[#E0E0E0]">{selectedLetter.title}</h3>
                  <p className="text-[#5D4037] leading-loose whitespace-pre-wrap font-medium">{selectedLetter.content}</p>
                </div>

                {/* 寫信回應按鈕 */}
                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    onClick={onWriteLetter}
                    className="px-4 py-2 bg-[#81C784] hover:bg-[#66BB6A] text-white rounded-lg text-sm font-bold shadow-sm"
                  >
                    寫信回應
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#8D6E63] flex-col opacity-50">
                <Mail size={48} className="mb-2" />
                <p>選擇一封信閱讀</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mailbox;