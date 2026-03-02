// next-app/src/components/layout/CozyRoomScene.jsx

"use client";
import React from 'react';
import CaptainCharacter from '../visuals/CaptainCharacter';

const CozyRoomScene = ({ children, onWindowClick, userName, onBeanClick, onCaptainClick, beanName = '豆豆' }) => (

  <div className="relative w-full h-64 md:h-80 bg-[#4A3B32] rounded-3xl overflow-hidden shadow-inner border-4 border-[#3E2723]">

    <div className="absolute inset-0 bg-[#5D4037] opacity-90"></div>

    <div

      onClick={onWindowClick}

      className="absolute top-4 right-12 w-24 h-32 bg-[#1a1a2e] rounded-t-full border-4 border-[#3E2723] overflow-hidden shadow-lg cursor-pointer hover:ring-4 hover:ring-[#FFB74D] hover:scale-105 transition-all duration-300 group z-10"

      title="去甲板透透氣"

    >

      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]"></div>

      <div className="star-1 absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>

      <div className="star-2 absolute top-8 left-10 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>

      <div className="star-3 absolute top-5 right-4 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-ping delay-1000 duration-1000"></div>

      <div className="absolute bottom-0 w-full h-1 bg-[#3E2723]"></div>

      <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[#3E2723]"></div>

      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

        <span className="text-white/80 text-[10px] font-bold">前往甲板</span>

      </div>

    </div>

    <div className="absolute bottom-0 left-8 w-32 h-36 bg-[#8D6E63] rounded-t-lg border-x-4 border-t-4 border-[#3E2723] flex items-end justify-center">

      <div className="w-24 h-24 bg-[#212121] rounded-t-full mb-0 relative overflow-hidden flex justify-center items-end pb-2">

        <div className="w-4 h-8 bg-orange-500 rounded-full blur-sm animate-bounce opacity-80"></div>

        <div className="w-3 h-10 bg-yellow-500 rounded-full blur-sm animate-pulse mx-1 -mt-2"></div>

        <div className="w-4 h-6 bg-red-500 rounded-full blur-sm animate-bounce delay-100 opacity-80"></div>

      </div>

    </div>

    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-32">

      <div className="absolute bottom-8 left-0 w-full h-8 bg-[#81C784] rounded-lg transform -rotate-1 shadow-md"></div>

      <div className="absolute bottom-16 left-0 w-full h-24 bg-[#66BB6A] rounded-t-lg transform -rotate-2"></div>

      <div className="absolute bottom-0 left-4 w-4 h-10 bg-[#3E2723]"></div>

      <div className="absolute bottom-0 right-4 w-4 h-10 bg-[#3E2723]"></div>

      <div className="absolute bottom-0 left-1/2 w-4 h-10 bg-[#3E2723] -ml-2"></div>

    </div>

    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-56 h-24 z-10 pointer-events-none flex justify-center items-end gap-2">

      <div

        onClick={(e) => { e.stopPropagation(); onBeanClick && onBeanClick(); }}

        className="w-24 h-24 transform scale-90 relative group pointer-events-auto cursor-pointer"

        title={`點擊尋求${beanName}協助`}

      >

        <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_5px_#FFD700]">

          {children}

        </div>

        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 text-[#5D4037] text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-[#8D6E63] z-50 pointer-events-none">

          我是副手 {beanName}

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-[#8D6E63]"></div>

        </div>

      </div>

      <div

        onClick={(e) => { e.stopPropagation(); onCaptainClick && onCaptainClick(); }}

        className="w-24 h-24 transform scale-95 -translate-y-1 relative group pointer-events-auto cursor-pointer"

        title="點擊設定船長資料"

      >

        <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_5px_#FFD700]">

          <CaptainCharacter />

        </div>

        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 text-[#5D4037] text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-[#8D6E63] z-50 pointer-events-none">

          我是船長 麻糬 {userName || ''}

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-[#8D6E63]"></div>

        </div>

      </div>

    </div>

    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-20 z-20 pointer-events-none flex justify-center items-end">

      <svg width="120" height="60" viewBox="0 0 120 60">

        <path d="M30,35 L20,60" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />

        <path d="M90,35 L100,60" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />

        <ellipse cx="60" cy="35" rx="45" ry="12" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />

        <g transform="translate(45, 22)">

          <path d="M0,0 L0,8 Q0,10 2,10 L8,10 Q10,10 10,8 L10,0 Z" fill="#FFF" stroke="#BCAAA4" strokeWidth="1" />

          <path d="M3,-2 Q5,-5 3,-8" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.6">

            <animate attributeName="d" values="M3,-2 Q5,-5 3,-8; M3,-4 Q0,-7 3,-10; M3,-2 Q5,-5 3,-8" dur="2s" repeatCount="indefinite" />

            <animate attributeName="opacity" values="0.6; 0; 0.6" dur="2s" repeatCount="indefinite" />

          </path>

        </g>

        <g transform="translate(65, 22)">

          <path d="M0,0 L0,8 Q0,10 2,10 L8,10 Q10,10 10,8 L10,0 Z" fill="#FFF" stroke="#BCAAA4" strokeWidth="1" />

          <path d="M3,-2 Q5,-5 3,-8" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.6">

            <animate attributeName="d" values="M3,-2 Q5,-5 3,-8; M3,-4 Q0,-7 3,-10; M3,-2 Q5,-5 3,-8" dur="2s" repeatCount="indefinite" begin="1s" />

            <animate attributeName="opacity" values="0.6; 0; 0.6" dur="2s" repeatCount="indefinite" begin="1s" />

          </path>

        </g>

      </svg>

    </div>

    <div className="absolute inset-0 bg-orange-500 opacity-10 pointer-events-none mix-blend-overlay"></div>

  </div>

);

export default CozyRoomScene;