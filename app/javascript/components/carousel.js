// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const loadSwiperCarousel = () => {
  new Swiper(".mySwiper", {
    slidesPerView: 10,
    spaceBetween: 5,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

export { loadSwiperCarousel };
