export function setupRoomVideo({ videoElement, fallbackElement }) {
  if (!videoElement) return;

  const showFallback = () => {
    videoElement.classList.add('is-hidden');
    fallbackElement?.classList.add('is-visible');
  };

  videoElement.addEventListener('error', showFallback);

  videoElement.addEventListener('canplay', async () => {
    try {
      await videoElement.play();
    } catch {
      // Muted + playsinline should allow autoplay in most mobile browsers.
    }
  });

  if (!videoElement.currentSrc) {
    showFallback();
  }
}
