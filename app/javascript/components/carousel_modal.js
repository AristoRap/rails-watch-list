const updateActiveSlideOnClick = () => {
  const slides = document.querySelectorAll(".swiper-slide");
  // Remove active class from all slides.
  const removeActiveClass = () => {
    slides.forEach((slide) => {
      slide.classList.remove("active-carousel");
    });
  }

  // Listen to any clicks on a movie
  slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
      removeActiveClass();
      e.currentTarget.classList.add("active-carousel")
    })
  });
}

export { updateActiveSlideOnClick }
