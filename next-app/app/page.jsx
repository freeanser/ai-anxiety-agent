// next-app/src/app/page.js
"use client"; // 🌟 必加：告訴 Next.js 這是一個需要互動的客戶端元件

import React, { useState, useEffect } from 'react';

// 🌟 修改：路徑前面全部加上 ../
import { useOceanSound } from '../hooks/useOceanSound';
import { generateStepsAPI, generatePlanAPI, processUnplannedTaskAPI } from '../services/api';
import { INITIAL_LETTERS } from '../data/constants';

// Views
import InitialView from '../components/views/InitialView';
import StepsView from '../components/views/StepsView';
import RoomView from '../components/views/RoomView';
import DeckView from '../components/views/DeckView';

// Features
import Mailbox from '../components/features/Mailbox';
import FirstAid from '../components/features/FirstAid';

export default function App() {
  // --- Global State ---
  const [view, setView] = useState('initial');
  const [userName, setUserName] = useState('');
  const [beanName, setBeanName] = useState('豆豆');
  const [userGoal, setUserGoal] = useState('');

  // Data State
  const [letters, setLetters] = useState(INITIAL_LETTERS);
  const [generatedSteps, setGeneratedSteps] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [detailedPlan, setDetailedPlan] = useState({});
  const [monthlyPlan, setMonthlyPlan] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [energy, setEnergy] = useState(null);

  // UI State
  const [showMailbox, setShowMailbox] = useState(false);
  const [showFirstAid, setShowFirstAid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadMail, setHasUnreadMail] = useState(false);
  const [selectedRecharge, setSelectedRecharge] = useState([]);

  // Hooks
  const { isPlaying, toggleSound } = useOceanSound();

  // --- Handlers ---

  const handleGoalSubmit = async () => {
    setIsLoading(true);
    try {
      // 這裡完全不用改！它會自動去找我們寫好的 api.js，然後 api.js 會去找後端 /api/gemini
      const data = await generateStepsAPI(userGoal);
      setGeneratedSteps(data?.steps || ['制定計畫', '執行行動', '休息']);
      setView('steps');
    } catch (e) {
      console.error(e);
      setGeneratedSteps(['制定計畫', '執行行動', '休息']);
      setView('steps');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    const stepsToUse = selectedSteps.length > 0 ? selectedSteps : generatedSteps;
    try {
      const plan = await generatePlanAPI(userGoal, stepsToUse);
      setDetailedPlan(plan);
      const flatPlan = Object.values(plan).flat();
      setMonthlyPlan(flatPlan);
      setView('main');
    } catch (e) {
      console.error(e);
      setView('main');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnergySelect = (level) => {
    setEnergy(level);
    // 簡單的任務分配邏輯
    let tasks = [];
    if (level === 'high') tasks = monthlyPlan.slice(0, 3).map((t, i) => ({ id: i, title: t, completed: false, time: 0, isRunning: false }));
    else tasks = [{ id: 'rest', title: '深呼吸 5 次', completed: false, time: 0 }];
    setTodoList(tasks);
  };

  const toggleTimer = (id) => {
    setTodoList(prev => prev.map(t => t.id === id ? { ...t, isRunning: !t.isRunning } : t));
  };

  const completeTask = (task) => {
    setTodoList(prev => prev.map(t => t.id === task.id ? { ...t, completed: true, isRunning: false } : t));
  };

  // Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTodoList(list => list.map(t => t.isRunning ? { ...t, time: t.time + 1 } : t));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Render ---
  // (Render 區塊完全不用動，維持原樣！)

  return (
    <>
      {view === 'initial' && (
        <InitialView
          userName={userName} setUserName={setUserName}
          beanName={beanName} setBeanName={setBeanName}
          userGoal={userGoal} setUserGoal={setUserGoal}
          selectedRecharge={selectedRecharge}
          toggleRecharge={(item) => setSelectedRecharge(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
          onSubmit={handleGoalSubmit}
          isLoading={isLoading}
        />
      )}

      {view === 'steps' && (
        <StepsView
          userName={userName} userGoal={userGoal}
          generatedSteps={generatedSteps}
          selectedSteps={selectedSteps}
          toggleStep={(step) => setSelectedSteps(prev => prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step])}
          onBack={() => setView('initial')}
          onNext={handleGeneratePlan}
          isLoading={isLoading}
        />
      )}

      {view === 'main' && (
        <RoomView
          userName={userName} beanName={beanName}
          onSwitchToDeck={() => setView('deck')}
          onOpenMailbox={() => setShowMailbox(true)}
          onOpenFirstAid={() => setShowFirstAid(true)}
          isPlaying={isPlaying} toggleSound={toggleSound}
          hasUnreadMail={hasUnreadMail}
          energy={energy} setEnergy={handleEnergySelect}
          todoList={todoList} toggleTimer={toggleTimer} completeTask={completeTask}
        />
      )}

      {view === 'deck' && <DeckView onBack={() => setView('main')} />}

      {/* Modals */}
      <Mailbox
        isOpen={showMailbox} onClose={() => setShowMailbox(false)}
        letters={letters} selectedLetter={null} onSelectLetter={() => { }}
        onOpenWrite={() => { }} hasUnread={hasUnreadMail}
      />

      <FirstAid
        isOpen={showFirstAid} onClose={() => setShowFirstAid(false)}
        userName={userName} beanName={beanName}
      />
    </>
  );
}