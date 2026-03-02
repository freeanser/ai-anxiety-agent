// next-app/src/components/views/StepsView.jsx

"use client";
import React from 'react';
import { ArrowLeft, Check, Plus, Loader } from 'lucide-react';
import CuteBean from '../visuals/CuteBean';

const StepsView = ({
  userName, userGoal,
  generatedSteps, selectedSteps, toggleStep,
  onBack, onNext, isLoading
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#FDF6E3]">
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full relative">
      <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#F5F5F5]"><ArrowLeft /></button>
      <div className="flex items-center gap-4 mb-6 mt-8">
        <div className="w-16 h-16"><CuteBean /></div>
        <p className="text-[#5D4037]">為了達成「{userGoal}」，我們可以專注在這些步驟：</p>
      </div>
      <div className="space-y-3 mb-6">
        {generatedSteps.map((step, idx) => (
          <div key={idx} onClick={() => toggleStep(step)} className={`p-4 rounded-xl border-2 cursor-pointer flex justify-between ${selectedSteps.includes(step) ? 'bg-[#E8F5E9] border-[#81C784]' : 'border-[#EEE]'}`}>
            <span>{step}</span>
            {selectedSteps.includes(step) && <Check size={16} className="text-[#2E7D32]" />}
          </div>
        ))}
      </div>
      <button onClick={onNext} disabled={isLoading} className="w-full py-3 bg-[#81C784] text-white rounded-xl font-bold flex justify-center">
        {isLoading ? <Loader className="animate-spin" /> : '制定航行計畫'}
      </button>
    </div>
  </div>
);
export default StepsView;