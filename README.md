# 字字探險隊｜五上國語 V2

Tablet-first / Mobile-friendly 的國小五上國語互動學習網站。

## V2 新增
- 12 課分課架構：四單元、期中 1–6、期末 7–12
- 每課六個學習關卡：導讀、跟讀、字詞、造詞造句、閱讀測驗、手寫
- 原創跟讀短文：Speech Synthesis 逐句朗讀、句子高亮、跟讀模式
- 每課 3 題閱讀理解＋證據句提示
- 造詞參考、自我檢查式造句
- 本課手寫字快捷入口
- 手機手寫防捲動：touch-action:none + passive:false touchmove + modal scroll lock
- LocalStorage 保留 XP、手寫與分課進度

## 內容版權說明
網站目前不重製南一版課文全文。12 課課名依公開課程架構建立；每課導讀、短文、閱讀題、例句皆為本專案原創內容。
「本課練習字詞」為補充練習版，不宣稱等同出版社完整生字語詞表。若家長提供合法取得的課本頁面或文字，可再精準匯入。

## GitHub Pages / branch deploy
本專案為純靜態網站，不需要 build。

建議：
- `main`：正式版
- `dev`：測試版
- `feature/handwriting-scroll-lock`：手寫修正
- `feature/lesson-content`：分課內容

GitHub Pages 可設定 `Deploy from a branch`，選擇指定 branch 的 `/ (root)`。
