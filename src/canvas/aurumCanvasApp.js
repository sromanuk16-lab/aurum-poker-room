(() => {
  const DESIGN_W = 390;
  const DESIGN_H = 844;
  const BG_URL = 'assets/app/backgrounds/home-bg-premium-mobile.webp';

  const state = {
    screen: 'home',
    coins: 125450,
    timer: '12:45:32',
    pressed: null,
    bg: null,
    bgReady: false,
    lastPointer: null
  };

  const root = document.getElementById('aurumCanvasRoot');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  root.appendChild(canvas);

  const hitAreas = [];

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function money(value) {
    return new Intl.NumberFormat('ru-RU').format(value);
  }

  function fit() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    canvas.style.width = `${vw}px`;
    canvas.style.height = `${vh}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }

  function scaleInfo() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);
    const x = (vw - DESIGN_W * scale) / 2;
    const y = (vh - DESIGN_H * scale) / 2;
    return { x, y, scale };
  }

  function toDesign(clientX, clientY) {
    const { x, y, scale } = scaleInfo();
    return { x: (clientX - x) / scale, y: (clientY - y) / scale };
  }

  function withDesign(fn) {
    const { x, y, scale } = scaleInfo();
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    fn();
    ctx.restore();
  }

  function rr(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function fillTextCenter(text, x, y, size, family = 'Georgia', color = '#f6d18a', weight = '700', spacing = 0) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${family}, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,.75)';
    ctx.shadowBlur = 8;
    if (!spacing) {
      ctx.fillText(text, x, y);
    } else {
      const letters = Array.from(text);
      const widths = letters.map(ch => ctx.measureText(ch).width);
      const total = widths.reduce((a, b) => a + b, 0) + spacing * (letters.length - 1);
      let cx = x - total / 2;
      letters.forEach((ch, i) => {
        ctx.fillText(ch, cx + widths[i] / 2, y);
        cx += widths[i] + spacing;
      });
    }
    ctx.restore();
  }

  function goldGradient(x, y, h) {
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, '#fff0b4');
    g.addColorStop(0.35, '#e2aa48');
    g.addColorStop(0.65, '#a96719');
    g.addColorStop(1, '#fff0b4');
    return g;
  }

  function drawImageCover(img, x, y, w, h, ox = 0.5, oy = 0.5) {
    const iw = img.width;
    const ih = img.height;
    const ir = iw / ih;
    const r = w / h;
    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (ir > r) {
      sw = ih * r;
      sx = (iw - sw) * ox;
    } else {
      sh = iw / r;
      sy = (ih - sh) * oy;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  function drawBg() {
    ctx.fillStyle = '#050403';
    ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
    if (state.bgReady) {
      drawImageCover(state.bg, 0, 0, DESIGN_W, DESIGN_H, 0.5, 0.42);
    }
    const v = ctx.createRadialGradient(DESIGN_W / 2, DESIGN_H * 0.36, 20, DESIGN_W / 2, DESIGN_H * 0.48, DESIGN_H * 0.72);
    v.addColorStop(0, 'rgba(0,0,0,0.02)');
    v.addColorStop(0.58, 'rgba(0,0,0,0.10)');
    v.addColorStop(1, 'rgba(0,0,0,0.70)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);

    const top = ctx.createLinearGradient(0, 0, 0, 160);
    top.addColorStop(0, 'rgba(0,0,0,0.70)');
    top.addColorStop(1, 'rgba(0,0,0,0.00)');
    ctx.fillStyle = top;
    ctx.fillRect(0, 0, DESIGN_W, 170);
  }

  function drawMedallion(x, y, r, text) {
    ctx.save();
    const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.2, x, y, r);
    g.addColorStop(0, '#fff0aa');
    g.addColorStop(0.38, '#d99a31');
    g.addColorStop(1, '#3f2108');
    ctx.shadowColor = 'rgba(226,164,65,.52)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'rgba(10,7,5,.86)';
    ctx.beginPath(); ctx.arc(x, y, r + 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,226,148,.8)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = '#130b04';
    ctx.font = `800 ${r * 1.05}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y + 1);
    ctx.restore();
  }

  function drawTopbar() {
    drawCircleButton(58, 48, 24, 'A');
    drawPill(105, 20, 180, 50, 24);
    drawMedallion(130, 45, 17, '✦');
    ctx.fillStyle = 'rgba(245,212,157,.58)';
    ctx.font = '9px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AURUM COINS', 196, 34);
    ctx.fillStyle = '#fff1cf';
    ctx.font = '800 24px Arial, sans-serif';
    ctx.fillText(money(state.coins), 196, 57);
    drawMedallion(262, 45, 18, '+');
    drawCircleButton(330, 48, 24, '⌁');
  }

  function drawCircleButton(x, y, r, text) {
    ctx.save();
    ctx.shadowColor = 'rgba(217,154,60,.32)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'rgba(8,6,4,.84)';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createLinearGradient(x, y - r, x, y + r);
    g.addColorStop(0, 'rgba(255,226,148,.72)');
    g.addColorStop(.5, 'rgba(216,154,60,.38)');
    g.addColorStop(1, 'rgba(92,49,12,.58)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fillStyle = '#ffe09a';
    ctx.font = '800 19px Arial, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y + 1);
    ctx.restore();
  }

  function drawPill(x, y, w, h, r) {
    ctx.save();
    rr(ctx, x, y, w, h, r);
    const fill = ctx.createLinearGradient(0, y, 0, y + h);
    fill.addColorStop(0, 'rgba(20,14,8,.86)');
    fill.addColorStop(0.52, 'rgba(7,5,4,.94)');
    fill.addColorStop(1, 'rgba(23,14,6,.90)');
    ctx.fillStyle = fill;
    ctx.shadowColor = 'rgba(0,0,0,.7)';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.strokeStyle = 'rgba(216,154,60,.42)';
    ctx.lineWidth = 1.1;
    ctx.stroke();
    ctx.restore();
  }

  function drawLogo() {
    fillTextCenter('✦', 195, 104, 24, 'Arial', '#ffe09b', '700');
    ctx.save();
    const g = goldGradient(0, 124, 70);
    ctx.fillStyle = g;
    ctx.font = '700 64px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,.9)';
    ctx.shadowBlur = 12;
    ctx.fillText('AURUM', 195, 154);
    ctx.restore();
    fillTextCenter('PRIVATE POKER CLUB', 195, 202, 12, 'Arial', '#e2ad55', '500', 4.2);
  }

  function drawButton(x, y, w, h, label, sub, opts = {}) {
    const pressed = state.pressed === opts.id;
    ctx.save();
    const r = opts.radius ?? 16;
    const scale = pressed ? 0.985 : 1;
    ctx.translate(x + w / 2, y + h / 2);
    ctx.scale(scale, scale);
    x = -w / 2; y = -h / 2;
    rr(ctx, x, y, w, h, r);

    const fill = ctx.createLinearGradient(0, y, 0, y + h);
    if (opts.gold) {
      fill.addColorStop(0, '#ffd979');
      fill.addColorStop(0.45, '#bf751c');
      fill.addColorStop(0.60, '#9c5a13');
      fill.addColorStop(1, '#e7aa43');
      ctx.shadowColor = 'rgba(255,181,45,.34)';
      ctx.shadowBlur = 18;
    } else {
      fill.addColorStop(0, 'rgba(16,12,8,.92)');
      fill.addColorStop(1, 'rgba(2,2,2,.97)');
      ctx.shadowColor = 'rgba(0,0,0,.75)';
      ctx.shadowBlur = 14;
    }
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = opts.gold ? 'rgba(255,229,150,.80)' : 'rgba(206,143,54,.44)';
    ctx.lineWidth = opts.gold ? 1.6 : 1.1;
    ctx.stroke();

    if (pressed) {
      ctx.save();
      ctx.clip();
      ctx.fillStyle = 'rgba(255,223,126,.20)';
      ctx.fillRect(x, y, w, h);
      ctx.restore();
    }

    if (opts.icon) drawIcon(opts.icon, x + 36, y + h / 2, opts.gold ? '#1a0d02' : '#f3c971');

    ctx.textAlign = opts.gold ? 'center' : 'left';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,.65)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = opts.gold ? '#120902' : '#fff0cc';
    ctx.font = `700 ${opts.gold ? 29 : 18}px Georgia, serif`;
    const textX = opts.gold ? 0 : x + 70;
    ctx.fillText(label, textX, y + (opts.gold ? 36 : 28));

    if (sub) {
      ctx.fillStyle = opts.gold ? 'rgba(31,16,2,.78)' : 'rgba(255,241,210,.78)';
      ctx.font = `${opts.gold ? 500 : 400} ${opts.gold ? 13 : 13}px Arial, sans-serif`;
      ctx.fillText(sub, textX, y + (opts.gold ? 57 : 52));
    }

    ctx.fillStyle = opts.gold ? 'rgba(26,12,2,.86)' : '#f2c46e';
    ctx.font = '700 28px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('›', x + w - 22, y + h / 2 + 1);
    ctx.restore();
  }

  function drawIcon(name, x, y, color) {
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.3;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (name === 'chip') {
      ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.fillText('♠', x - 5, y + 6);
    } else if (name === 'lock') {
      ctx.strokeRect(x - 14, y - 2, 28, 24);
      ctx.beginPath(); ctx.arc(x, y - 2, 12, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y + 10, 3, 0, Math.PI * 2); ctx.fill();
    } else if (name === 'bag') {
      ctx.strokeRect(x - 15, y - 6, 30, 28);
      ctx.beginPath(); ctx.arc(x, y - 6, 10, Math.PI, 0); ctx.stroke();
    } else if (name === 'profile') {
      ctx.beginPath(); ctx.arc(x, y - 8, 9, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y + 18, 18, Math.PI, 0); ctx.stroke();
    }
    ctx.restore();
  }

  function addHit(id, x, y, w, h, action) {
    hitAreas.push({ id, x, y, w, h, action });
  }

  function drawHome() {
    hitAreas.length = 0;
    drawBg();
    drawTopbar();
    drawLogo();

    fillTextCenter('ДОБРО ПОЖАЛОВАТЬ В AURUM', 195, 322, 19, 'Georgia', '#f0c978', '700', 1.2);
    fillTextCenter('Ваш приватный покерный клуб', 195, 346, 15, 'Arial', '#f0e0c8', '400');

    drawButton(28, 376, 334, 66, 'БЫСТРЫЙ ВХОД', '', { id: 'quick-entry', gold: true, radius: 20 });
    drawButton(22, 462, 166, 74, 'БЫСТРЫЙ СТОЛ', 'Сесть и играть', { id: 'quick-table', icon: 'chip' });
    drawButton(202, 462, 166, 74, 'ПРИВАТНЫЙ СТОЛ', 'Создать или войти', { id: 'private-table', icon: 'lock' });
    drawButton(22, 552, 166, 74, 'МАГАЗИН', 'Эксклюзивные предметы', { id: 'shop', icon: 'bag' });
    drawButton(202, 552, 166, 74, 'ПРОФИЛЬ', 'Статистика и настройки', { id: 'profile', icon: 'profile' });

    drawButton(22, 648, 346, 76, 'VIP BLACK PASS', 'Эксклюзивные привилегии для избранных', { id: 'vip', radius: 15 });
    drawButton(22, 738, 346, 54, 'ЕЖЕДНЕВНЫЙ БОНУС', 'Заходите каждый день и получайте награды', { id: 'bonus', radius: 14 });
    ctx.fillStyle = '#dba34a'; ctx.font = '700 19px Arial, sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(state.timer, 346, 773);

    drawNav();

    addHit('quick-entry', 28, 376, 334, 66, 'play');
    addHit('quick-table', 22, 462, 166, 74, 'play');
    addHit('private-table', 202, 462, 166, 74, 'play');
    addHit('shop', 22, 552, 166, 74, 'shop');
    addHit('profile', 202, 552, 166, 74, 'profile');
    addHit('vip', 22, 648, 346, 76, 'shop');
    addHit('bonus', 22, 738, 346, 54, 'shop');
    addHit('nav-home', 0, 792, 78, 52, 'home');
    addHit('nav-play', 78, 792, 78, 52, 'play');
    addHit('nav-shop', 156, 792, 78, 52, 'shop');
    addHit('nav-inventory', 234, 792, 78, 52, 'inventory');
    addHit('nav-profile', 312, 792, 78, 52, 'profile');
  }

  function drawNav() {
    ctx.save();
    rr(ctx, 0, 792, 390, 52, 22);
    ctx.fillStyle = 'rgba(3,2,1,.98)'; ctx.fill();
    ctx.strokeStyle = 'rgba(210,148,53,.45)'; ctx.lineWidth = 1.2; ctx.stroke();
    const names = [['⌂','Главная'], ['♠','Играть'], ['⌁','Магазин'], ['◇','Инвентарь'], ['●','Профиль']];
    names.forEach((n, i) => {
      const x = 39 + i * 78;
      const active = ['home','play','shop','inventory','profile'][i] === state.screen;
      if (active) {
        rr(ctx, x - 32, 797, 64, 42, 15);
        ctx.fillStyle = 'rgba(91,62,18,.78)'; ctx.fill();
        ctx.strokeStyle = 'rgba(223,165,68,.42)'; ctx.stroke();
      }
      ctx.fillStyle = active ? '#ffe39c' : 'rgba(255,231,176,.62)';
      ctx.font = '22px Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(n[0], x, 812);
      ctx.font = '700 10px Arial, sans-serif';
      ctx.fillText(n[1], x, 832);
    });
    ctx.restore();
  }

  function drawListScreen(title, subtitle, rows) {
    hitAreas.length = 0;
    drawBg();
    drawTopbar();
    fillTextCenter(title.toUpperCase(), 195, 150, 38, 'Georgia', '#f2cb7b', '700', 1.2);
    fillTextCenter(subtitle, 195, 190, 14, 'Arial', '#f0e0c8', '400');
    rows.forEach((row, i) => drawButton(28, 230 + i * 88, 334, 70, row[0], row[1], { id: `row-${i}`, radius: 16, icon: row[2] }));
    drawNav();
    addHit('nav-home', 0, 792, 78, 52, 'home');
    addHit('nav-play', 78, 792, 78, 52, 'play');
    addHit('nav-shop', 156, 792, 78, 52, 'shop');
    addHit('nav-inventory', 234, 792, 78, 52, 'inventory');
    addHit('nav-profile', 312, 792, 78, 52, 'profile');
  }

  function renderDesign() {
    if (state.screen === 'home') return drawHome();
    if (state.screen === 'play') return drawListScreen('Играть', 'Выберите режим игры', [
      ['Быстрый стол', 'Сесть за свободный стол', 'chip'],
      ['Приватный стол', 'Создать комнату или войти по коду', 'lock'],
      ['Свободные столы', 'Выбрать лимит и место', 'chip'],
      ['Турниры', 'Скоро', 'profile']
    ]);
    if (state.screen === 'shop') return drawListScreen('Магазин', 'Эксклюзивные предметы и привилегии', [
      ['VIP BLACK PASS', 'Привилегии для избранных', 'profile'],
      ['AURUM COINS', 'Пополнение баланса', 'chip'],
      ['Церемонии дилера', 'Премиальные события после руки', 'profile'],
      ['Карты и эффекты', 'Стиль стола и профиля', 'bag']
    ]);
    if (state.screen === 'inventory') return drawListScreen('Инвентарь', 'Ваши предметы и активный стиль', [
      ['Рубашка карт', 'Royal Gold', 'bag'],
      ['Рамка игрока', 'Obsidian VIP', 'profile'],
      ['Церемонии дилера', '0 available', 'profile'],
      ['Подарки', 'Коллекции и награды', 'bag']
    ]);
    return drawListScreen('Профиль', 'Статус и настройки игрока', [
      ['Aurum Prestige', 'Black Pass Member', 'profile'],
      ['Статистика', 'Рейтинг, победы, винрейт', 'chip'],
      ['Настройки', 'Звук, графика, аккаунт', 'profile'],
      ['Поддержка', 'Помощь и безопасность', 'lock']
    ]);
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#050403';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    withDesign(renderDesign);
  }

  function areaAt(point) {
    return hitAreas.find(a => point.x >= a.x && point.x <= a.x + a.w && point.y >= a.y && point.y <= a.y + a.h);
  }

  canvas.addEventListener('pointerdown', e => {
    const p = toDesign(e.clientX, e.clientY);
    const area = areaAt(p);
    state.pressed = area ? area.id : null;
    state.lastPointer = area || null;
    render();
  });

  canvas.addEventListener('pointerup', e => {
    const p = toDesign(e.clientX, e.clientY);
    const area = areaAt(p);
    const same = area && state.lastPointer && area.id === state.lastPointer.id;
    state.pressed = null;
    if (same && area.action) {
      state.screen = area.action;
      if (navigator.vibrate) navigator.vibrate(8);
    }
    state.lastPointer = null;
    render();
  });

  canvas.addEventListener('pointercancel', () => {
    state.pressed = null;
    state.lastPointer = null;
    render();
  });

  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', () => setTimeout(fit, 100));

  loadImage(BG_URL).then(img => {
    state.bg = img;
    state.bgReady = true;
    fit();
  }).catch(() => fit());

  fit();
})();
