import { getCommunityCards } from './game-state.js';

const formatMoney = (value) => new Intl.NumberFormat('ru-RU').format(value);

export function renderGameState(state) {
  renderCommunityCards(state);
  renderSeats(state);
  renderHud(state);
}

function renderHud(state) {
  document.querySelector('#potValue').textContent = formatMoney(state.pot);
  document.querySelector('#streetValue').textContent = state.street.toUpperCase();
  document.querySelector('#connectionStatus').textContent = state.lastAction || 'LOCAL DEMO';
  document.querySelector('[data-action="call"]').textContent = `Call ${formatMoney(state.currentBet)}`;
}

function renderCommunityCards(state) {
  const root = document.querySelector('#communitySlots');
  root.replaceChildren();

  const cards = getCommunityCards(state);
  for (let i = 0; i < 5; i += 1) {
    const card = cards[i];
    const element = document.createElement('div');

    if (card) {
      element.className = `card ${card.color === 'red' ? 'red' : ''}`;
      element.textContent = `${card.rank}${card.suit}`;
    } else {
      element.className = 'card-slot';
    }

    root.appendChild(element);
  }
}

function renderSeats(state) {
  for (const seat of state.seats) {
    const element = document.querySelector(`[data-seat="${seat.id}"]`);
    if (!element) continue;

    element.dataset.name = seat.name;
    element.dataset.stack = `STACK ${formatMoney(seat.stack)}`;
    element.querySelector('.bet')?.remove();

    if (seat.bet > 0) {
      const bet = document.createElement('div');
      bet.className = 'bet';
      bet.textContent = `BET ${formatMoney(seat.bet)}`;
      element.appendChild(bet);
    }
  }
}
