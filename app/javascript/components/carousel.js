// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const loadSwiperCarousel = () => {
  new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        const activeSlide = document.querySelector(".swiper-slide-active");
        console.log(activeSlide);
        activeSlide.classList.add("active-carousel");
      },
    },
    on: {
      slideChangeTransitionStart: function (e) {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => {
          slide.classList.remove("active-carousel");
        });
        const activeSlide = e.el.querySelector(".swiper-slide-active");
        activeSlide.classList.add("active-carousel");
      },
    },
  });
}

export { loadSwiperCarousel };
