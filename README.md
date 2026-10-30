# 字字探險隊｜國小五上國語 MVP

第一版可直接部署的靜態 PWA，目標是「短任務、立即回饋、平板優先、手寫核心」。

## 已完成
- Tablet-first responsive UI：手機、平板直向、平板橫向、桌機。
- 今日任務、XP、連續學習、今日進度、成就頁。
- 手寫田字格：Pointer Events，支援手指、觸控筆、滑鼠。
- 手寫復原／清除／三段提示／答案自我核對。
- 原生輸入法欄位：可在手機或平板切換系統手寫鍵盤。
- localStorage 學習進度保存。
- Web Speech API 句子朗讀（瀏覽器支援時）。
- manifest + service worker，可加入主畫面並快取基本頁面。

## 目前刻意沒有假裝完成的功能
第一版**沒有**做真正的中文字形 OCR 或筆順判定。孩子完成書寫後，畫面會並排顯示正確字與自己的字，讓孩子自我核對。第二階段可接 Hanzi Writer/自建筆順資料，做逐筆判斷。

## 本機預覽
```bash
python -m http.server 8080
```
打開 `http://localhost:8080`。

## Git / branch deployment 建議
```bash
git init
git add .
git commit -m "feat: initial tablet-first guoyu learning MVP"
git branch -M main
git checkout -b dev
```

建議：
- `main`：正式版
- `dev`：測試版
- `feature/handwriting`：筆順／字形辨識
- `feature/content-nani-5a`：南一五上教材資料

### GitHub Pages（branch deploy）
如果 repository 使用 GitHub Pages 的 **Deploy from a branch**：
1. Repository → Settings → Pages。
2. Source 選 `Deploy from a branch`。
3. Branch 選要發布的分支（例如 `dev`），folder 選 `/ (root)`。
4. 正式版再切換到 `main`，或保留另一個測試 repository / Pages 環境。

本專案是純靜態檔案，不需要 build step。

## 下一階段
1. 匯入南一五上課程「課名／生字／詞語／學習重點」的結構化資料（避免直接複製整篇課文）。
2. 真正的筆順與字形判定。
3. spaced repetition：依錯字時間安排隔天、3 天、7 天複習。
4. 閱讀偵探：題目 → 找證據 → 句子標亮。
5. 家長檢視頁：只看易忘字、完成率與近 7 天進步，不做壓力式排名。
