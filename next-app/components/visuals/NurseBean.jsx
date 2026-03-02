// next-app/src/components/visuals/NurseBean.jsx

"use client";
import React from 'react';
const NurseBean = () => (

  <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">

    <g transform="translate(0, 10)">

      <path d="M20,60 Q20,10 50,10 T80,60 Q80,100 50,100 T20,60" fill="#FFE4B5" stroke="#8B4513" strokeWidth="3" />

      <g transform="translate(30, -5)">

        <path d="M0,15 L40,15 L35,0 L5,0 Z" fill="#FFF" stroke="#E57373" strokeWidth="2" />

        <path d="M20,4 L20,11 M16.5,7.5 L23.5,7.5" stroke="#EF5350" strokeWidth="2" />

      </g>

      <circle cx="35" cy="45" r="4" fill="#3E2723" />

      <circle cx="65" cy="45" r="4" fill="#3E2723" />

      <circle cx="25" cy="55" r="5" fill="#FFB6C1" opacity="0.6" />

      <circle cx="75" cy="55" r="5" fill="#FFB6C1" opacity="0.6" />

      <path d="M40,55 Q50,65 60,55" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />

      <path d="M22,65 Q30,80 35,80" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

      <path d="M78,65 Q70,80 65,80" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

      <g transform="translate(30, 70)">

        <rect x="0" y="0" width="40" height="30" rx="3" fill="#EF5350" stroke="#B71C1C" strokeWidth="2" />

        <path d="M15,0 L15,-4 Q15,-8 20,-8 Q25,-8 25,-4 L25,0" fill="none" stroke="#B71C1C" strokeWidth="2" />

        <circle cx="20" cy="15" r="8" fill="white" />

        <path d="M20,10 L20,20 M15,15 L25,15" stroke="#EF5350" strokeWidth="3" strokeLinecap="round" />

      </g>

      <path d="M35,95 L35,110" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

      <path d="M65,95 L65,110" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

    </g>

  </svg>

);
export default NurseBean;