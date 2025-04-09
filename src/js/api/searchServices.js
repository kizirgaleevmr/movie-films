import { getData } from "./getData.js";
import { ENV } from "../constants.js";
import { pagination } from "../components/pagination.js";

/**
 * Выполняет запрос к API для поиска данных.
 * Использует глобальные параметры для определения типа поиска, термина поиска и номера страницы.
 *
 * @returns {Promise<Object>} Возвращает промис с результатами поиска в формате JSON.
 */
export const searchData = async () => {
  const endpoint = `search/${ENV?.search?.type}?query=${ENV?.search?.term}&page=${ENV?.search?.page}`;
  return getData(endpoint);
};

/**
 * Выполняет поиск по введенным параметрам и отображает результаты.
 * Извлекает параметры поиска из строки запроса URL, устанавливает глобальные параметры поиска и вызывает функцию поиска API.
 */
export const search = async () => {
  const queryString = window?.location?.search; // Получает строку запроса из URL

  const urlParams = new URLSearchParams(queryString); // Создает объект для работы с параметрами URL

  ENV.search.type = urlParams.get("type"); // Устанавливает тип поиска из параметра URL
  ENV.search.term = urlParams.get("search-term"); // Устанавливает термин поиска из параметра URL

  if (ENV.search.term !== "" && ENV.search.term !== null) {
    const { results, page, total_pages, total_results } = await searchData();

    if (!results.length) {
      console.error("No result");
      return;
    }

    // Устанавливаем полученные данные в глобальный объект
    ENV.search.page = page;
    ENV.search.totalPages = total_pages;
    ENV.search.totalResults = total_results;

    // Отображаем результаты поиска
    displaySearchResults(results);

    // Очищаем поле ввода
    document.querySelector("#search-term").value = "";
  }
};

/**
 * Отображает результаты поиска на странице.
 * @param {Array} results - Массив объектов с результатами поиска.
 */
export const displaySearchResults = (results) => {
  // Очищаем содержимое элементов для вставки новых результатов
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("data-id", result?.id);
    div.setAttribute("data-type", ENV?.search?.type);

    div.innerHTML = `
      <a href="${ENV?.search?.type}-details.html?id=${result?.id}">
        ${
          result?.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${result?.poster_path}" alt="${result?.title}"/>`
            : `<div class="no-img"></div>`
        }
      <h3 class="list-item-rating">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.15336 2.33977L10.3267 4.68643C10.4867 5.0131 10.9134 5.32643 11.2734 5.38643L13.4 5.73977C14.76 5.96643 15.08 6.9531 14.1 7.92643L12.4467 9.57977C12.1667 9.85977 12.0134 10.3998 12.1 10.7864L12.5734 12.8331C12.9467 14.4531 12.0867 15.0798 10.6534 14.2331L8.66003 13.0531C8.30003 12.8398 7.7067 12.8398 7.34003 13.0531L5.3467 14.2331C3.92003 15.0798 3.05336 14.4464 3.4267 12.8331L3.90003 10.7864C3.9867 10.3998 3.83336 9.85977 3.55336 9.57977L1.90003 7.92643C0.926698 6.9531 1.24003 5.96643 2.60003 5.73977L4.7267 5.38643C5.08003 5.32643 5.5067 5.0131 5.6667 4.68643L6.84003 2.33977C7.48003 1.06643 8.52003 1.06643 9.15336 2.33977Z" stroke="#FFAD49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${result?.vote_average?.toFixed(1)} / 10
      </h3>
      <div class="list-item-descr">
        <h3 class="list-item-title">${result?.title || result?.name}</h3>
      </div>
      </a>
    `;

    const getCurrentResultsCount = () => {
      if (ENV?.search?.totalPages <= 1) return results?.length;
      return (
        ENV?.search?.maxCountResults * (ENV?.search?.page - 1) + results?.length
      );
    };

    document.querySelector("#search-results-heading").innerHTML = `
      <h2>${getCurrentResultsCount()} of ${
      ENV?.search?.totalResults
    } Results for "${ENV?.search?.term}"</h2>
    `;

    document.querySelector("#search-results").appendChild(div);
  });

  // Отображаем пагинацию
  pagination();
};
