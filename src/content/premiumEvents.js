export const PREMIUM_EVENT_TYPE = 'premium_event';
export const DEALER_REACTION_TYPE = 'dealer_reaction';
export const EVENT_TIMING_AFTER_HAND = 'after_hand';
export const EVENT_SEATS = Object.freeze([0, 1, 2, 3, 4]);

export function isPremiumEvent(item) {
  return Boolean(item && item.type === PREMIUM_EVENT_TYPE);
}

export function isDealerReaction(item) {
  return Boolean(isPremiumEvent(item) && item.eventKind === DEALER_REACTION_TYPE);
}

export function requiredDealerReactionAssets() {
  return ['preview', 'poster', 'seat_0', 'seat_1', 'seat_2', 'seat_3', 'seat_4'];
}
