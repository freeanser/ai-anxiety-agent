// next-app/src/components/visuals/CuteBean.jsx

"use client";
import React from 'react';

const CuteBean = ({ emotion = 'happy', pose = 'standing' }) => (

  <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">

    <g transform={pose === 'sitting' ? "translate(0, 10)" : ""}>

      <path d="M20,60 Q20,10 50,10 T80,60 Q80,100 50,100 T20,60" fill="#FFE4B5" stroke="#8B4513" strokeWidth="3" />

      {emotion === 'happy' ? (

        <>

          <circle cx="35" cy="45" r="4" fill="#3E2723" />

          <circle cx="65" cy="45" r="4" fill="#3E2723" />

        </>

      ) : emotion === 'worried' ? (

        <>

          <path d="M30,48 Q35,42 40,48" stroke="#3E2723" strokeWidth="2" fill="none" />

          <path d="M60,48 Q65,42 70,48" stroke="#3E2723" strokeWidth="2" fill="none" />

        </>

      ) : (

        <>

          <circle cx="35" cy="45" r="4" fill="#3E2723" />

          <circle cx="65" cy="45" r="4" fill="#3E2723" />

        </>

      )}

      <circle cx="25" cy="55" r="5" fill="#FFB6C1" opacity="0.6" />

      <circle cx="75" cy="55" r="5" fill="#FFB6C1" opacity="0.6" />

      {emotion === 'happy' && <path d="M40,55 Q50,65 60,55" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />}

      {emotion === 'worried' && <path d="M42,60 Q50,55 58,60" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />}

      {pose === 'standing' ? (

        <>

          <path d="M20,60 Q10,70 15,80" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          <path d="M80,60 Q90,70 85,80" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          <path d="M35,95 L35,110" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          <path d="M65,95 L65,110" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

        </>

      ) : (

        <>

          <path d="M35,95 Q30,105 45,105" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          <path d="M65,95 Q70,105 55,105" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          <g transform="translate(25, 65)">

            <path d="M-5,0 Q5,5 10,5" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

            <path d="M55,0 Q45,5 40,5" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

            <rect x="5" y="0" width="40" height="25" fill="#5D4037" rx="2" stroke="#3E2723" />

            <path d="M5,2 Q25,5 45,2" fill="none" stroke="#3E2723" strokeWidth="1" opacity="0.5" />

            <rect x="7" y="2" width="17" height="21" fill="#FFF8E1" />

            <rect x="26" y="2" width="17" height="21" fill="#FFF8E1" />

            <line x1="9" y1="6" x2="22" y2="6" stroke="#BCAAA4" strokeWidth="1" />

            <line x1="9" y1="10" x2="22" y2="10" stroke="#BCAAA4" strokeWidth="1" />

            <line x1="28" y1="6" x2="41" y2="6" stroke="#BCAAA4" strokeWidth="1" />

            <line x1="28" y1="10" x2="41" y2="10" stroke="#BCAAA4" strokeWidth="1" />

          </g>

        </>

      )}

    </g>

  </svg>

);

export default CuteBean;