const AURUM_MEDIA = {
  imageUrl: 'assets/app/backgrounds/home-bg-premium-mobile.webp',
  avatarUrl: 'assets/app/icons/aurum-icon.svg'
};

const state = {
  active: 'home',
  coins: 125450,
  player: 'SERGEY',
  bonusClaimed: false,
  owned: { 'Royal Gold': true, 'Obsidian VIP': true },
  selected: {
    cardBack: 'Royal Gold',
    frame: 'Obsidian VIP',
    dealerButton: 'Classic Gold',
    aura: 'Нет',
    winnerEffect: 'Нет',
    dealerCeremony: '0 доступно'
  }
};

const I = {
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c.6 4.2 2.1 5.7 6.3 6.3.8.1.8 1.2 0 1.3-4.2.6-5.7 2.1-6.3 6.3-.1.8-1.2.8-1.3 0-.6-4.2-2.1-5.7-6.3-6.3-.8-.1-.8-1.2 0-1.3 4.2-.6 5.7-2.1 6.3-6.3.1-.8 1.2-.8 1.3 0Z"/></svg>`,
  coin: `<svg viewBox="0 0 40 40"><defs><radialGradient id="coinG" cx="40%" cy="32%" r="75%"><stop offset="0" stop-color="#fff0b0"/><stop offset=".55" stop-color="#d29a34"/><stop offset="1" stop-color="#7a4714"/></radialGradient></defs><circle cx="20" cy="20" r="18" fill="url(#coinG)" stroke="#fff1b8" stroke-width="1.2"/><path fill="#5a3308" d="M20 10c.4 3 1.4 4.1 4.4 4.4.6.1.6.9 0 1-3 .3-4 1.4-4.4 4.4-.1.6-.9.6-1 0-.3-3-1.4-4.1-4.4-4.4-.6-.1-.6-.9 0-1 3-.3 4.1-1.4 4.4-4.4.1-.6.9-.6 1 0Z" transform="translate(0 5)"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.2 7-2.2 7h16.4S18 14.5 18 8.5Z"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/></svg>`,
  chip: `<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="22" cy="22" r="18"/><circle cx="22" cy="22" r="9.5" stroke-dasharray="2 3.4"/><path d="M22 4v6M22 34v6M4 22h6M34 22h6"/></svg>`,
  lock: `<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="11" y="19" width="22" height="17" rx="4"/><path d="M15 19v-5a7 7 0 0 1 14 0v5"/><path d="M22 26v4"/></svg>`,
  bag: `<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17h18l2 19H11l2-19Z"/><path d="M17 17a5 5 0 0 1 10 0"/></svg>`,
  profile: `<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2"><circle cx="22" cy="15" r="7"/><path d="M10 36c2.8-7 21.2-7 24 0" stroke-linecap="round"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M6 10.5V20h12v-9.5"/></svg>`,
  cards: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="5" width="11" height="15" rx="2"/><rect x="9" y="3" width="11" height="15" rx="2" opacity=".65"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h2l2 11h10l2-8H8"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>`,
  gift: `<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="9" y="18" width="26" height="18" rx="3"/><path d="M22 18v18M9 25h26M14 13c0-4 6-4 8 5-8 0-8-5-8-5ZM30 13c0-4-6-4-8 5 8 0 8-5 8-5Z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  chev: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4 10-10"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4c0 4 2 6 5 6M16 6h4c0 4-2 6-5 6M12 13v4M8 20h8"/></svg>`,
  table: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="9" ry="6"/><ellipse cx="12" cy="12" rx="5.5" ry="3"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M4.3 7.2l2 1.2M17.7 15.6l2 1.2M4.3 16.8l2-1.2M17.7 8.4l2-1.2"/></svg>`
};

const tabs = [
  { id:'home', label:'ГЛАВНАЯ', icon:'home' },
  { id:'play', label:'ИГРАТЬ', icon:'cards' },
  { id:'shop', label:'МАГАЗИН', icon:'cart' },
  { id:'inventory', label:'ИНВЕНТАРЬ', icon:'bag' },
  { id:'profile', label:'ПРОФИЛЬ', icon:'profile' }
];

const homeActions = [
  { title:'Быстрый стол', text:'Сесть и играть', icon:'chip', action:'play' },
  { title:'Приватный стол', text:'Создать или войти', icon:'lock', action:'private' },
  { title:'Магазин', text:'Эксклюзивные предметы', icon:'bag', action:'shop' },
  { title:'Профиль', text:'Статистика и настройки', icon:'profile', action:'profile' }
];

const shopItems = [
  ['Royal Gold','Рубашка карт','2 500','cards'],
  ['Obsidian VIP','Рамка игрока','4 800','profile'],
  ['Dealer Button','Золотая кнопка дилера','3 200','chip'],
  ['Royal Respect','Церемония дилера после руки','12 000','trophy'],
  ['Black Pass','VIP сезонный доступ','Premium','star']
];

const money = value => new Intl.NumberFormat('ru-RU').format(value);
const ico = (name, cls='') => `<span class="${cls}">${I[name] || I.star || ''}</span>`;

function toast(msg, iconName='star') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const item = document.createElement('div');
  item.className = 'toast';
  item.innerHTML = `${ico(iconName,'t-ico')}<div>${msg}</div>`;
  wrap.appendChild(item);
  setTimeout(() => {
    item.classList.add('out');
    setTimeout(() => item.remove(), 300);
  }, 2400);
}

function topbar() {
  return `
    <header class="aurum-topbar">
      <button class="aurum-avatar" data-action="profile" aria-label="Профиль">
        <img src="${AURUM_MEDIA.avatarUrl}" alt="">
      </button>
      <div class="aurum-balance">
        ${ico('coin','coin-medallion')}
        <span class="balance-value" id="balanceValue">${money(state.coins)}</span>
        <button class="aurum-plus" data-action="topup" aria-label="Пополнить">${I.plus}</button>
      </div>
      <span class="aurum-spacer"></span>
      <button class="aurum-alert" data-action="alerts" aria-label="Уведомления">${I.bell}<span class="dot"></span></button>
    </header>`;
}

function homeScreen() {
  return `
    <section class="aurum-content home-content">
      <div class="brand-block">
        <div class="brand-star">${I.star}</div>
        <h1 class="brand-title">AURUM</h1>
        <div class="brand-kicker">PRIVATE POKER CLUB</div>
      </div>
      <div class="hero-spacer" aria-hidden="true"></div>
      <div class="welcome-block">
        <p class="brand-welcome">Добро пожаловать в AURUM</p>
        <p class="brand-subtitle">Ваш приватный покерный клуб</p>
      </div>
      <button class="primary-cta" data-action="quickjoin"><span>Быстрый вход</span><span class="chev">${I.chev}</span></button>
      <div class="home-action-grid">
        ${homeActions.map(action => `
          <button class="home-action-card card-surface" data-action="${action.action}">
            ${ico(action.icon,'action-ico')}
            <span><strong>${action.title}</strong><small>${action.text}</small></span>
          </button>`).join('')}
      </div>
      <button class="vip-pass-card card-surface" data-action="vip">
        <div class="vip-ticket"><span class="v">${I.star}VIP</span><small>BLACK PASS</small></div>
        <div class="vip-copy"><strong>VIP BLACK PASS</strong><span>Эксклюзивные привилегии для избранных</span></div>
        <span class="vip-arrow">${I.chev}</span>
      </button>
      <button class="daily-bonus-card card-surface" data-action="bonus">
        ${ico('gift','bonus-ico')}
        <div><strong>Ежедневный бонус</strong><span class="sub">Заходите каждый день и получайте награды!</span></div>
        <div class="bonus-timer"><span class="lbl">Следующий бонус через:</span><span class="clk">${I.clock}<span id="bonusTimer">12:45:32</span></span></div>
      </button>
    </section>`;
}

function playScreen() {
  const items = [
    ['Быстрый стол','Сесть за свободный стол','chip','seat'],
    ['Приватный стол','Создать комнату или войти по коду','lock','private'],
    ['Свободные столы','Выбрать лимит и место','table','tables'],
    ['Турниры','Скоро','trophy','soon'],
    ['VIP Black Pass','Предметы, статусы и церемонии дилера','star','vip']
  ];
  return screenList('Играть', 'Выберите режим игры.', items);
}

function shopScreen() {
  return `
    <section class="aurum-content">
      <div class="screen-head"><h2>Магазин</h2><p>Визуальные предметы и премиальные события.</p></div>
      <div class="list-panel">
        ${shopItems.map(([name, desc, price, iconName]) => {
          const owned = state.owned[name];
          const pill = owned ? `<span class="pill owned">Куплено</span>` : price === 'Premium' ? `<button class="pill" data-buy="${name}" data-price="0">Premium</button>` : `<button class="pill" data-buy="${name}" data-price="${price.replace(/\s/g,'')}">${price}</button>`;
          return `<div class="list-button card-surface">${ico(iconName,'li-ico')}<span class="li-body"><strong>${name}</strong><span>${desc}</span></span>${pill}</div>`;
        }).join('')}
      </div>
    </section>`;
}

function inventoryScreen() {
  const items = [
    ['Рубашка карт', state.selected.cardBack, 'cards'],
    ['Рамка игрока', state.selected.frame, 'profile'],
    ['Кнопка дилера', state.selected.dealerButton, 'chip'],
    ['Аура хода', state.selected.aura, 'star'],
    ['Эффект победы', state.selected.winnerEffect, 'trophy'],
    ['Церемонии дилера', state.selected.dealerCeremony, 'table']
  ];
  return screenList('Инвентарь', 'Купленные предметы и активный стиль.', items, 'state');
}

function profileScreen() {
  const items = [
    ['Ник', state.player,'profile'],
    ['Баланс', money(state.coins) + ' AURUM','coin'],
    ['Уровень','Black Pass • LVL 7','star'],
    ['Статистика','Руки, победы, стиль игры','trophy'],
    ['Клуб','AURUM Private Club','table'],
    ['Настройки','Звук, фон, качество, аккаунт','gear']
  ];
  return screenList('Профиль', 'Аккаунт игрока и настройки приложения.', items);
}

function screenList(title, subtitle, items, mode = 'arrow') {
  return `
    <section class="aurum-content">
      <div class="screen-head"><h2>${title}</h2><p>${subtitle}</p></div>
      <div class="list-panel">
        ${items.map(([name, desc, iconName, action = 'soon']) => `
          <button class="list-button card-surface" data-action="${action}">
            ${ico(iconName,'li-ico')}
            <span class="li-body"><strong>${name}</strong><span>${desc}</span></span>
            ${mode === 'state' ? '<span class="pill ghost">выбрано</span>' : `<span class="li-chev">${I.chev}</span>`}
          </button>`).join('')}
      </div>
    </section>`;
}

function currentScreen() {
  if (state.active === 'play') return playScreen();
  if (state.active === 'shop') return shopScreen();
  if (state.active === 'inventory') return inventoryScreen();
  if (state.active === 'profile') return profileScreen();
  return homeScreen();
}

function go(tab) {
  if (!tabs.some(item => item.id === tab)) return;
  state.active = tab;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bumpBalance() {
  const el = document.getElementById('balanceValue');
  if (el) { el.classList.remove('coin-bump'); void el.offsetWidth; el.classList.add('coin-bump'); }
}

function handle(action) {
  switch (action) {
    case 'home': case 'play': case 'shop': case 'inventory': case 'profile': go(action); break;
    case 'quickjoin': case 'seat': toast('Ищем для вас свободный стол…','table'); break;
    case 'private': toast('Создание приватного стола…','lock'); break;
    case 'tables': toast('Открываем список свободных столов…','table'); break;
    case 'vip': toast('<strong>VIP BLACK PASS</strong> — привилегии для избранных','star'); break;
    case 'soon': toast('Скоро будет доступно','star'); break;
    case 'alerts': toast('Новых уведомлений нет','bell'); break;
    case 'topup': state.coins += 25000; render(); toast('<strong>+25 000</strong> AURUM зачислено','coin'); break;
    case 'bonus':
      if (state.bonusClaimed) { toast('Бонус уже получен сегодня','gift'); break; }
      state.bonusClaimed = true; state.coins += 5000; render(); toast('<strong>Ежедневный бонус +5 000</strong> AURUM','gift'); break;
  }
}

function buy(name, price) {
  if (state.owned[name]) { toast('Этот предмет уже куплен','check'); return; }
  if (price > 0 && state.coins < price) { toast('Недостаточно AURUM','coin'); return; }
  state.coins -= price; state.owned[name] = true; toast(`<strong>${name}</strong> куплено`,'check'); render();
}

function render() {
  const root = document.getElementById('aurumAppRoot');
  if (!root) return;
  root.innerHTML = '';
  const shell = document.createElement('main');
  shell.className = 'aurum-shell';
  shell.innerHTML = `
    <div class="aurum-bg-fallback" style="--aurum-home-bg-image:url('${AURUM_MEDIA.imageUrl}')"></div>
    <div class="aurum-bg-shade"></div>
    <div class="aurum-bg-noise"></div>
    <div class="aurum-screen">${topbar()}${currentScreen()}</div>
    <nav class="bottom-nav">${tabs.map(tab => `<button class="nav-item ${tab.id === state.active ? 'is-active' : ''}" data-tab="${tab.id}">${ico(tab.icon,'nav-ico')}<span>${tab.label}</span></button>`).join('')}</nav>`;
  root.appendChild(shell);
  root.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => go(button.dataset.tab)));
  root.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => handle(button.dataset.action)));
  root.querySelectorAll('[data-buy]').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); buy(button.dataset.buy, Number(button.dataset.price)); }));
}

let remain = 12 * 3600 + 45 * 60 + 32;
function tickBonus() {
  const el = document.getElementById('bonusTimer');
  remain = remain > 0 ? remain - 1 : 24 * 3600;
  if (el) {
    const hours = String(Math.floor(remain / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remain % 3600) / 60)).padStart(2, '0');
    const seconds = String(remain % 60).padStart(2, '0');
    el.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

function registerAurumServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js?v=20260625-claude-1').catch(error => console.warn('AURUM service worker registration failed:', error));
  });
}

setInterval(tickBonus, 1000);
render();
registerAurumServiceWorker();
