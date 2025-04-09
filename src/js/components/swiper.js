import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

export const initSwiper = () => {
  new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    modules: [Scrollbar],
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });
};
