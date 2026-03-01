// src/components/views/RoomView.jsx

import React from 'react';
import { Settings, Volume2, VolumeX, Map, Mail, Battery, Coffee, Play, Pause, Check } from 'lucide-react';
import CozyRoomScene from '../layout/CozyRoomScene';
import CuteBean from '../visuals/CuteBean';

const RoomView = ({
  userName, beanName,
  onSwitchToDeck, onOpenBeanHelp, onOpenCaptainSettings, onOpenMailbox, onOpenFirstAid, onOpenMap,
  isPlaying, toggleSound, hasUnreadMail,
  energy, setEnergy, todoList, toggleTimer, completeTask
}) => {
  return (
    <div className="min-h-screen bg-[#FDF6E3] pb-10">
      <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
        <div className="relative mb-6">
          <CozyRoomScene
            onWindowClick={onSwitchToDeck}
            userName={userName}
            beanName={beanName}
            onBeanClick={onOpenBeanHelp}
            onCaptainClick={onOpenCaptainSettings}
          >
            <CuteBean emotion="happy" pose="sitting" />
          </CozyRoomScene>

          {/* 頂部按鈕列 (Settings, Sound, FirstAid, Map, Mail) */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button onClick={onOpenFirstAid} className="p-2 bg-[#F44336] rounded-xl text-white">急救</button>
            <button onClick={toggleSound} className="p-2 bg-black/30 rounded-xl text-white">{isPlaying ? <Volume2 /> : <VolumeX />}</button>
          </div>
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button onClick={onOpenMap} className="p-2 bg-[#FFB74D] rounded-xl text-white"><Map /></button>
            <button onClick={onOpenMailbox} className="p-2 bg-black/30 rounded-xl text-white relative"><Mail />{hasUnreadMail && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />}</button>
          </div>
        </div>

        {/* 能量選擇 */}
        {!energy ? (
          <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-[#E0E0E0]">
            <h2 className="text-xl font-bold text-[#5D4037] mb-4 text-center">今天感覺如何？</h2>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setEnergy('high')} className="p-4 bg-[#E8F5E9] rounded-2xl flex flex-col items-center"><Battery className="text-green-600" /><span className="text-green-800 font-bold">滿滿</span></button>
              <button onClick={() => setEnergy('medium')} className="p-4 bg-[#FFF3E0] rounded-2xl flex flex-col items-center"><Battery className="text-orange-600" /><span className="text-orange-800 font-bold">普通</span></button>
              <button onClick={() => setEnergy('low')} className="p-4 bg-[#EFEBE9] rounded-2xl flex flex-col items-center"><Battery className="text-brown-600" /><span className="text-[#5D4037] font-bold">低落</span></button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-[#E0E0E0]">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold text-[#5D4037] flex gap-2"><Coffee /> 今日旅程</h2>
              <button onClick={() => setEnergy(null)} className="text-xs text-gray-500 underline">重選</button>
            </div>
            <div className="space-y-3">
              {todoList.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-2xl border border-[#EEE]">
                  <div className="flex items-center gap-3">
                    <button onClick={() => completeTask(task)} className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center ${task.completed ? 'bg-[#E8F5E9]' : ''}`}>{task.completed && <Check size={16} color="green" />}</button>
                    <span className={task.completed ? 'line-through text-gray-400' : 'text-[#5D4037]'}>{task.title}</span>
                  </div>
                  {!task.completed && <button onClick={() => toggleTimer(task.id)} className="p-2 bg-[#EEE] rounded-xl">{task.isRunning ? <Pause size={16} /> : <Play size={16} />}</button>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomView;