/* ============ 秘仪牌室 主逻辑 ============ */
(function () {
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const TOPIC_NAMES = { love: "爱情", study: "学业", career: "事业", general: "综合" };
const ROMAN = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];
const RANK_CN = { A:"ACE","2":"二","3":"三","4":"四","5":"五","6":"六","7":"七","8":"八","9":"九","10":"十", page:"侍从", knight:"骑士", queen:"王后", king:"国王" };
const SUIT_CN = { wands:"权杖", cups:"圣杯", swords:"宝剑", pentacles:"星币" };
const SUIT_ICON = { wands:"🪄", cups:"🏆", swords:"🗡️", pentacles:"🪙" };

const state = { topic: null, question: "", reversed: true, spread: null, picks: [] };

/* ---------- 星空 ---------- */
(function stars() {
  const cv = $("#stars"), ctx = cv.getContext("2d");
  let pts = [];
  function resize() {
    cv.width = innerWidth; cv.height = innerHeight;
    pts = Array.from({ length: 110 }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      r: Math.random() * 1.3 + .2, p: Math.random() * Math.PI * 2, s: .4 + Math.random()
    }));
  }
  addEventListener("resize", resize); resize();
  (function loop(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const s of pts) {
      const a = .25 + .55 * Math.abs(Math.sin(t / 1600 * s.s + s.p));
      ctx.fillStyle = `rgba(222,205,160,${a})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    }
    requestAnimationFrame(loop);
  })(0);
})();

/* ---------- 导航 ---------- */
function show(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#" + id).classList.add("active");
  scrollTo({ top: 0, behavior: "smooth" });
}
$$("[data-back]").forEach(b => b.addEventListener("click", () => show("scr-" + b.dataset.back)));

/* ---------- ① 起念 ---------- */
$("#topic-chips").addEventListener("click", e => {
  const c = e.target.closest(".chip"); if (!c) return;
  $$("#topic-chips .chip").forEach(x => x.classList.toggle("on", x === c));
  state.topic = c.dataset.topic;
});
$("#go-spreads").addEventListener("click", () => {
  if (!state.topic) { $("#topic-chips").animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(7px)" }, { transform: "translateX(0)" }],
      { duration: 260 }); return; }
  state.question = $("#question").value.trim();
  state.reversed = $("#use-reversed").checked;
  renderSpreads(); show("scr-spreads");
});

/* ---------- ② 选阵 ---------- */
function renderSpreads() {
  const g = $("#spread-grid"); g.innerHTML = "";
  for (const sp of window.TAROT_SPREADS) {
    const d = document.createElement("div");
    d.className = "spread-card"; d.dataset.count = sp.count;
    d.innerHTML = `<h3>${sp.name}</h3><div class="sc-tag">${sp.count} 张 · ${sp.desc}</div><p>${sp.intro}</p>`;
    d.addEventListener("click", () => { state.spread = sp; state.picks = []; startShuffle(); });
    g.appendChild(d);
  }
}

/* ---------- ③ 洗牌（打翻牌堆 · 大弧线甩开再收紧） ---------- */
let deck = [], cuts = 0;
function startShuffle() {
  deck = window.TAROT_CARDS.map(c => ({ card: c, rev: state.reversed && Math.random() < .5 }));
  cuts = 0;
  cancelAnimationFrame(spin.raf);
  Object.assign(spin, { on: false, last: 0, vel: 0, ang: 0, total: 0 });
  $("#shuffle-hint").textContent = "牌堆此刻是一整副 —— 按住它拖动画圈，牌会哗啦打散、搅动，转满三圈自动收拢成扇。";
  $("#deck-count").textContent = "0 / 3";
  $("#scr-shuffle").classList.remove("deck-done");
  show("scr-shuffle");
  buildDeckVisual();
}
function buildDeckVisual() {
  const dk = $("#deck");
  dk.className = "deck stacked";
  dk.innerHTML = "";
  const N = deck.length;
  const W = dk.clientWidth || Math.min(window.innerWidth * .94, 780);
  const rx0 = Math.min(350, W * .45), ry0 = rx0 * .46;
  deck.forEach((d, i) => {
    const m = document.createElement("div");
    m.className = "dcard";
    const f = document.createElement("div");
    f.className = "df";
    f.style.animationDelay = (Math.random() * .4).toFixed(2) + "s";
    m.appendChild(f);
    /* 开局：一整副码好 */
    m.style.setProperty("--sx", (Math.random() * 7 - 3.5).toFixed(1) + "px");
    m.style.setProperty("--sy", (Math.random() * 4 - 2 - i * .1).toFixed(1) + "px");
    m.style.setProperty("--sr", (Math.random() * 3 - 1.5).toFixed(1) + "deg");
    /* 打散：大圈，高低不平 */
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const wob = Math.sin(i * 7.31) * 26 + Math.cos(i * 3.7) * 14;
    m.style.setProperty("--x", (Math.cos(a) * (rx0 + wob)).toFixed(1) + "px");
    m.style.setProperty("--y", (Math.sin(a) * (ry0 + wob * .5) + Math.sin(i * 5.7) * 12).toFixed(1) + "px");
    m.style.setProperty("--r", (Math.sin(a) * 24 + Math.sin(i * 2.9) * 10).toFixed(1) + "deg");
    /* 收紧：规整大弧扇形 */
    const R = Math.min(300, W * .4), off = R * .6;
    const t = (i / (N - 1) - .5) * Math.PI * 1.16;
    m.style.setProperty("--gx", (Math.sin(t) * R).toFixed(1) + "px");
    m.style.setProperty("--gy", (-Math.cos(t) * R + off).toFixed(1) + "px");
    m.style.setProperty("--gr", (t * 57.3).toFixed(1) + "deg");
    m.style.setProperty("--gd", (Math.abs(i - N / 2) * 5) + "ms");
    m.style.animationDelay = (i * 10) + "ms";
    dk.appendChild(m);
  });
  if (!dk.dataset.bound) {
    dk.dataset.bound = 1;
    dk.addEventListener("pointerdown", spinDown);
    dk.addEventListener("pointermove", spinMove);
    addEventListener("pointerup", spinUp);
  }
  dk.style.transform = "";
}
const spin = { on: false, last: 0, vel: 0, ang: 0, total: 0, raf: 0 };
function angleAt(e, el) {
  const r = el.getBoundingClientRect();
  return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
}
function spinDown(e) {
  if (cuts >= 3) return;
  e.preventDefault();
  const dk = $("#deck");
  if (dk.classList.contains("stacked")) dk.classList.remove("stacked");
  spin.on = true; spin.vel = 0;
  spin.last = angleAt(e, dk);
  cancelAnimationFrame(spin.raf);
  dk.classList.add("rattling");
  dk.setPointerCapture && dk.setPointerCapture(e.pointerId);
}
function spinMove(e) {
  if (!spin.on) return;
  const a = angleAt(e, $("#deck"));
  let d = a - spin.last;
  if (d > 180) d -= 360; if (d < -180) d += 360;
  spin.ang += d; spin.total += Math.abs(d); spin.last = a; spin.vel = d;
  paint(); checkCut();
}
function spinUp() {
  if (!spin.on) return;
  spin.on = false;
  (function glide() {
    if (Math.abs(spin.vel) < .4 || cuts >= 3) { $("#deck").classList.remove("rattling"); return; }
    spin.vel *= (.88 + Math.random() * .10);
    if (Math.random() < .16) spin.vel += (Math.random() - .5) * 9;
    spin.ang += spin.vel; spin.total += Math.abs(spin.vel);
    paint(); checkCut();
    spin.raf = requestAnimationFrame(glide);
  })();
}
function paint() {
  const dk = $("#deck");
  const j = dk.classList.contains("rattling") || Math.abs(spin.vel) > 2 ? 3.2 : 1;
  dk.style.transform = `rotate(${(spin.ang + (Math.random() - .5) * j).toFixed(2)}deg) translate(${((Math.random() - .5) * j * 1.8).toFixed(1)}px,${((Math.random() - .5) * j * 1.8).toFixed(1)}px)`;
}
function checkCut() {
  const want = Math.min(3, Math.floor(spin.total / 360));
  while (cuts < want) {
    cuts++;
    for (let i = deck.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [deck[i], deck[j]] = [deck[j], deck[i]]; }
    const dk = $("#deck");
    dk.classList.remove("washed"); void dk.offsetWidth; dk.classList.add("washed");
    $("#deck-count").textContent = cuts + " / 3";
  }
  if (cuts === 3 && !$("#scr-shuffle").classList.contains("deck-done")) {
    spin.on = false;
    cancelAnimationFrame(spin.raf);
    const dk = $("#deck");
    dk.classList.remove("rattling");
    dk.style.transform = "";
    dk.classList.add("gathering");
    $("#shuffle-hint").textContent = "牌已应念而动，收拢成扇……";
    $("#scr-shuffle").classList.add("deck-done");
    setTimeout(openFan, 1600);
  }
}

/* ---------- ④ 感应（扇形选牌） ---------- */
function label(i) {
  const p = state.spread.positions[i];
  return p ? (p._userLabel || p.label) : "";
}
function circled(i) { return "①②③④⑤⑥⑦⑧⑨⑩"[i - 1] || i; }
function openFan() {
  const n = state.spread.count;
  $("#fan-hint").textContent = `凭直觉从扇中取出 ${n} 张 —— 牌背朝上，开牌方见真容；左右拖动可来回转动牌扇。`;
  state.picks = [];
  const fan = $("#fan"); fan.innerHTML = "";
  const arc = document.createElement("div"); arc.className = "fan-arc";
  fan.appendChild(arc);
  const N = deck.length;
  const W = Math.min(window.innerWidth * .96, 980);
  const small = window.innerWidth < 640;
  const R = Math.min(300, W * .42), off = R * .62;
  const fanH = small ? 360 : 430;
  fan.style.height = fanH + "px";
  arc.style.transformOrigin = `50% ${fanH / 2 + off}px`;
  deck.forEach((d, i) => {
    const m = document.createElement("div");
    m.className = "mini";
    const t = (i / (N - 1) - .5) * Math.PI * 1.16;
    m.style.setProperty("--x", (Math.sin(t) * R).toFixed(1) + "px");
    m.style.setProperty("--y", (-Math.cos(t) * R + off).toFixed(1) + "px");
    m.style.setProperty("--r", (t * 57.3).toFixed(1) + "deg");
    m.style.zIndex = i;
    m.style.animationDelay = (i * 8) + "ms";
    m.innerHTML = '<div class="m-back"></div>';
    m.addEventListener("click", () => {
      if (fanDragMoved > 10 || m.classList.contains("taken") || state.picks.length >= n) return;
      m.classList.add("taken");
      state.picks.push(d);
      const pk = document.createElement("span");
      pk.className = "pk"; pk.textContent = `${circled(state.picks.length)} ${label(state.picks.length - 1)}`;
      $("#picked-tray").appendChild(pk);
      if (state.picks.length === n) {
        $("#do-deal").disabled = false;
        $("#fan-hint").textContent = "感应已通。开牌——";
      }
    });
    arc.appendChild(m);
  });
  /* 来回转动牌扇 */
  let fd = null;
  const rot = { v: 0 };
  fan.addEventListener("pointerdown", e => { fd = { x: e.clientX, r0: rot.v, moved: 0 }; fan.setPointerCapture && fan.setPointerCapture(e.pointerId); });
  fan.addEventListener("pointermove", e => {
    if (!fd) return;
    const dx = e.clientX - fd.x;
    fd.moved = Math.max(fd.moved, Math.abs(dx));
    rot.v = Math.max(-46, Math.min(46, fd.r0 + dx * .13));
    arc.style.transform = `rotate(${rot.v}deg)`;
  });
  const fdEnd = () => { fanDragMoved = fd ? fd.moved : 0; fd = null; setTimeout(() => { fanDragMoved = 0; }, 60); };
  fan.addEventListener("pointerup", fdEnd);
  fan.addEventListener("pointercancel", fdEnd);
  $("#picked-tray").innerHTML = "";
  $("#do-deal").disabled = true;
  show("scr-fan");
}
let fanDragMoved = 0;
$("#do-deal").addEventListener("click", deal);

/* ---------- ⑤ 现形（牌阵） ---------- */
function faceHTML(d) {
  const c = d.card;
  const glyph = c.arcana === "major" ? c.glyph : SUIT_ICON[c.arcana];
  const foot = c.arcana === "major" ? ROMAN[+c.rank] : String(c.en || "").toUpperCase();
  const art = c.img
    ? `<img class="f-art" src="images/${c.img}" alt="${c.name}">`
    : `<div class="f-glyph">${glyph}</div>`;
  return `<div class="card-inner">
    <div class="face back"><div class="pattern"></div></div>
    <div class="face front" data-glyph="${glyph}">
      ${art}
      <div class="f-foot">${foot}</div>
    </div></div>`;
}
function deal() {
  const sp = state.spread, board = $("#board");
  board.innerHTML = "";
  board.dataset.size = sp.size;
  board.classList.toggle("sz-tall", sp.count >= 6);
  sp.positions.forEach((p, i) => {
    const d = state.picks[i];
    const s = document.createElement("div");
    s.className = "slot" + (p.cross ? " crossed" : "");
    s.style.left = p.x + "%"; s.style.top = p.y + "%";
    s.style.zIndex = p.cross ? 3 : 2;
    const orient = p.rot ? `transform: rotate(${p.rot}deg);` : "";
    s.innerHTML = `<div class="slot-card card3d${d.rev ? " reversed" : ""}" style="${orient}">${faceHTML(d)}</div>
      <div class="slot-label${sp.editable && !p.cross ? " editable" : ""}" ${sp.editable && !p.cross ? "contenteditable=true" : ""}>${p.cross ? "" : circled(i + 1) + " " + label(i)}</div>
      <div class="slot-cn">${d.card.name}${d.rev ? "·逆位" : ""}</div>`;
    board.appendChild(s);
  });
  $("#board-hint").textContent = "屏息——牌面即将翻转。";
  show("scr-board");
  let delay = 400;
  $$("#board .slot").forEach((s, i) => {
    setTimeout(() => { s.querySelector(".slot-card").classList.add("flipped"); s.classList.add("reveal"); }, delay);
    delay += 560;
  });
  setTimeout(() => {
    $("#board-hint").innerHTML = `<button class="btn-major" id="to-result" style="margin-top:18px">展 卷 解 读 →</button>`;
    $("#to-result").addEventListener("click", () => { renderResult(); show("scr-result"); });
  }, delay + 300);
}

/* ---------- ⑥ 解牌 ---------- */
function orientName(d) { return d.rev ? "逆位" : "正位"; }
function rcardHTML(d, i) {
  const c = d.card, u = d.rev ? c.reversed : c.upright;
  const topics = state.topic === "general" ? [["love", "爱情"], ["study", "学业"], ["career", "事业"]] : [[state.topic, TOPIC_NAMES[state.topic]]];
  const lines = topics.map(([k, nm]) => `<div class="rc-theme"><span class="t-label">${nm}</span>${u[k]}</div>`).join("");
  return `<div class="rcard" style="animation-delay:${i * 120}ms">
    <div class="rc-face"><div class="card3d flipped${d.rev ? " reversed" : ""}">${faceHTML(d)}</div></div>
    <div class="rc-body">
      <div class="rc-pos">${circled(i + 1)} ${label(i)}</div>
      <div class="rc-name">${c.name}<span class="orient ${d.rev ? "dn" : "up"}">${orientName(d)}</span></div>
      <div class="rc-en">${c.arcana === "major" ? ROMAN[+c.rank] + " · " : ""}${c.en}</div>
      <div class="rc-kw">「 ${u.kw} 」</div>
      ${lines}
    </div></div>`;
}
function resultPosIndex() {
  const kw = /结果|结局|走向|方向|指引|突破/;
  for (let i = state.picks.length - 1; i >= 0; i--) if (kw.test(label(i))) return i;
  return state.picks.length - 1;
}
function composeSummary() {
  const n = state.picks.length;
  const majors = state.picks.filter(d => d.card.arcana === "major").length;
  const revs = state.picks.filter(d => d.rev).length;
  const parts = [];
  parts.push(majors >= Math.ceil(n / 3)
    ? `本次 ${majors} 张大阿卡那入阵，命运的意味很重，此事超出日常琐屑的范畴。`
    : `牌面以小阿卡那为主，落在具体的人事细节上，指向的是可以着手经营的部分。`);
  if (state.reversed) {
    const rr = n ? revs / n : 0;
    parts.push(rr >= .5
      ? `逆位过半——能量受阻，症结多半在心意未通或时机未到，急不得。`
      : rr === 0
        ? `全员正位，牌势通畅，所问之事的脉络比你预想的更清晰。`
        : `偶有逆位，是小处的磕绊，提醒你在某些位置需要转个弯。`);
  }
  const ri = resultPosIndex(), key = state.picks[ri];
  const ku = key.rev ? key.card.reversed : key.card.upright;
  const tk = state.topic === "general" ? "love" : state.topic;
  parts.push(`阵眼落在「${label(ri)}」的 <b>${key.card.name}·${orientName(key)}</b>（${ku.kw}），整副牌的题眼即在此。`);
  return parts.join("<br>");
}
function renderResult() {
  $("#result-head").innerHTML =
    `<b>主题</b>：${TOPIC_NAMES[state.topic]}　<b>牌阵</b>：${state.spread.name}（${state.spread.count} 张${state.reversed ? "·含逆位" : "·仅正位"}）<br>` +
    `<b>所问</b>：${state.question || "（未写明具体问题，以主题为准）"}`;
  $("#result-cards").innerHTML = state.picks.map((d, i) => rcardHTML(d, i)).join("");
  $("#result-summary").innerHTML = `<h3>✦ 综 述</h3>${composeSummary()}`;
}
$("#btn-again").addEventListener("click", startShuffle);
$("#btn-new").addEventListener("click", () => show("scr-home"));

/* ---------- 复制问卜结果 ---------- */
function plainText() {
  const L = [];
  L.push("🔮 塔罗问卜 · 秘仪牌室");
  L.push(`主题：${TOPIC_NAMES[state.topic]}｜问题：${state.question || "（未写明）"}`);
  L.push(`牌阵：${state.spread.name}（${state.reversed ? "含逆位" : "仅正位"}）`);
  state.picks.forEach((d, i) => {
    const u = d.rev ? d.card.reversed : d.card.upright;
    L.push(`${i + 1}.[${label(i)}] ${d.card.name}·${orientName(d)}（${d.card.en}）— ${u.kw}`);
    if (state.topic === "general") L.push(`   爱情:${u.love}｜学业:${u.study}｜事业:${u.career}`);
    else L.push(`   ${TOPIC_NAMES[state.topic]}：${u[state.topic]}`);
  });
  L.push("（请 AI 以我的解牌风格，结合我的问题做针对性深度解读）");
  return L.join("\n");
}
$("#btn-copy").addEventListener("click", async () => {
  const txt = plainText();
  try { await navigator.clipboard.writeText(txt); }
  catch (e) {
    const ta = document.createElement("textarea");
    ta.value = txt; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); ta.remove();
  }
  $("#copy-hint").textContent = "✓ 已复制，去贴给 AI 吧";
  setTimeout(() => $("#copy-hint").textContent = "复制后贴给 AI，按你的风格做专属深读", 2600);
});

/* ---------- 启动守卫 ---------- */
if (!window.TAROT_CARDS || window.TAROT_CARDS.length !== 78) {
  document.body.insertAdjacentHTML("afterbegin",
    '<div style="position:fixed;top:0;left:0;right:0;z-index:9;background:#a33;color:#fff;text-align:center;padding:10px;font-size:14px">牌库未就绪：cards.js 缺失或不完整（当前 ' + (window.TAROT_CARDS ? window.TAROT_CARDS.length : 0) + ' 张）</div>');
}
})();
