const AURUM_MEDIA = {
  mode: 'image',
  imageUrl: 'assets/app/backgrounds/home-bg-premium-mobile.webp',
  videoUrl: '',
  posterUrl: 'assets/app/backgrounds/home-bg-premium-mobile.webp'
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

      <button class="vip-strip" data-action="shop">
        <span class="vip-card-art">VIP<br><small>BLACK PASS</small></span>
        <span><strong>VIP BLACK PASS</strong><small>Эксклюзивные привилегии для избранных</small></span>
        <em>›</em>
      </button>

      <button class="bonus-strip" data-action="shop">
        ${icon('gift')}
        <span><strong>Ежедневный бонус</strong><small>Забери награду за вход сегодня.</small></span>
        <b>12:45:32</b>
      </button>
    </section>
  `;
}

function playScreen() {
  return `
    <section class="aurum-content pane-content">
      <h2>Играть</h2>
      <p>Выберите режим игры</p>
      <button class="wide-card">${icon('chip')}<span><strong>Быстрый стол</strong><small>Сесть за свободный стол</small></span><em>›</em></button>
      <button class="wide-card">${icon('lock')}<span><strong>Приватный стол</strong><small>Создать комнату или войти по коду</small></span><em>›</em></button>
      <div class="limit-row"><button>0.5 / 1<small>Вход от 50</small></button><button>1 / 2<small>Вход от 100</small></button><button>2 / 5<small>Вход от 250</small></button></div>
      <button class="wide-card muted">${icon('trophy')}<span><strong>Турниры</strong><small>Скоро</small></span></button>
    </section>
  `;
}

function shopScreen() {
  return `
    <section class="aurum-content pane-content">
      <h2>Магазин</h2>
      <p>Эксклюзивные предметы и привилегии</p>
      <button class="feature-card"><strong>VIP BLACK PASS</strong><small>Еженедельные бонусы, стиль и статус</small></button>
      <div class="shop-grid">
        ${shopItems.map(([name, type, price]) => `
          <article><b>${name}</b><small>${type}</small><em>${price}</em></article>
        `).join('')}
      </div>
    </section>
  `;
}

function inventoryScreen() {
  return `
    <section class="aurum-content pane-content">
      <h2>Инвентарь</h2>
      <p>Ваши предметы и активный стиль</p>
      <div class="equipped-card">
        ${Object.entries(state.selected).map(([key, value]) => `<span><small>${key}</small><strong>${value}</strong></span>`).join('')}
      </div>
      <button class="wide-card">${icon('mask')}<span><strong>Церемонии дилера</strong><small>Доступные реакции после руки</small></span><em>›</em></button>
      <button class="wide-card">${icon('cards')}<span><strong>Карты и эффекты</strong><small>Рубашки, ауры, победные эффекты</small></span><em>›</em></button>
    </section>
  `;
}

function profileScreen() {
  return `
    <section class="aurum-content pane-content">
      <h2>Профиль</h2>
      <p>Статус, достижения и настройки</p>
      <div class="profile-hero"><div class="big-avatar">A</div><span><strong>Aurum Prestige</strong><small>Black Pass Member • уровень 7</small></span></div>
      <div class="stats-row"><span><b>1860</b><small>Рейтинг</small></span><span><b>248</b><small>Побед</small></span><span><b>61%</b><small>Винрейт</small></span></div>
      <button class="wide-card">${icon('profile')}<span><strong>Редактировать профиль</strong><small>Аватар, рамка и титул</small></span><em>›</em></button>
      <button class="wide-card">${icon('bell')}<span><strong>Уведомления</strong><small>Настройки событий</small></span><em>›</em></button>
    </section>
  `;
}

function renderScreen() {
  if (state.active === 'play') return playScreen();
  if (state.active === 'shop') return shopScreen();
  if (state.active === 'inventory') return inventoryScreen();
  if (state.active === 'profile') return profileScreen();
  return homeScreen();
}

function bottomNav() {
  return `
    <nav class="aurum-bottom-nav">
      ${tabs.map(tab => `<button class="${state.active === tab.id ? 'is-active' : ''}" data-tab="${tab.id}">${icon(tab.icon)}<span>${tab.label}</span></button>`).join('')}
    </nav>
  `;
}

function render() {
  const app = document.getElementById('aurum-app');
  app.innerHTML = '';
  app.appendChild(createMediaLayer());
  const shell = document.createElement('main');
  shell.className = 'aurum-shell';
  shell.innerHTML = topbar() + renderScreen() + bottomNav();
  app.appendChild(shell);
}

document.addEventListener('click', event => {
  const tab = event.target.closest('[data-tab]');
  if (tab) {
    state.active = tab.dataset.tab;
    render();
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action) {
    state.active = action.dataset.action;
    render();
  }
});

render();