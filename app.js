const stateKey = 'guoyu5_mvp_state_v1';
const defaults = { xp: 35, weeklyXp: 180, streak: 4, goalDone: 3, mastered: 12, rescued: 7, completedChars: [] };
const saved = JSON.parse(localStorage.getItem(stateKey) || 'null');
const state = { ...defaults, ...(saved || {}) };

const missions = [
  { char: '憶', title: '把「憶」寫回來', sentence: '多年以後，我仍清楚記＿＿那一天發生的事情。', hints: ['部首提示：這個字和「心」有關。', '結構提示：左邊是「忄」，右邊可以想成「意」。', '看一眼字形，再把提示關掉重新寫。'] },
  { char: '謙', title: '把「謙」寫回來', sentence: '他得到稱讚後，仍然保持＿＿虛的態度。', hints: ['部首提示：這個字和說話、言語有關。', '結構提示：左邊是「言」，右邊是「兼」。', '看一眼字形，再把提示關掉重新寫。'] },
  { char: '擾', title: '把「擾」寫回來', sentence: '請不要在圖書館大聲說話，以免打＿＿別人。', hints: ['部首提示：這個字常和動作有關。', '結構提示：左邊是「扌」。', '看一眼字形，再把提示關掉重新寫。'] },
  { char: '嚷', title: '把「嚷」寫回來', sentence: '市場裡人聲＿＿＿＿，到處都很熱鬧。', hints: ['部首提示：和嘴巴、說話有關。', '結構提示：左邊是「口」。', '看一眼字形，再把提示關掉重新寫。'] },
  { char: '綻', title: '把「綻」寫回來', sentence: '春天一到，花園裡的花朵陸續＿＿放。', hints: ['部首提示：左邊和絲線有關。', '結構提示：左邊是「糸」，右邊是「定」。', '看一眼字形，再把提示關掉重新寫。'] },
];

let missionIndex = 0;
let hintStage = 0;
let strokes = [];
let currentStroke = null;
let canvas, ctx, dpr = 1;
let toastTimer;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function saveState() { localStorage.setItem(stateKey, JSON.stringify(state)); }
function updateUI() {
  $('#xpValue').textContent = state.xp;
  $('#streakCount').textContent = state.streak;
  $('#goalDone').textContent = Math.min(state.goalDone, 5);
  $('#achievementStreak').textContent = `${state.streak} 天`;
  $('#masteredCount').textContent = `${state.mastered} 字`;
  $('#rescuedCount').textContent = `${state.rescued} 字`;
  $('#totalXp').textContent = `${state.weeklyXp} XP`;
  $('#progressRing').style.setProperty('--progress', Math.min(100, (state.goalDone / 5) * 100));
}
function showToast(message) {
  const t = $('#toast'); t.textContent = message; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function navigate(name) {
  $$('.view').forEach(v => v.classList.toggle('active', v.dataset.view === name));
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.nav === name));
  location.hash = name;
  window.scrollTo({ top:0, behavior:'smooth' });
}
$$('[data-nav]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.nav)));
window.addEventListener('hashchange', () => { const name = location.hash.slice(1); if ($(`[data-view="${name}"]`)) navigate(name); });

function resizeCanvas() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  const old = strokes.map(s => s.map(p => ({...p})));
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  strokes = old;
  redraw();
}
function getPoint(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX-r.left, y:e.clientY-r.top, p: e.pressure || .5 };
}
function drawStroke(points) {
  if (!points || points.length < 2) return;
  ctx.save();
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#242743';
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
  for (let i=1;i<points.length;i++) { const a=points[i-1], b=points[i]; ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2); }
  ctx.stroke(); ctx.restore();
}
function redraw() { if (!ctx) return; const r=canvas.getBoundingClientRect(); ctx.clearRect(0,0,r.width,r.height); strokes.forEach(drawStroke); if (currentStroke) drawStroke(currentStroke); }
function clearWriting() { strokes=[]; currentStroke=null; redraw(); }

function startStroke(e) {
  e.preventDefault(); canvas.setPointerCapture?.(e.pointerId); currentStroke=[getPoint(e)]; redraw();
}
function moveStroke(e) { if (!currentStroke) return; e.preventDefault(); currentStroke.push(getPoint(e)); redraw(); }
function endStroke(e) { if (!currentStroke) return; e.preventDefault(); if (currentStroke.length>1) strokes.push(currentStroke); currentStroke=null; redraw(); }

function loadMission(index) {
  missionIndex = Math.max(0, Math.min(index, missions.length-1)); hintStage=0; clearWriting();
  const m=missions[missionIndex];
  $('#missionIndex').textContent = missionIndex+1; $('#missionTitle').textContent=m.title; $('#promptSentence').textContent=m.sentence;
  $('#hintStage').textContent='0 / 3'; $('#hintText').textContent='先不要看答案，想想這個字的部首或左右結構。';
  $('#ghostCharacter').textContent=''; $('#answerCharacter').textContent=m.char; $('#imeInput').value='';
}
function openHandwriting(char) {
  const idx = char ? Math.max(0, missions.findIndex(m=>m.char===char)) : missions.findIndex(m=>!state.completedChars.includes(m.char));
  loadMission(idx < 0 ? 0 : idx);
  $('#handwritingDialog').showModal();
  requestAnimationFrame(() => { resizeCanvas(); setTimeout(resizeCanvas, 80); });
}
$$('[data-open-handwriting]').forEach(b=>b.addEventListener('click',()=>openHandwriting()));
$$('.word-chip').forEach(b=>b.addEventListener('click',()=>openHandwriting(b.dataset.char)));

$('#hintButton').addEventListener('click',()=>{
  const m=missions[missionIndex]; hintStage=Math.min(3,hintStage+1); $('#hintStage').textContent=`${hintStage} / 3`;
  $('#hintText').textContent=m.hints[hintStage-1] || m.hints[2];
  $('#ghostCharacter').textContent = hintStage===3 ? m.char : '';
  if (hintStage===3) setTimeout(()=>{ $('#ghostCharacter').textContent=''; showToast('字形提示已收起，現在自己寫一次！'); }, 2300);
});
$('#undoButton').addEventListener('click',()=>{ strokes.pop(); redraw(); });
$('#clearButton').addEventListener('click',clearWriting);

function copyCanvasToPreview() {
  const p=$('#previewCanvas'); const size=180; const pdpr=Math.min(window.devicePixelRatio||1,2); p.width=size*pdpr; p.height=size*pdpr;
  const c=p.getContext('2d'); c.setTransform(pdpr,0,0,pdpr,0,0); c.clearRect(0,0,size,size); c.fillStyle='#fff'; c.fillRect(0,0,size,size);
  const sourceRect=canvas.getBoundingClientRect(); const scale=size/sourceRect.width;
  c.save(); c.scale(scale,scale); strokes.forEach(points=>{ c.lineCap='round';c.lineJoin='round';c.strokeStyle='#242743';c.lineWidth=8;c.beginPath();c.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];c.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2);}c.stroke(); }); c.restore();
}
$('#checkButton').addEventListener('click',()=>{
  if (strokes.length<2) { showToast('再寫完整一點，我們再來核對。'); return; }
  copyCanvasToPreview(); $('#answerCharacter').textContent=missions[missionIndex].char; $('#checkDialog').showModal();
});
$('#retryButton').addEventListener('click',()=>{ $('#checkDialog').close(); clearWriting(); showToast('很好，再回想一次會記得更牢。'); });
$('#correctButton').addEventListener('click',()=>{
  const ch=missions[missionIndex].char;
  if(!state.completedChars.includes(ch)) { state.completedChars.push(ch); state.xp+=4; state.weeklyXp+=4; state.rescued+=1; state.goalDone=Math.min(5,state.goalDone+1); }
  saveState(); updateUI(); $('#checkDialog').close();
  if (missionIndex < missions.length-1) { loadMission(missionIndex+1); showToast(`太棒了！「${ch}」先救回來了 +4 XP`); setTimeout(resizeCanvas,50); }
  else { $('#handwritingDialog').close(); showToast('今天的 5 字救援完成！🎉'); }
});

$('#readSentence').addEventListener('click',()=>{
  if ('speechSynthesis' in window) { speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance($('#promptSentence').textContent.replace('＿＿','空格')); u.lang='zh-TW'; u.rate=.86; speechSynthesis.speak(u); }
  else showToast('這個瀏覽器目前不支援語音朗讀。');
});
$('#imeInput').addEventListener('input', e=>{ const m=missions[missionIndex]; if(e.target.value===m.char) showToast('系統輸入辨識到了！接著也試試田字格默寫。'); });
window.addEventListener('resize',()=>{ if($('#handwritingDialog').open) resizeCanvas(); });

canvas = $('#writingCanvas');
canvas.addEventListener('pointerdown', startStroke); canvas.addEventListener('pointermove', moveStroke); canvas.addEventListener('pointerup', endStroke); canvas.addEventListener('pointercancel', endStroke);

if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
updateUI();
const initial=location.hash.slice(1); if(initial && $(`[data-view="${initial}"]`)) navigate(initial);
