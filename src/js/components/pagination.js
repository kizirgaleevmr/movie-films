import { ENV } from "../constants.js";
import { searchData } from "../api/searchServices.js";
import { displaySearchResults } from "../api/searchServices.js";
import { smoothscroll } from "./smothScroll.js";

// Пагинация для результатов поиска.
export const pagination = () => {
    const div = document.createElement("div");
    div.classList.add("pagination");

    div.innerHTML = `
    <div>
      <button class="btn btn-outline" id="prev">Prev</button>
      <button class="btn btn-outline" id="next">Next</button>
    </div>
    <div class="page-counter">Page ${ENV?.search?.page} of ${ENV?.search?.totalPages}</div>
  `;

    document.querySelector("#pagination").appendChild(div);

    // Отключаем кнопки навигации в зависимости от текущей страницы
    document.querySelector("#prev").disabled = ENV?.search?.page === 1;
    document.querySelector("#next").disabled =
        ENV?.search?.page === ENV?.search?.totalPages;

    // Общая функция для обработки навигации
    const handlePageNavigation = async (direction) => {
        ENV.search.page += direction;
        const { results } = await searchData();
        displaySearchResults(results);
        smoothscroll();
    };

    // Добавляем обработчики событий
    document
        .querySelector("#next")
        .addEventListener("click", () => handlePageNavigation(1));
    document
        .querySelector("#prev")
        .addEventListener("click", () => handlePageNavigation(-1));
};
