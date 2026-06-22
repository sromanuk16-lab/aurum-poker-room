import { createInitialGameState, nextDemoStreet, applyDemoAction } from './game-state.js';
import { renderGameState } from './ui-renderer.js';
import { setupRoomVideo } from './video-controller.js';

const state = createInitialGameState();

setupRoomVideo({
  videoElement: document.querySelector('#roomVideo'),
  fallbackElement: document.querySelector('#roomFallback'),
});

renderGameState(state);

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    applyDemoAction(state, button.dataset.action);
    renderGameState(state);
  });
});

document.querySelector('#streetValue')?.addEventListener('click', () => {
  nextDemoStreet(state);
  renderGameState(state);
});
