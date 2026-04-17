// // next-app/public/src/services/api.js

"use client";


const callGemini = async (prompt) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }) // 只負責把使用者的 prompt 傳給後端
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();

  // 解析後端從 Google 那邊拿回來的資料（維持你原本的解析邏輯）
  return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
};

// 專家註冊表：根據不同領域，動態注入專屬的限制與關鍵字
const EXPERT_REGISTRY = {
  software_engineer: `
    1. 領域具體化：必須精準針對「軟體工程師」的面試與求職痛點給出建議。
    2. 使用關鍵字：步驟中請務必包含實務名詞（例如：練習 LeetCode DSA、準備 GitHub 專案作品集、複習面試常考八股文、系統設計、每日投遞履歷）。
  `,
  designer: `
    1. 領域具體化：精準針對「設計師 (UI/UX 或平面)」的求職痛點給出建議。
    2. 使用關鍵字：請包含實務名詞（例如：優化 Behance/Figma 作品集、準備設計思考(Design Thinking)白板題、Redesign 練習、迭代過程紀錄）。
  `,
  // ... 你可以隨時在這裡擴充更多職業
  general: `
    1. 保持具體：請針對使用者的目標給出明確的行動指示。
    2. 拒絕空泛：絕對不要使用抽象的成語或口號，請給出「動詞 + 具體名詞」的步驟。
  `
};
// ====================
// prompt 封裝函數
// ====================

// 分析煩惱
export const analyzeWorriesAPI = async (text) => {
  const prompt = `你是一位溫暖的心理支持夥伴豆豆。使用者的煩惱是：「${text}」。請分析這段煩惱，找出其中使用者「無法完全掌控」的因素。請回傳 JSON 格式，包含一個 uncontrollable_factors 陣列，裡面是簡短的名詞或短句。`;
  return await callGemini(prompt);
};

export const generateStepsAPI = async (goal) => {
  // ----------------------------------------------------------------
  // 階段一：意圖分類器升級 - 判斷風險 + 萃取領域
  // ----------------------------------------------------------------
  const classifierPrompt = `
    你是一個精準的意圖與領域分類器。請分析以下使用者的目標：「${goal}」
    
    請回傳 JSON 格式：
    { 
      "riskLevel": "High-Stakes" 或 "Low-Stakes" (涉及醫療、金融、法律、重大考試、職涯,...屬 High-Stakes),
      "domain": "software_engineer" | "designer" | "general" (請根據使用者輸入判斷最符合的職業領域，若無明確提及或不符合上述清單，請填 "general")
    }
  `;

  // 第一次 API 呼叫：取得風險等級與領域
  const classification = await callGemini(classifierPrompt);
  const riskLevel = classification?.riskLevel || "Low-Stakes";
  const domain = classification?.domain || "general";

  // 動態抓取對應的專家規則（如果分類器回傳奇怪的字，預設退回 general）
  const expertRules = EXPERT_REGISTRY[domain] || EXPERT_REGISTRY.general;

  let executionPrompt = "";

  // ----------------------------------------------------------------
  // 階段二：動態組裝 Prompt (Dynamic Prompt Assembly)
  // ----------------------------------------------------------------
  if (riskLevel === 'High-Stakes') {
    console.log(`啟動高風險護欄，套用領域：${domain}`);
    executionPrompt = `
      你是一位具備 20 年資歷的權威規劃顧問。使用者的目標涉及高風險領域：「${goal}」。
      請提供極度嚴謹、安全的執行計畫。

      【硬編碼護欄 - 違反將導致系統阻斷】：
      1. 絕不提供確切診斷、投資明牌或保證結果的偏方。

      【領域專家建議 - 必讀】：
      ${expertRules}

      請將計畫拆解成 5 個具體步驟，每個步驟不超過 15 個字。
      嚴格回傳 JSON：{ "steps": ["步驟1", "步驟2", "步驟3", "步驟4", "步驟5"] }
    `;
  } else {
    console.log(`啟動溫暖夥伴模式，套用領域：${domain}`);
    executionPrompt = `
      你是一位溫暖且具備專業領域知識的航海副手豆豆。
      使用者的目標與煩惱是：「${goal}」。
      請幫忙拆解成 5 個具體、可行且正向的行動步驟。

      【重點要求 - 必讀】：
      ${expertRules}
      3. 每個步驟字數精簡，不超過 15 個字。

      嚴格回傳 JSON：{ "steps": ["步驟1", "步驟2", "步驟3", "步驟4", "步驟5"] }
    `;
  }

  // ----------------------------------------------------------------
  // 階段三：最終生成
  // ----------------------------------------------------------------
  return await callGemini(executionPrompt);
};

// 產生詳細月度計畫
export const generatePlanAPI = async (goal, steps) => {
  const prompt = `你是一位專業的航海副手豆豆。使用者的主目標是：「${goal}」。關鍵任務：${JSON.stringify(steps)}。請針對每一個關鍵任務，分別拆解出 3 個「非常具體、實際執行」的子步驟。請回傳 JSON 格式，Key 是關鍵任務名稱，Value 是包含 3 個子步驟字串的陣列。`;
  return await callGemini(prompt);
};

// 處理非計畫任務 (Unplanned)
export const processUnplannedTaskAPI = async (input) => {
  const prompt = `你是一位貼心的航海副手豆豆。使用者剛剛完成了一件不在原本清單上的事情：${input}。請幫我將這件事簡化成一個簡短的任務標題，不超過 10 個字。請回傳 JSON 格式 { "title": "簡化後的標題" }`;
  const result = await callGemini(prompt);
  return result.title;
};

