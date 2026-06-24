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
  owned: ['Royal Gold Card Back'],
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
  { id: 'home', label: 'Главная', icon: '◆' },
  { id: 'play', label: 'Играть', icon: '♠' },
  { id: 'shop', label: 'Магазин', icon: '✦' },
  { id: 'inventory', label: 'Инвентарь', icon: '◈' },
  { id: 'profile', label: 'Профиль', icon: '●' }
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
        <span><small>AURUM COINS</small><strong>${money(state.coins)}</strong></span>
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
        <div class="brand-kicker">PRIVATE POKER CLUB</div>
        <h1 class="brand-title">AURUM</h1>
        <p class="brand-subtitle">Приватный покерный клуб</p>
      </div>
      <button class="primary-cta" data-action="play">Быстрый вход</button>
      <div class="card-stack">
        <article class="aurum-wide-card">
          <div><strong>BLACK PASS LVL 7</strong><span>VIP прогресс 7 250 / 10 000</span></div>
          <div class="pass-progress"><i></i></div>
        </article>
        <article class="aurum-wide-card">
          <div><strong>Ежедневный бонус</strong><span>Забери награду за вход сегодня.</span></div>
        </article>
        <article class="aurum-wide-card">
          <div><strong>Dealer Ceremony</strong><span>Премиальная реакция после руки.</span></div>
        </article>
      </div>
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
  return screenList('Играть', 'Пока это меню входа. Позже здесь будет подбор стола и мультиплеер.', items);
}

function shopScreen() {
  return `
    <section class="aurum-content">
      <div class="screen-title"><h2>Магазин</h2><p>Покупка визуальных предметов и премиальных событий.</p></div>
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
  return screenList('Инвентарь', 'Здесь игрок выбирает купленные предметы и активный стиль.', items, 'state');
}

function profileScreen() {
  const items = [
    ['Ник', state.player],
    ['Уровень', 'Black Pass LVL 7'],
    ['Статистика', 'Скоро: руки, победы, стиль игры'],
    ['Клуб', 'AURUM Private Club'],
    ['Настройки', 'Звук, видеофон, качество, аккаунт']
  ];
  return screenList('Профиль', 'Аккаунт игрока и настройки приложения.', items, 'state');
}

function screenList(title, subtitle, items, mode = 'arrow') {
  return `
    <section class="aurum-content">
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
          <span class="icon">${tab.icon}</span>
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

  root.querySelectorAll('[data-action="play"]').forEach(button => {
    button.addEventListener('click', () => {
      state.active = 'play';
      render();
    });
  });

  root.querySelectorAll('[data-action="shop"]').forEach(button => {
    button.addEventListener('click', () => {
      state.active = 'shop';
      render();
    });
  });
}

render();
