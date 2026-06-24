export const PREMIUM_EVENT_TYPE = 'premium_event';
export function isPremiumEvent(item) {
  return Boolean(item && item.type === PREMIUM_EVENT_TYPE);
}
