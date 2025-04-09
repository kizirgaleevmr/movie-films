// Получаем доступ к контейнеру вкладок
const TABS_PARENT = document?.querySelector(".tabs");
// Получаем доступ ко всем кнопкам вкладок и к содержимому вкладок
const TABS_BTN = document?.querySelectorAll(".tabs__btn");
const TABS_CONTENT = document?.querySelectorAll(".tabs__content");

// Компонент для переключения вкладок.
export const tabs = () => {
  if (TABS_PARENT) {
    // Добавляем обработчик клика на контейнер вкладок
    TABS_PARENT.addEventListener("click", (e) => {
      // Проверяем, что клик произошел на кнопке вкладки
      if (e?.target?.classList?.contains("tabs__btn")) {
        // Получаем значение атрибута data-tabs-path выбранной кнопки вкладки
        const tabsPath = e?.target?.dataset?.tabsPath;
        // Удаляем класс "tabs__btn--active" у всех кнопок вкладок
        TABS_BTN?.forEach((el) => el?.classList?.remove("tabs__btn--active"));
        // Добавляем класс "tabs__btn--active" к выбранной кнопке вкладки
        e?.target?.classList?.add("tabs__btn--active");
        // Вызываем функцию для обработки вкладок с переданным значением data-tabs-path
        tabsHandler(tabsPath);
      }
    });
  }

  // Функция для обработки вкладок
  const tabsHandler = (path) => {
    // Скрываем все содержимое вкладок
    TABS_CONTENT?.forEach((el) => el?.classList?.remove("tabs__content--active"));

    // Показываем содержимое вкладки с переданным значением data-tabs-target
    document
      .querySelector(`[data-tabs-target="${path}"]`)
      .classList?.add("tabs__content--active");
  };
};
