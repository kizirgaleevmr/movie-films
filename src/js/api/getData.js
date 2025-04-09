import FetchWrapper from "./fetchWrapper.js";
import { ENV } from "../constants.js";

/**
 * Выполняет запрос к API.
 *
 * @param {string} endpoint - Конечная точка API, к которой нужно выполнить запрос.
 * @returns {Promise<Object>} Возвращает промис с результатами запроса в формате JSON.
 */
export const getData = async (endpoint) => {
  const fetchWrapper = new FetchWrapper(ENV?.api?.apiUrl);

  const separator = endpoint.includes("?") ? "&" : "?";

  const fullEndpoint = `${endpoint}${separator}api_key=${ENV?.api?.apiKey}&language=en-US`;

  return await fetchWrapper?.get(fullEndpoint);
};
