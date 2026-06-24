export const PREMIUM_EVENT_CONFIG = Object.freeze({
  type: 'premium_event',
  eventKind: 'dealer_reaction',
  timing: 'after_hand',
  seats: [0, 1, 2, 3, 4],
  maxPerHand: 1,
  minDurationMs: 1500,
  maxDurationMs: 8000,
  defaultDurationMs: 4500,
  requiredAssets: ['preview', 'poster', 'seat_0', 'seat_1', 'seat_2', 'seat_3', 'seat_4']
});
