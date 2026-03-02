// next-app/src/app/api/gemini/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. 接收前端傳來的請求 (裡面裝著使用者的煩惱或目標 prompt)
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 2. 從環境變數中安全地拿出金鑰！
    // 這段程式碼只會在你的伺服器上執行，絕對不會送到使用者的瀏覽器裡
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      console.error("後端找不到 GEMINI_API_KEY，請確認 .env.local 檔案設定！");
      return NextResponse.json({ error: "API Key configuration error" }, { status: 500 });
    }

    // 3. 由後端伺服器去向 Google 發送請求
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // 確保 Google 回傳我們預期的 JSON 格式
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      // 如果 Google 那邊報錯 (例如額度用盡)，把錯誤印在伺服器終端機方便除錯
      const errorData = await response.json();
      console.error("Gemini API 回傳錯誤:", errorData);
      return NextResponse.json({ error: "Failed to fetch from Google Gemini" }, { status: response.status });
    }

    // 4. 拿到 Google 回傳的資料
    const data = await response.json();

    // 5. 原封不動地把資料送回給你的前端 (src/services/api.js)
    return NextResponse.json(data);

  } catch (error) {
    console.error("後端發生非預期錯誤:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}