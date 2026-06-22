const DEMO_CARDS = {
  preflop: [],
  flop: [
    { rank: 'A', suit: '♠', color: 'black' },
    { rank: 'K', suit: '♥', color: 'red' },
    { rank: '7', suit: '♣', color: 'black' },
  ],
  turn: [
    { rank: 'A', suit: '♠', color: 'black' },
    { rank: 'K', suit: '♥', color: 'red' },
    { rank: '7', suit: '♣', color: 'black' },
    { rank: '10', suit: '♦', color: 'red' },
  ],
  river: [
    { rank: 'A', suit: '♠', color: 'black' },
    { rank: 'K', suit: '♥', color: 'red' },
    { rank: '7', suit: '♣', color: 'black' },
    { rank: '10', suit: '♦', color: 'red' },
    { rank: '2', suit: '♠', color: 'black' },
  ],
};

const STREET_ORDER = ['preflop', 'flop', 'turn', 'river'];

export function createInitialGameState() {
  return {
    mode: 'local-demo',
    street: 'flop',
    pot: 3750,
    currentBet: 500,
    lastAction: 'Waiting for action',
    seats: [
      { id: '1', name: 'Player 1', stack: 12450, bet: 500 },
      { id: '2', name: 'Player 2', stack: 9100, bet: 500 },
      { id: '3', name: 'Player 3', stack: 15700, bet: 0 },
      { id: '4', name: 'Player 4', stack: 8800, bet: 500 },
      { id: 'hero', name: 'You', stack: 12000, bet: 500 },
    ],
  };
}

export function getCommunityCards(state) {
  return DEMO_CARDS[state.street] ?? [];
}

export function nextDemoStreet(state) {
  const index = STREET_ORDER.indexOf(state.street);
  state.street = STREET_ORDER[(index + 1) % STREET_ORDER.length];
  state.lastAction = `Street changed to ${state.street}`;
}

export function applyDemoAction(state, action) {
  const hero = state.seats.find((seat) => seat.id === 'hero');
  if (!hero) return;

  if (action === 'fold') state.lastAction = 'Hero folded';
  if (action === 'check') state.lastAction = 'Hero checked';

  if (action === 'call') {
    const amount = state.currentBet;
    hero.stack = Math.max(0, hero.stack - amount);
    hero.bet += amount;
    state.pot += amount;
    state.lastAction = `Hero called ${amount}`;
  }

  if (action === 'raise') {
    const amount = state.currentBet * 3;
    hero.stack = Math.max(0, hero.stack - amount);
    hero.bet += amount;
    state.pot += amount;
    state.currentBet = amount;
    state.lastAction = `Hero raised to ${amount}`;
  }
}
