/* Premium Play screen patch.
   Loaded after appShell.js. It replaces only playScreen() and keeps Home untouched. */
(function () {
  const playStakes = [
    { bb: '0.5 / 1', min: '50' },
    { bb: '1 / 2', min: '100' },
    { bb: '2 / 5', min: '250' }
  ];

  const dealerTile = 'assets/app/backgrounds/home-bg-premium-mobile.webp';

  function iconSafe(name, cls = '') {
    if (typeof ico === 'function') return ico(name, cls);
    return `<span class="${cls}">${(typeof I !== 'undefined' && I[name]) ? I[name] : ''}</span>`;
  }

  playScreen = function playScreenPremium() {
    if (typeof state !== 'undefined' && typeof state.stake !== 'number') state.stake = 1;
    const tile = url => `style="--tile:url('${url}')"`;

    return `
      <section class="aurum-content play-screen">
        <div class="play-head">
          <h2 class="play-title"><span class="orn">${I.star}</span>ИГРАТЬ<span class="orn">${I.star}</span></h2>
          <p>Выберите, как вы хотите сыграть</p>
        </div>

        <button class="play-card card-surface" data-action="seat">
          <span class="pc-media pc-media--craft">${iconSafe('chip','pc-icon')}</span>
          <span class="pc-body"><strong>Быстрый стол</strong><small>Сесть за свободный стол</small></span>
          <span class="pc-chev">${I.chev}</span>
        </button>

        <button class="play-card card-surface" data-action="private">
          <span class="pc-media pc-media--craft">${iconSafe('lock','pc-icon')}</span>
          <span class="pc-body"><strong>Приватный стол</strong><small>Создать комнату или войти по коду</small></span>
          <span class="pc-chev">${I.chev}</span>
        </button>

        <div class="cash-card card-surface">
          <div class="cash-head">
            <span class="cash-title">${iconSafe('chip','cash-ico')}КЕШ-ИГРЫ</span>
            <button class="cash-all" data-action="limits">Все лимиты <span>${I.chev}</span></button>
          </div>
          <div class="stakes">
            ${playStakes.map((s, index) => `
              <button class="stake ${index === state.stake ? 'is-on' : ''}" data-stake="${index}">
                ${iconSafe('chip','stake-ico')}
                <b>${s.bb}</b><small>мин. ${s.min}</small>
              </button>`).join('')}
          </div>
        </div>

        <div class="play-card tourney-card card-surface">
          <span class="pc-media pc-media--craft">${iconSafe('trophy','pc-icon')}</span>
          <span class="pc-body">
            <strong>Турниры</strong><small>Скоро</small>
            <button class="more-pill" data-action="tourney">Узнать больше <span>${I.chev}</span></button>
          </span>
        </div>

        <button class="play-card card-surface" data-action="reactions">
          <span class="pc-media" ${tile(dealerTile)}>${iconSafe('profile','pc-icon')}</span>
          <span class="pc-body"><strong>Реакции дилера</strong><small>Уникальные анимации и реакции в реальном времени</small></span>
          <span class="pc-chev">${I.chev}</span>
        </button>
      </section>`;
  };

  const originalHandle = typeof handle === 'function' ? handle : null;
  handle = function handlePremiumPlay(action) {
    if (action === 'limits') {
      toast('Лимиты будут открываться отдельным списком','chip');
      return;
    }
    if (action === 'tourney') {
      toast('Турнирный режим добавим после кеш-столов','trophy');
      return;
    }
    if (action === 'reactions') {
      toast('Реакции дилера будут привязаны к событиям игры','profile');
      return;
    }
    if (originalHandle) return originalHandle(action);
  };

  document.addEventListener('click', event => {
    const stakeButton = event.target.closest('[data-stake]');
    if (!stakeButton) return;

    event.preventDefault();
    event.stopPropagation();

    state.stake = Number(stakeButton.dataset.stake || 0);
    const picked = playStakes[state.stake] || playStakes[0];
    if (navigator.vibrate) navigator.vibrate(8);
    render();
    toast(`Выбран лимит <strong>${picked.bb}</strong>`, 'chip');
  }, true);
})();
