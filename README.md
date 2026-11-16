# 好奇小勇者

給低年級生、手機與 iPad 都能玩的生活教育＋科普小遊戲：先探索「為什麼」，再練習小小勇氣。

## 怎麼玩

```bash
npm install
npm run dev
```

本機開發網址為 `http://localhost:5173/curious-brave/`。可加到主畫面（PWA）。

## 主題（皆可自由進入）

1. 人體奧秘  
2. 動物植物  
3. 太空宇宙  
4. 動手實驗  
5. 情緒世界  
6. 社區世界  

每主題 **9 題**＋ **1 個勇氣挑戰**，共 54 題科普／生活問答。  
主題可自由選擇；主題內需先集滿貼紙，再解鎖勇氣挑戰。

遊戲內解說為原創低年級口吻，參考公開科普常識撰寫。

## 登入與雲端進度（Firebase）

可與「小老師就是妳」**共用同一 Firebase 專案**；好奇小勇者使用獨立 collection：`curiousBrave/{uid}`。

1. 複製 [`.env.example`](.env.example) 成 `.env.local`，填入同一組 `VITE_FIREBASE_*`  
2. 在 Firebase Console 把本機／部署網域加到 Authentication → Authorized domains  
3. 把本 repo 的 [`firestore.rules`](firestore.rules) 貼到 Firestore（含既有 `users`＋新增 `curiousBrave`）後發布  

未設定環境變數時仍可本機遊玩，進度只存在 `localStorage`。GitHub Pages 需在 repo **Settings → Secrets and variables → Actions** 注入同樣的 `VITE_FIREBASE_*`。

## 線上版（GitHub Pages）

網址：`https://kiddhsu.github.io/curious-brave/`

1. 第一次到 repo **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**  
2. 設定上述 Firebase Secrets（可從小老師 repo 複製同名 secrets）  
3. push 到 `main`，或在 Actions 手動跑 **Deploy GitHub Pages**  
4. Firebase Authentication → Authorized domains 加上 `kiddhsu.github.io`

## 進度

本機＋（登入後）雲端同步；可在貼紙冊清空。
