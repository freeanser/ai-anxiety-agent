// next-app/src/components/visuals/CaptainCharacter

"use client";
import React from 'react';
const CaptainCharacter = () => (

  <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">

    <g transform="translate(0, 10)">

      <path d="M15,60 Q15,15 50,15 T85,60 Q85,100 50,100 T15,60" fill="#FFF" stroke="#5D4037" strokeWidth="3" />

      <g transform="translate(0, -5)">

        <path d="M30,20 L70,20 L75,15 L25,15 Z" fill="#1A237E" stroke="#1A237E" strokeWidth="2" />

        <path d="M30,20 Q50,5 70,20" fill="#FFF" stroke="#5D4037" strokeWidth="2" />

        <circle cx="50" cy="15" r="3" fill="#FFD700" />

      </g>

      <circle cx="35" cy="50" r="3" fill="#3E2723" />

      <circle cx="65" cy="50" r="3" fill="#3E2723" />

      <circle cx="25" cy="60" r="4" fill="#FFCDD2" opacity="0.6" />

      <circle cx="75" cy="60" r="4" fill="#FFCDD2" opacity="0.6" />

      <path d="M45,58 Q50,62 55,58" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />

      <path d="M35,95 Q30,105 40,105" fill="none" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

      <path d="M65,95 Q70,105 60,105" fill="none" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

      <g transform="translate(25, 65)">

        <path d="M-5,0 Q5,5 10,5" fill="none" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

        <path d="M55,0 Q45,5 40,5" fill="none" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

        <rect x="5" y="0" width="40" height="25" fill="#8D6E63" rx="2" stroke="#5D4037" />

        <path d="M5,2 Q25,5 45,2" fill="none" stroke="#5D4037" strokeWidth="1" opacity="0.5" />

        <rect x="7" y="2" width="17" height="21" fill="#FFF8E1" />

        <rect x="26" y="2" width="17" height="21" fill="#FFF8E1" />

        <line x1="9" y1="6" x2="22" y2="6" stroke="#BCAAA4" strokeWidth="1" />

        <line x1="9" y1="10" x2="22" y2="10" stroke="#BCAAA4" strokeWidth="1" />

        <line x1="28" y1="6" x2="41" y2="6" stroke="#BCAAA4" strokeWidth="1" />

        <line x1="28" y1="10" x2="41" y2="10" stroke="#BCAAA4" strokeWidth="1" />

      </g>

    </g>

  </svg>

);
export default CaptainCharacter;