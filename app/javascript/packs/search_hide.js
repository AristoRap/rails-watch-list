const hideSearchBar = () => {
  const searchForm = document.querySelector(".search-form");
  const searchBox = document.querySelector(".search-box");

  document.addEventListener("click", (e) => {
    if (e.target.parentElement != searchForm) {
      searchBox.classList.remove("active");
      console.log(searchForm);
    }
  });
};

export { hideSearchBar };
