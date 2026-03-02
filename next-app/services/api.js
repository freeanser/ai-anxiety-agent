// // next-app/public/src/services/api.js

"use client";

// 1：不需要再引入任何 API Key 了，因為我們會呼叫自己後端的 API 路由，讓後端去處理跟 Google 的溝通

const callGemini = async (prompt) => {
  // 2：不再直接呼叫 Google，而是呼叫我們自己的 Next.js API 路由
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }) // 只負責把使用者的 prompt 傳給後端
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();

  // 3：解析後端從 Google 那邊拿回來的資料（維持你原本的解析邏輯）
  return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
};

// ====================
// prompt 封裝函數
// ====================

// 1. 分析煩惱
export const analyzeWorriesAPI = async (text) => {
  const prompt = `你是一位溫暖的心理支持夥伴豆豆。使用者的煩惱是：「${text}」。請分析這段煩惱，找出其中使用者「無法完全掌控」的因素。請回傳 JSON 格式，包含一個 uncontrollable_factors 陣列，裡面是簡短的名詞或短句。`;
  return await callGemini(prompt);
};

// 2. 拆解目標
export const generateStepsAPI = async (goal) => {
  const prompt = `你是一位溫暖的航海副手豆豆。使用者的目標是：${goal}。請幫忙拆解成 5 個具體、可行且正向的大方向步驟。每個步驟不超過 15 個字。請回傳 JSON 格式，包含一個 steps 陣列。`;
  return await callGemini(prompt);
};

// 3. 產生詳細月度計畫
export const generatePlanAPI = async (goal, steps) => {
  const prompt = `你是一位專業的航海副手豆豆。使用者的主目標是：「${goal}」。關鍵任務：${JSON.stringify(steps)}。請針對每一個關鍵任務，分別拆解出 3 個「非常具體、實際執行」的子步驟。請回傳 JSON 格式，Key 是關鍵任務名稱，Value 是包含 3 個子步驟字串的陣列。`;
  return await callGemini(prompt);
};

// 4. 處理非計畫任務 (Unplanned)
export const processUnplannedTaskAPI = async (input) => {
  const prompt = `你是一位貼心的航海副手豆豆。使用者剛剛完成了一件不在原本清單上的事情：${input}。請幫我將這件事簡化成一個簡短的任務標題，不超過 10 個字。請回傳 JSON 格式 { "title": "簡化後的標題" }`;
  const result = await callGemini(prompt);
  return result.title;
};



// // const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; // 建議使用環境變數

// const callGemini = async (prompt) => {
//   if (!API_KEY) throw new Error("API Key not set");
//   const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       contents: [{ parts: [{ text: prompt }] }],
//       generationConfig: { responseMimeType: "application/json" }
//     })
//   });
//   const data = await response.json();
//   return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
// };

// // 1. 分析煩惱
// export const analyzeWorriesAPI = async (text) => {
//   const prompt = `你是一位溫暖的心理支持夥伴豆豆。使用者的煩惱是：「${text}」。請分析這段煩惱，找出其中使用者「無法完全掌控」的因素。請回傳 JSON 格式，包含一個 uncontrollable_factors 陣列，裡面是簡短的名詞或短句。`;
//   return await callGemini(prompt);
// };

// // 2. 拆解目標
// export const generateStepsAPI = async (goal) => {
//   const prompt = `你是一位溫暖的航海副手豆豆。使用者的目標是：${goal}。請幫忙拆解成 5 個具體、可行且正向的大方向步驟。每個步驟不超過 15 個字。請回傳 JSON 格式，包含一個 steps 陣列。`;
//   return await callGemini(prompt);
// };

// // 3. 產生詳細月度計畫
// export const generatePlanAPI = async (goal, steps) => {
//   const prompt = `你是一位專業的航海副手豆豆。使用者的主目標是：「${goal}」。關鍵任務：${JSON.stringify(steps)}。請針對每一個關鍵任務，分別拆解出 3 個「非常具體、實際執行」的子步驟。請回傳 JSON 格式，Key 是關鍵任務名稱，Value 是包含 3 個子步驟字串的陣列。`;
//   return await callGemini(prompt);
// };

// // 4. 處理非計畫任務 (Unplanned)
// export const processUnplannedTaskAPI = async (input) => {
//   // 這裡稍微修改回傳格式以符合純文字需求，或者也可以用 JSON
//   const prompt = `你是一位貼心的航海副手豆豆。使用者剛剛完成了一件不在原本清單上的事情：${input}。請幫我將這件事簡化成一個簡短的任務標題，不超過 10 個字。請回傳 JSON 格式 { "title": "簡化後的標題" }`;
//   const result = await callGemini(prompt);
//   return result.title;
// };