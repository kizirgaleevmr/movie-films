/**
 * Глобальные данные приложения.
 * @property {string} currentPage - Текущий путь страницы.
 * @property {Object} api - Настройки API.
 * @property {string} api.apiKey - Ключ API для доступа к The Movie Database.
 * @property {string} api.apiUrl - URL базового API The Movie Database.
 * @property {Object} search - Параметры поиска.
 * @property {string} search.term - Поисковый запрос.
 * @property {string} search.type - Тип поиска (movie, tv и т.д.).
 * @property {number} search.page - Текущая страница результатов поиска.
 * @property {number} search.totalPages - Общее количество страниц результатов поиска.
 * @property {number} search.totalResults - Общее количество результатов поиска.
 * @property {number} search.maxCountResults - Максимальное количество результатов на странице.
 */
export const ENV = {
  currentPage: window.location.pathname,
  api: {
    // Ваш API ключ здесь
    apiKey: "9a665f1cf0b45e951f9cf773f746280e",
    apiUrl: "https://api.themoviedb.org/3/",
  },
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
    maxCountResults: 20,
  },
};
