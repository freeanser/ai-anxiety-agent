// 測試用 App.jsx (階段四)
import React, { useState } from 'react';
import InitialView from './components/views/InitialView';
import RoomView from './components/views/RoomView';
import { INITIAL_LETTERS } from './data/constants';

export default function App() {
  // 手動切換這裡的字串來測試不同頁面: 'initial' | 'room'
  const [view, setView] = useState('initial');

  // 模擬一些假資料
  const [userName, setUserName] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [selectedRecharge, setSelectedRecharge] = useState([]);

  return (
    <>
      <div className="fixed top-0 left-0 bg-black/80 text-white p-2 z-[9999]">
        <span className="mr-2">開發者控制台:</span>
        <button onClick={() => setView('initial')} className="mr-2 underline">初始頁</button>
        <button onClick={() => setView('room')} className="underline">房間頁</button>
      </div>

      {view === 'initial' && (
        <InitialView
          userName={userName} setUserName={setUserName}
          beanName="豆豆" setBeanName={() => { }}
          userGoal={userGoal} setUserGoal={setUserGoal}
          selectedRecharge={selectedRecharge}
          toggleRecharge={(item) => setSelectedRecharge(prev => [...prev, item])}
          onSubmit={() => alert('送出表單!')}
          isLoading={false}
        />
      )}

      {view === 'room' && (
        <RoomView
          userName="測試船長"
          beanName="豆豆"
          todoList={[{ id: 1, title: "測試任務", completed: false, time: 0, isRunning: false }]}
          energy="high"
          onOpenMailbox={() => alert('開信箱')}
        // ... 其他 props 可以先傳空函式 () => {}
        />
      )}
    </>
  );
}