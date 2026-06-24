const AURUM_MEDIA = {
  mode: 'auto',
  imageUrl: 'assets/app/backgrounds/home-bg.jpg',
  videoUrl: 'assets/app/videos/home-idle.mp4',
  posterUrl: 'assets/app/backgrounds/home-bg.jpg'
};

const state = {
  active: 'home',
  coins: 125450,
  player: 'SERGEY',
  selected: {
    cardBack: 'Royal Gold',
    frame: 'Obsidian VIP',
    dealerButton: 'Classic Gold',
    aura: 'None',
    winnerEffect: 'None',
    dealerCeremony: '0 available'
  }
};

const tabs = [
  { id: 'home', label: 'Главная', icon: 'home' },
  { id: 'play', label: 'Играть', icon: 'cards' },
  { id: 'shop', label: 'Магазин', icon: 'cart' },
  { id: 'inventory', label: 'Инвентарь', icon: 'diamond' },
  { id: 'profile', label: 'Профиль', icon: 'profile' }
];

const homeActions = [
  { title: 'Быстрый стол', text: 'Сесть и играть', icon: 'chip', action: 'play' },
  { title: 'Приватный стол', text: 'Создать или войти', icon: 'lock', action: 'play' },
  { title: 'Магазин', text: 'Эксклюзивные предметы', icon: 'bag', action: 'shop' },
  { title: 'Профиль', text: 'Статистика и настройки', icon: 'profile', action: 'profile' }
];

const shopItems = [
  ['Royal Gold', 'Рубашка карт', '2 500'],
  ['Obsidian VIP', 'Рамка игрока', '4 800'],
  ['Dealer Button', 'Золотая кнопка дилера', '3 200'],
  ['Royal Respect', 'Церемония дилера после руки', '12 000'],
  ['Black Pass', 'VIP сезонный доступ', 'Premium']
];

function money(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

function icon(name) {
  return `<span class="aurum-icon aurum-icon-${name}" aria-hidden="true"></span>`;
}

function createMediaLayer() {
  const wrap = document.createElement('div');
  wrap.className = 'aurum-media-wrap';

  const fallback = document.createElement('div');
  fallback.className = 'aurum-bg-fallback';
  fallback.style.setProperty('--aurum-home-bg-image', `url("${AURUM_MEDIA.imageUrl}")`);
  wrap.appendChild(fallback);

  if (AURUM_MEDIA.mode === 'video' || AURUM_MEDIA.mode === 'auto') {
    const video = document.createElement('video');
    video.className = 'aurum-bg-media';
    video.src = AURUM_MEDIA.videoUrl;
    video.poster = AURUM_MEDIA.posterUrl;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.addEventListener('canplay', () => video.classList.add('is-ready'), { once: true });
    video.addEventListener('error', () => video.classList.remove('is-ready'));
    wrap.appendChild(video);
  }

  const shade = document.createElement('div');
  shade.className = 'aurum-bg-shade';
  const noise = document.createElement('div');
  noise.className = 'aurum-bg-noise';
  wrap.append(shade, noise);
  return wrap;
}

function topbar() {
  return `
    <header class="aurum-topbar">
      <div class="aurum-avatar">A</div>
      <button class="aurum-balance" data-action="shop">
        <span class="coin-medallion">✦</span>
        <span class="balance-copy"><small>AURUM COINS</small><strong>${money(state.coins)}</strong></span>
        <b class="aurum-plus">+</b>
      </button>
      <button class="aurum-alert">⌁</button>
    </header>
  `;
}

function homeScreen() {
  return `
    <section class="aurum-content home-content">
      <div class="brand-block">
        <div class="brand-star">✦</div>
        <h1 class="brand-title">AURUM</h1>
        <div class="brand-kicker">PRIVATE POKER CLUB</div>
        <p class="brand-welcome">Добро пожаловать в AURUM</p>
        <p class="brand-subtitle">Ваш приватный покерный клуб</p>
      </div>

      <button class="primary-cta" data-action="play">
        <span>Быстрый вход</span>
        <b>›</b>
      </button>

      <div class="home-action-grid">
        ${homeActions.map(item => `
          <button class="home-action-card" data-action="${item.action}">
            ${icon(item.icon)}
            <span><strong>${item.title}</strong><small>${item.text}</small></span>
            <em>›</em>
          </button>
        `).join('')}
      </div>

      <article class="vip-pass-card">
        <div class="vip-ticket"><b>VIP</b><small>BLACK PASS</small></div>
        <div class="vip-copy"><strong>VIP BLACK PASS</strong><span>Эксклюзивные привилегии для избранных</span></div>
        <div class="vip-arrow">›</div>
      </article>

      <article class="daily-bonus-card">
        ${icon('gift')}
        <div><strong>Ежедневный бонус</strong><span>Заходите каждый день и получайте награды!</span></div>
        <time>12:45:32</time>
      </article>

      <article class="dealer-ceremony-card">
        <strong>Dealer Ceremony</strong>
        <span>Премиальная реакция после руки</span>
      </article>
    </section>
  `;
}

function playScreen() {
  const items = [
    ['Быстрый стол', 'Мгновенно найти свободное место'],
    ['Выбор лимита', 'Низкий / средний / высокий стол'],
    ['Приватный стол', 'Создать комнату для друзей'],
    ['Войти по коду', 'Подключиться к закрытому столу'],
    ['Клубные столы', 'Игры внутри приватных клубов']
  ];
  return screenList('Играть', 'Подбор стола и приватные комнаты.', items);
}

function shopScreen() {
  return `
    <section class="aurum-content inner-content">
      <div class="screen-title"><h2>Магазин</h2><p>Визуальные предметы и премиальные события.</p></div>
      <div class="list-panel">
        ${shopItems.map(([name, desc, price]) => `
          <article class="product-card">
            <div><strong>${name}</strong><span>${desc}</span></div>
            <div class="price-pill">${price}</div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function inventoryScreen() {
  const items = [
    ['Рубашка карт', state.selected.cardBack],
    ['Рамка игрока', state.selected.frame],
    ['Кнопка дилера', state.selected.dealerButton],
    ['Аура хода', state.selected.aura],
    ['Эффект победы', state.selected.winnerEffect],
    ['Церемонии дилера', state.selected.dealerCeremony]
  ];
  return screenList('Инвентарь', 'Купленные предметы и активный стиль.', items, 'state');
}

function profileScreen() {
  const items = [
    ['Ник', state.player],
    ['Уровень', 'Black Pass LVL 7'],
    ['Статистика', 'Скоро: руки, победы, стиль игры'],
    ['Клуб', 'AURUM Private Club'],
    ['Настройки', 'Звук, фон, качество, аккаунт']
  ];
  return screenList('Профиль', 'Аккаунт игрока и настройки приложения.', items, 'state');
}

function screenList(title, subtitle, items, mode = 'arrow') {
  return `
    <section class="aurum-content inner-content">
      <div class="screen-title"><h2>${title}</h2><p>${subtitle}</p></div>
      <div class="list-panel">
        ${items.map(([name, desc]) => `
          <button class="list-button">
            <span><strong>${name}</strong><span>${desc}</span></span>
            <b class="${mode === 'state' ? 'state-pill' : 'price-pill'}">${mode === 'state' ? 'выбрано' : '›'}</b>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function currentScreen() {
  if (state.active === 'play') return playScreen();
  if (state.active === 'shop') return shopScreen();
  if (state.active === 'inventory') return inventoryScreen();
  if (state.active === 'profile') return profileScreen();
  return homeScreen();
}

function render() {
  const root = document.getElementById('aurumAppRoot');
  root.innerHTML = '';

  const shell = document.createElement('main');
  shell.className = 'aurum-shell';
  shell.appendChild(createMediaLayer());

  shell.insertAdjacentHTML('beforeend', `
    <div class="aurum-screen">
      ${topbar()}
      ${currentScreen()}
    </div>
    <nav class="bottom-nav">
      ${tabs.map(tab => `
        <button class="nav-item ${tab.id === state.active ? 'is-active' : ''}" data-tab="${tab.id}">
          ${icon(tab.icon)}
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </nav>
  `);

  root.appendChild(shell);

  root.querySelectorAll('[data-tab]').forEach(button => {
    button.addEventListener('click', () => {
      state.active = button.dataset.tab;
      render();
    });
  });

  root.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const next = button.dataset.action;
      if (next === 'play' || next === 'shop' || next === 'profile') {
        state.active = next;
        render();
      }
    });
  });
}

render();
