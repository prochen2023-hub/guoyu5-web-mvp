# 字字探險隊｜五上國語 V2.1

Build: 2026-10-30 / V2.1.0

## 這版修正
- 修正 GitHub Pages / branch deploy 後仍看到舊版的 Service Worker 快取問題。
- Service Worker 改為 network-first，並在安裝後 `skipWaiting()`、啟用後 `clients.claim()`。
- CSS / JS / manifest 加上 V2.1 版本參數，降低舊快取命中。
- 頁首顯示 `V2.1`，可直接確認目前載入的是新版。
- 保留手機手寫板防捲動、12 課分課、期中/期末範圍、跟讀、字詞、造詞造句、閱讀測驗與手寫功能。

## GitHub Pages
可直接放在 branch 根目錄，Pages 選擇 **Deploy from a branch**。

若網站曾開過舊版，部署 V2.1 後重新整理一次；新的 Service Worker 會接手並清除舊版快取。若裝成主畫面 PWA，第一次更新後再開一次即可看到頁首 `V2.1`。
