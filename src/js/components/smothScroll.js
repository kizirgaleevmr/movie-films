const CURRENT_SCROLL = document?.documentElement?.scrollTop || document?.body?.scrollTop;

// Плавная прокрутка в начало страницы.
export const smoothscroll = () => {
  if (CURRENT_SCROLL > 0) {
    window.requestAnimationFrame(smoothscroll);
    // Прокручиваем страницу к началу
    window.scrollTo(0, CURRENT_SCROLL - CURRENT_SCROLL / 5);
  }
};