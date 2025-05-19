# 系統監控儀表板（System Monitoring Dashboard）

此專案為一個前後端分離的系統監控儀表板，使用 React + TypeScript 製作前端介面，Node.js 建立 API，顯示 CPU 核心數、記憶體與磁碟資訊，並以圖表方式視覺化即時系統狀態。

---

## 📁 專案結構
system-dashboard/
```
├── client/ # React 前端（v18.3.1 + TypeScript 5.7.2）
│ ├── src/
│ │ ├── components/ # 圖表元件（例MemoryChart）
│ │ └── App.tsx # 主頁面
│ ├── public/
│ └── package.json
│
├── server/ # Node.js 後端（v20.17.0）
│ ├── server.js # API 提供系統資訊
│ └── package.json
│
└── README.md # 說明文件（本檔）
```

## 🚀 安裝與啟動流程

### 📦 安裝前端

```bash
cd client
npm install
npm start
應用會啟動於 http://localhost:3000
```

### 📦 安裝後端

```bash
cd server
npm install
node server.js
後端 API 服務於 http://localhost:3001/api/system
```

## 📊 功能介紹

### 1. 系統資訊

- 顯示 CPU 核心數
- 顯示記憶體使用量
- 顯示磁碟使用量
- 顯示系統運行時間

### 2. 記憶體使用量圖表

- 即時顯示記憶體使用量變化
- 以折線圖呈現
- 每 5 秒更新一次資料
