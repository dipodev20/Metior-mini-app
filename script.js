'use strict';

/* ================= DATA — edit here ================= */
// id: latin letters, digits, dashes. tags: keys from TAGS below (or any plain text).
const GAMES = [
  { id: 'space-runner', title: 'Space Runner', author: 'Your name', tags: ['arcade', 'space'], cover: '', url: 'games/space-runner/index.html' },
  { id: 'pixel-dungeon', title: 'Pixel Dungeon', author: 'Your name', tags: ['adventure', 'pixel'], cover: '', url: 'games/pixel-dungeon/index.html' },
  { id: 'neon-snake', title: 'Neon Snake', author: 'Your name', tags: ['arcade', 'classic'], cover: '', url: 'games/neon-snake/index.html' }
];
const TAGS = {
  arcade: { en: 'Arcade', ru: 'Аркада' }, space: { en: 'Space', ru: 'Космос' },
  adventure: { en: 'Adventure', ru: 'Приключения' }, pixel: { en: 'Pixel art', ru: 'Пиксель-арт' },
  classic: { en: 'Classic', ru: 'Классика' }
};
// Slider: news and ad landings. href — link (put your partner link for ads).
const NEWS = [
  { tag: { en: 'News', ru: 'Новости' }, title: { en: 'Welcome to Metior', ru: 'Добро пожаловать в Metior' }, text: { en: 'Play HTML5 games right in your browser — no install needed.', ru: 'Играйте в HTML5-игры прямо в браузере — без установки.' }, href: '#games' },
  { tag: { en: 'Update', ru: 'Обновление' }, title: { en: 'New games every week', ru: 'Новые игры каждую неделю' }, text: { en: 'Follow the catalog: we add fresh projects.', ru: 'Следите за каталогом: добавляем свежие проекты.' }, href: '#games' },
  { tag: { en: 'Ad', ru: 'Реклама' }, title: { en: 'Spot for an ad landing', ru: 'Место под рекламный лендинг' }, text: { en: 'Replace the link and text of this slide with a partner offer.', ru: 'Замените ссылку и текст этого слайда на оффер партнёра.' }, href: '#', ad: true }
];
const ADS_SRC = ''; // Adsterra script URL, e.g. 'https://...adsterra.../invoke.js'

/* ================= Languages (English by default) ================= */
const I18N = {
  en: {
    title_home: 'Metior — HTML5 games in your browser', title_privacy: 'Privacy Policy — Metior',
    search_ph: 'Search games…', search_aria: 'Search games', menu_aria: 'Menu', sections: 'Sections',
    catalog: 'Catalog', news: 'News', recent: 'Recently played', about: 'About', privacy: 'Privacy Policy',
    contacts: 'Contacts', settings: 'Settings', esc_note: 'Press Esc to close', games: 'Games',
    filter_aria: 'Filter by tag', all: 'All', favorites: 'Favorites', empty: 'Nothing found. Try another search or tag.',
    play: 'Play', by: 'By', fav_aria: 'Add to favorites', back: 'Back to catalog', fullscreen: 'Fullscreen',
    about_title: 'About the author',
    about_text: 'Metior is a small showcase of browser HTML5 games. Play free, with no install or sign-up. Want to submit your game or suggest an idea? Write to',
    rights: 'Games belong to their authors.', cookie_settings: 'Cookie settings',
    cookie_text: "We use cookies to show ads (Adsterra). If you decline, third-party scripts won't load.",
    learn_more: 'Learn more', decline: 'Decline', accept: 'Accept', language: 'Language',
    news_aria: 'News and announcements', close: 'Close', slide: 'Slide'
  },
  ru: {
    title_home: 'Metior — HTML5-игры в браузере', title_privacy: 'Политика конфиденциальности — Metior',
    search_ph: 'Поиск игр…', search_aria: 'Поиск игр', menu_aria: 'Меню', sections: 'Разделы',
    catalog: 'Каталог', news: 'Новости', recent: 'Недавно играли', about: 'Об авторе', privacy: 'Политика конфиденциальности',
    contacts: 'Контакты', settings: 'Настройки', esc_note: 'Нажмите Esc, чтобы закрыть', games: 'Игры',
    filter_aria: 'Фильтр по тегам', all: 'Все', favorites: 'Избранное', empty: 'Ничего не найдено. Попробуйте другой запрос или тег.',
    play: 'Играть', by: 'Автор', fav_aria: 'В избранное', back: 'Назад в каталог', fullscreen: 'На весь экран',
    about_title: 'Об авторе',
    about_text: 'Metior — небольшая витрина браузерных HTML5-игр. Играйте бесплатно, без установки и регистрации. Хотите разместить свою игру или предложить идею — напишите на',
    rights: 'Игры принадлежат их авторам.', cookie_settings: 'Настройки cookie',
    cookie_text: 'Мы используем cookie для показа рекламы (Adsterra). Если откажетесь, сторонние скрипты загружаться не будут.',
    learn_more: 'Подробнее', decline: 'Отклонить', accept: 'Принять', language: 'Язык',
    news_aria: 'Новости и анонсы', close: 'Закрыть', slide: 'Слайд'
  }
};
const LKEY = 'metior_lang';
let lang = 'en';
try { if (localStorage.getItem(LKEY) === 'ru') lang = 'ru'; } catch { /* нет доступа к хранилищу */ }
const langHooks = []; // функции, перерисовывающие динамический контент при смене языка
const t = k => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
const L = o => (typeof o === 'string' ? o : (o[lang] || o.en));
const tagName = k => (TAGS[k] ? TAGS[k][lang] : k);

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(n => { n.textContent = t(n.dataset.t); });
  document.querySelectorAll('[data-t-ph]').forEach(n => { n.placeholder = t(n.dataset.tPh); });
  document.querySelectorAll('[data-t-aria]').forEach(n => n.setAttribute('aria-label', t(n.dataset.tAria)));
  document.querySelectorAll('[data-lang-btn]').forEach(b => b.setAttribute('aria-pressed', b.dataset.langBtn === lang));
  if (document.body.dataset.title && !location.hash.startsWith('#/game/')) document.title = t(document.body.dataset.title);
}
function setLang(l) {
  lang = l;
  try { localStorage.setItem(LKEY, l); } catch { /* приватный режим */ }
  applyLang();
  langHooks.forEach(f => f());
}

/* ================= Утилиты ================= */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text; // только textContent — защита от XSS
  return e;
};

/* ================= SVG-иконки ================= */
const ICONS = {
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  gamepad: '<rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  news: '<path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  cookie: '<path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z"/><path d="M9 10h.01M8 15h.01M14 15h.01M12 12h.01"/>'
};
function icon(name, cls) {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('class', 'ico' + (cls ? ' ' + cls : ''));
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = ICONS[name] || ''; // строки из константы выше, не пользовательский ввод
  return s;
}
function initIcons() {
  document.querySelectorAll('[data-i]').forEach(n => n.replaceWith(icon(n.dataset.i)));
}

/* ================= Избранное и недавние (только localStorage) ================= */
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* приватный режим */ } }
};
const isFav = id => store.get('metior_fav').includes(id);
function toggleFav(id) {
  const f = store.get('metior_fav');
  store.set('metior_fav', f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
}
function pushRecent(id) {
  store.set('metior_recent', [id, ...store.get('metior_recent').filter(x => x !== id)].slice(0, 4));
}

/* ================= Cookie и реклама ================= */
const KEY = 'metior_consent';
const getConsent = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const setConsent = v => { try { localStorage.setItem(KEY, v); } catch { /* приватный режим */ } };
let adsLoaded = false;

// Загружает рекламный скрипт ТОЛЬКО если пользователь нажал «Принять».
function loadAds() {
  if (adsLoaded || getConsent() !== 'granted' || !ADS_SRC) return;
  const s = document.createElement('script');
  s.src = ADS_SRC;
  s.async = true;
  document.body.appendChild(s);
  adsLoaded = true;
}

function initCookie() {
  const box = $('#cookie');
  if (!box) return;
  if (getConsent() === null) box.hidden = false;
  $('#cookieYes').addEventListener('click', () => { setConsent('granted'); box.hidden = true; loadAds(); });
  $('#cookieNo').addEventListener('click', () => {
    const wasGranted = adsLoaded;
    setConsent('denied'); box.hidden = true;
    if (wasGranted) location.reload(); // выгружаем уже загруженные сторонние скрипты
  });
  const s = $('#cookieSettings');
  if (s) s.addEventListener('click', () => { box.hidden = false; });
  loadAds();
}

/* ================= Меню ================= */
function initMenu() {
  const btn = $('#menuBtn');
  if (!btn) return;
  const set = open => {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('menu-open')));
  $('#scrim').addEventListener('click', () => set(false));
  $('#drawer').addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.body.classList.contains('menu-open')) set(false);
    else if (location.hash.startsWith('#/game/')) location.hash = '#games';
  });
}

/* ================= Слайдер ================= */
function initSlider() {
  const track = $('#track');
  if (!track) return;
  const dots = $('#dots'), box = $('#slider');
  let i = 0, timer = null;
  function build() {
    track.replaceChildren(); dots.replaceChildren();
    NEWS.forEach((n, k) => {
      const a = el('a', 'slide');
      a.href = n.href;
      if (n.ad) { a.target = '_blank'; a.rel = 'noopener noreferrer sponsored'; }
      a.append(el('span', 'tag', L(n.tag)), el('h3', '', L(n.title)), el('p', '', L(n.text)));
      track.append(a);
      const d = el('button');
      d.type = 'button';
      d.setAttribute('aria-label', t('slide') + ' ' + (k + 1));
      d.addEventListener('click', () => { go(k); restart(); });
      dots.append(d);
    });
    go(i);
  }
  function go(n) {
    i = (n + NEWS.length) % NEWS.length;
    track.style.transform = 'translateX(' + (-100 * i) + '%)';
    [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
  }
  const stop = () => clearInterval(timer);
  const restart = () => { stop(); timer = setInterval(() => go(i + 1), 5000); };
  ['pointerenter', 'touchstart', 'focusin'].forEach(ev => box.addEventListener(ev, stop, { passive: true }));
  ['pointerleave', 'touchend', 'focusout'].forEach(ev => box.addEventListener(ev, restart, { passive: true }));
  let x0 = null; // свайп
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  langHooks.push(build);
  build(); restart();
}

/* ================= Каталог ================= */
let activeTag = '', query = '';
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 })
  : null;

function card(g, idx) {
  const a = el('article', 'card reveal');
  a.style.transitionDelay = Math.min(idx, 8) * 60 + 'ms';
  const c = el('div', 'cover');
  if (g.cover) {
    const img = new Image();
    img.src = g.cover; img.alt = ''; img.loading = 'lazy';
    img.addEventListener('error', () => { img.remove(); c.append(icon('gamepad', 'ph')); });
    c.append(img);
  } else c.append(icon('gamepad', 'ph'));
  const info = el('div', 'info');
  const tags = el('div', 'tags');
  g.tags.forEach(k => tags.append(el('span', '', tagName(k))));
  const play = el('a', 'btn');
  play.append(icon('play'), t('play'));
  play.href = '#/game/' + encodeURIComponent(g.id);
  info.append(el('h3', '', g.title), el('p', 'author', t('by') + ': ' + g.author), tags, play);
  const fav = el('button', 'fav');
  fav.append(icon('heart'));
  fav.type = 'button';
  fav.setAttribute('aria-label', t('fav_aria') + ': ' + g.title);
  fav.setAttribute('aria-pressed', isFav(g.id));
  fav.addEventListener('click', () => {
    toggleFav(g.id);
    fav.setAttribute('aria-pressed', isFav(g.id));
    if (activeTag === '__fav') renderGames();
  });
  a.append(c, fav, info);
  return a;
}

function renderGames() {
  const grid = $('#grid');
  if (!grid) return;
  const q = query.trim().toLowerCase();
  const list = GAMES.filter(g =>
    (!activeTag || (activeTag === '__fav' ? isFav(g.id) : g.tags.includes(activeTag))) &&
    (!q || (g.title + ' ' + g.author + ' ' + g.tags.map(tagName).join(' ')).toLowerCase().includes(q)));
  grid.replaceChildren(...list.map(card));
  $('#empty').hidden = list.length > 0;
  grid.querySelectorAll('.reveal').forEach(n => io ? io.observe(n) : n.classList.add('in'));
}

function renderRecent() {
  const box = $('#recent');
  if (!box) return;
  const list = store.get('metior_recent').map(id => GAMES.find(g => g.id === id)).filter(Boolean);
  box.hidden = !list.length;
  const nav = $('#navRecent'); if (nav) nav.hidden = !list.length;
  $('#recentGrid').replaceChildren(...list.map(card));
  box.querySelectorAll('.reveal').forEach(n => n.classList.add('in'));
}

// Теги и «Избранное» — один горизонтальный ряд с прокруткой
function buildChips() {
  const chips = $('#chips');
  const all = [...new Set(GAMES.flatMap(g => g.tags))];
  chips.replaceChildren(...['', '__fav', ...all].map(k => {
    const b = el('button', 'chip' + (k === activeTag ? ' on' : ''));
    b.type = 'button';
    if (k === '__fav') b.append(icon('heart'), t('favorites'));
    else b.textContent = k === '' ? t('all') : tagName(k);
    b.addEventListener('click', () => {
      activeTag = k;
      chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === b));
      renderGames();
    });
    return b;
  }));
}

function initCatalog() {
  if (!$('#chips')) return;
  buildChips();
  $('#q').addEventListener('input', e => { query = e.target.value; renderGames(); });
  renderGames(); renderRecent();
  langHooks.push(() => { buildChips(); renderGames(); renderRecent(); });
}

/* ================= Плеер (роутинг по #/game/id) ================= */
function route() {
  const player = $('#player');
  if (!player) return;
  const m = location.hash.match(/^#\/game\/([\w-]+)$/);
  const g = m && GAMES.find(x => x.id === decodeURIComponent(m[1]));
  const frame = $('#frame');
  if (g) {
    let u;
    try { u = new URL(g.url, location.href); } catch { return; }
    if (!['http:', 'https:', 'file:'].includes(u.protocol)) return; // блокируем javascript: и data:
    $('#playerTitle').textContent = g.title;
    frame.title = g.title;
    frame.src = u.href;
    player.hidden = false;
    document.body.classList.add('lock');
    document.title = g.title + ' — Metior';
    pushRecent(g.id);
  } else {
    player.hidden = true;
    frame.removeAttribute('src'); // останавливаем игру
    document.body.classList.remove('lock');
    document.title = t(document.body.dataset.title || 'title_home');
    renderRecent();
  }
}

function initPlayer() {
  const fs = $('#fsBtn');
  if (!fs) return;
  fs.addEventListener('click', () => { const f = $('#frame'); if (f.requestFullscreen) f.requestFullscreen(); });
  window.addEventListener('hashchange', route);
  route();
}

/* ================= Анимированный фон: метеоры ================= */
function initBg() {
  const c = $('#bg');
  if (!c) return;
  const x = c.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, dpr, stars = [], meteors = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const mk = () => ({ x: rnd(0, w * 1.4), y: rnd(-h * .3, h), len: rnd(60, 180) * dpr, v: rnd(2, 5) * dpr, a: rnd(.15, .6) });
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
    stars = Array.from({ length: Math.round(innerWidth / 9) }, () => ({ x: rnd(0, w), y: rnd(0, h), r: rnd(.4, 1.4) * dpr, p: rnd(0, 6.28) }));
    meteors = Array.from({ length: innerWidth < 600 ? 9 : 18 }, mk);
  }
  const D = { x: -.8, y: .6 }; // направление падения (влево-вниз)
  function frame(tm) {
    x.clearRect(0, 0, w, h);
    stars.forEach(s => {
      x.globalAlpha = .2 + .3 * Math.sin(tm / 900 + s.p);
      x.fillStyle = '#000';
      x.fillRect(s.x, s.y, s.r, s.r);
    });
    meteors.forEach((m, k) => {
      m.x += D.x * m.v; m.y += D.y * m.v;
      if (m.x < -m.len || m.y > h + m.len) { meteors[k] = mk(); meteors[k].y = -20; meteors[k].x = rnd(w * .2, w * 1.4); return; }
      const g = x.createLinearGradient(m.x, m.y, m.x - D.x * m.len, m.y - D.y * m.len);
      g.addColorStop(0, 'rgba(0,0,0,' + m.a + ')');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.globalAlpha = 1; x.strokeStyle = g; x.lineWidth = 1.4 * dpr;
      x.beginPath(); x.moveTo(m.x, m.y); x.lineTo(m.x - D.x * m.len, m.y - D.y * m.len); x.stroke();
    });
    if (!still) requestAnimationFrame(frame);
  }
  resize();
  addEventListener('resize', resize);
  requestAnimationFrame(frame);
}

/* ================= Настройки (язык) ================= */
function initSettings() {
  const m = $('#settings');
  if (!m) return;
  const open = v => {
    m.hidden = !v;
    document.body.classList.toggle('lock', v);
    if (v) { const b = $('[data-lang-btn][aria-pressed="true"]', m); if (b) b.focus(); }
  };
  document.querySelectorAll('[data-open-settings]').forEach(b => b.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    open(true);
  }));
  $('#settingsClose').addEventListener('click', () => open(false));
  m.addEventListener('click', e => { if (e.target === m) open(false); });
  m.querySelectorAll('[data-lang-btn]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) open(false); });
}

/* ================= Старт ================= */
document.addEventListener('DOMContentLoaded', () => {
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  initIcons(); applyLang(); initBg(); initMenu(); initSlider(); initCatalog(); initPlayer(); initCookie(); initSettings();
});
