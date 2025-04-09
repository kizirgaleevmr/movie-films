const SPINNER = document?.querySelector(".spinner");

/**
 * Компонент спиннер.
 * @param {boolean} isVisible - Показывать/скрывать компонент.
 */
export const spinner = isVisible => SPINNER?.classList?.toggle("show", isVisible);
