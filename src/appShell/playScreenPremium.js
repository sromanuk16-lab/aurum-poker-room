/* Premium Play screen patch.
   Loaded after appShell.js. It replaces only playScreen() and keeps Home untouched. */
(function () {
  const playStakes = [
    { bb: '0.5 / 1', min: '50' },
    { bb: '1 / 2', min: '100' },
    { bb: '2 / 5', min: '250' }
  ];

  const dealerTile = 'assets/app/backgrounds/home-bg-premium-mobile.webp';

  const BIG = {
    chipBig: `<svg viewBox="0 0 120 120"><defs><radialGradient id="cbG" cx="42%" cy="33%" r="72%"><stop offset="0" stop-color="#ffeeb0"/><stop offset=".5" stop-color="#d6a23f"/><stop offset="1" stop-color="#7c4d16"/></radialGradient><radialGradient id="cbC" cx="42%" cy="36%" r="70%"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".55" stop-color="#cf9a37"/><stop offset="1" stop-color="#6f440f"/></radialGradient></defs><circle cx="60" cy="60" r="55" fill="url(#cbG)" stroke="#fff2c0" stroke-width="1.4"/><circle cx="60" cy="60" r="34" fill="url(#cbC)" stroke="#2f1c06" stroke-width="5" stroke-dasharray="9 10"/><circle cx="60" cy="60" r="20" fill="#0e0a05"/><path transform="translate(60,57)" fill="#ffe6a0" d="M0,-16 C0,-16 14,-2 14,7 A7,7 0 0 1 2,11 C3,15 4,17 7,19 L-7,19 C-3,17 -2,15 -1,11 A7,7 0 0 1 -14,7 C-14,-2 0,-16 0,-16 Z"/></svg>`,
    lockBig: `<svg viewBox="0 0 120 120"><defs><linearGradient id="lbG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#d6a23f"/><stop offset="1" stop-color="#7c4d16"/></linearGradient></defs><path d="M40 58V44a20 20 0 0 1 40 0v14" fill="none" stroke="url(#lbG)" stroke-width="9" stroke-linecap="round"/><rect x="31" y="54" width="58" height="48" rx="13" fill="url(#lbG)" stroke="#fff2c0" stroke-width="1.6"/><circle cx="60" cy="73" r="6.5" fill="#1a1004"/><path d="M56.5 77h7l-1.6 12h-3.8Z" fill="#1a1004"/></svg>`,
    trophyBig: `<svg viewBox="0 0 120 120"><defs><linearGradient id="tbG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#d6a23f"/><stop offset="1" stop-color="#8a571a"/></linearGradient></defs><path d="M37 26h46v17a23 23 0 0 1-46 0Z" fill="url(#tbG)" stroke="#fff2c0" stroke-width="1.5"/><path d="M37 29H24a11 11 0 0 0 11 15" fill="none" stroke="url(#tbG)" stroke-width="5.5"/><path d="M83 29h13a11 11 0 0 1-11 15" fill="none" stroke="url(#tbG)" stroke-width="5.5"/><rect x="55" y="67" width="10" height="14" fill="url(#tbG)"/><path d="M43 94l5-12h24l5 12Z" fill="url(#tbG)" stroke="#fff2c0" stroke-width="1"/><rect x="39" y="94" width="42" height="8" rx="2.5" fill="url(#tbG)"/></svg>`,
    chipsStack: `<svg viewBox="0 0 44 44"><defs><linearGradient id="hsG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe29a"/><stop offset="1" stop-color="#9a601a"/></linearGradient></defs><g stroke="#3a2407" stroke-width="1"><path d="M8 19v6" stroke="url(#hsG)"/><path d="M36 19v6" stroke="url(#hsG)"/><ellipse cx="22" cy="31" rx="14" ry="5.4" fill="url(#hsG)"/><ellipse cx="22" cy="25" rx="14" ry="5.4" fill="url(#hsG)"/><ellipse cx="22" cy="19" rx="14" ry="5.4" fill="url(#hsG)"/><ellipse cx="22" cy="19" rx="6" ry="2.2" fill="#3a2407" stroke="none"/></g></svg>`,
    stakeChip: `<svg viewBox="0 0 40 40"><defs><radialGradient id="scG" cx="42%" cy="35%" r="68%"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".55" stop-color="#cf9a37"/><stop offset="1" stop-color="#6f440f"/></radialGradient></defs><circle cx="20" cy="20" r="18" fill="url(#scG)"/><circle cx="20" cy="20" r="15.5" fill="none" stroke="#13100a" stroke-width="5" stroke-dasharray="5 7"/><circle cx="20" cy="20" r="9.5" fill="#0e0a05"/><path d="M20 14l1.9 4.4 4.8.4-3.6 3.1 1.1 4.7-4.2-2.5-4.2 2.5 1.1-4.7-3.6-3.1 4.8-.4Z" fill="#ffe9a8"/></svg>`,
    maskBig: `<svg viewBox="0 0 120 120"><defs><linearGradient id="mbG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6a0"/><stop offset=".55" stop-color="#c98f2f"/><stop offset="1" stop-color="#6f440f"/></linearGradient></defs><path d="M60 20c23 0 31 19 31 38 0 25-17 44-31 44S29 83 29 58c0-19 8-38 31-38Z" fill="url(#mbG)" stroke="#fff2c0" stroke-width="1.3"/><path d="M40 49l16 7M80 49l-16 7" stroke="#3a2407" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M43 56l13 4M77 56l-13 4" stroke="#1a1004" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M52 80q8 5 16 0" stroke="#3a2407" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`
  };

  function iconPremium(name, cls = '') {
    if (BIG[name]) return `<span class="${cls}">${BIG[name]}</span>`;
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
          <span class="pc-media pc-media--craft">${iconPremium('chipBig','pc-icon')}</span>
          <span class="pc-body"><strong>Быстрый стол</strong><small>Сесть за свободный стол</small></span>
          <span class="pc-chev">${I.chev}</span>
        </button>

        <button class="play-card card-surface" data-action="private">
          <span class="pc-media pc-media--craft">${iconPremium('lockBig','pc-icon')}</span>
          <span class="pc-body"><strong>Приватный стол</strong><small>Создать комнату или войти по коду</small></span>
          <span class="pc-chev">${I.chev}</span>
        </button>

        <div class="cash-card card-surface">
          <div class="cash-head">
            <span class="cash-title">${iconPremium('chipsStack','cash-ico')}КЕШ-ИГРЫ</span>
            <button class="cash-all" data-action="limits">Все лимиты <span>${I.chev}</span></button>
          </div>
          <div class="stakes">
            ${playStakes.map((s, index) => `
              <button class="stake ${index === state.stake ? 'is-on' : ''}" data-stake="${index}">
                ${iconPremium('stakeChip','stake-ico')}
                <b>${s.bb}</b><small>мин. ${s.min}</small>
              </button>`).join('')}
          </div>
        </div>

        <div class="play-card tourney-card card-surface">
          <span class="pc-media pc-media--craft">${iconPremium('trophyBig','pc-icon')}</span>
          <span class="pc-body">
            <strong>Турниры</strong><small>Скоро</small>
            <button class="more-pill" data-action="tourney">Узнать больше <span>${I.chev}</span></button>
          </span>
        </div>

        <button class="play-card card-surface" data-action="reactions">
          <span class="pc-media" ${tile(dealerTile)}>${iconPremium('maskBig','pc-icon')}</span>
          <span class="pc-body"><strong>Реакции дилера</strong><small>Уникальные анимации и реакции в реальном времени</small></span>
          <span class="pc-chev">${I.chev}</span>
        </button>
      </section>`;
  };

  const originalHandle = typeof handle === 'function' ? handle : null;
  handle = function handlePremiumPlay(action) {
    if (action === 'limits') {
      toast('Все лимиты: 0.5/1 — 50/100','chip');
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
    const y = window.scrollY;
    if (navigator.vibrate) navigator.vibrate(8);
    render();
    window.scrollTo(0, y);
    toast(`Выбран лимит <strong>${picked.bb}</strong>`, 'chip');
  }, true);
})();
