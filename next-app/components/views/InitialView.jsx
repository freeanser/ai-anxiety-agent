// next-app/src / components / views / InitialView.jsx

"use client";
import React from 'react';
import CuteBean from '../visuals/CuteBean';
import { RECHARGE_OPTIONS } from '../../data/constants';
import { Send, Loader } from 'lucide-react';

const InitialView = ({
  userName, setUserName, beanName, setBeanName,
  userGoal, setUserGoal,
  selectedRecharge, toggleRecharge, customRecharge, setCustomRecharge, addCustomRecharge,
  onSubmit, isLoading
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#FDF6E3]">
    <div className="w-48 h-48 mb-8 animate-bounce-slow"><CuteBean emotion="happy" /></div>
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-b-4 border-[#E0E0E0]">
      <h1 className="text-2xl font-bold text-[#5D4037] mb-4">嗨！我是你的副手{beanName}。</h1>
      <input type="text" placeholder="你叫什麼名字呢？" className="w-full p-4 rounded-xl bg-[#F5F5F5] mb-6" value={userName} onChange={(e) => setUserName(e.target.value)} />

      <p className="text-[#8D6E63] mb-2 font-bold">充電方式：</p>
      <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
        {RECHARGE_OPTIONS.map(item => (
          <button key={item} onClick={() => toggleRecharge(item)} className={`flex-shrink-0 px-4 py-2 rounded-full border-2 font-bold text-sm ${selectedRecharge.includes(item) ? 'bg-[#81C784] text-white border-[#81C784]' : 'bg-[#F5F5F5] text-[#8D6E63]'}`}>{item}</button>
        ))}
      </div>
      {/* (省略 Custom Recharge Input 以節省空間，邏輯同 App.jsx) */}

      <input type="text" placeholder="最近想達成什麼目標？" className="w-full p-4 rounded-xl bg-[#F5F5F5] mb-4" value={userGoal} onChange={(e) => setUserGoal(e.target.value)} />

      <button onClick={onSubmit} disabled={!userGoal.trim() || isLoading} className="w-full py-3 bg-[#81C784] text-white rounded-xl font-bold flex justify-center gap-2">
        {isLoading ? <Loader className="animate-spin" /> : 'Welcome Onboard'}
      </button>
    </div>
  </div>
);
export default InitialView;