// next-app/src/components/views/DeckView.jsx

"use client";
import React from 'react';
import { Moon, Star } from 'lucide-react';
import CaptainCharacter from '../visuals/CaptainCharacter';
import { OTHER_USERS_GOALS } from '../../data/constants';

const DeckView = ({ onBack }) => {
  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center">
      {/* 背景元素：月亮 */}
      <div className="absolute top-10 right-10 text-yellow-100 animate-pulse">
        <Moon size={40} />
      </div>

      {/* 漂流的星星 (其他人的目標) */}
      {OTHER_USERS_GOALS.map(goal => (
        <div key={goal.id} className="absolute animate-pulse" style={{ left: goal.x, top: goal.y }}>
          <div className="group relative cursor-pointer">
            <Star size={16} className="text-yellow-200 fill-current opacity-70" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 text-[#5D4037] font-bold p-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              {goal.text}
              {/* 小箭頭 */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 transform rotate-45"></div>
            </div>
          </div>
        </div>
      ))}

      {/* 海浪背景 */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0c4a6e] to-[#1e293b] opacity-80"></div>

      {/* 船長與 UI */}
      <div className="z-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-4 text-white/90">深夜甲板</h2>
        <p className="text-blue-200 mb-8">在這裡，看見其他航行者的光亮</p>

        <div className="w-40 h-40 mx-auto mb-8 relative">
          <CaptainCharacter />
        </div>

        <button
          onClick={onBack}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/30 transition-all text-white font-bold"
        >
          回到船艙
        </button>
      </div>
    </div>
  );
};

export default DeckView;