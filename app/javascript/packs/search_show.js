const showSearchBar = () => {

  const searchIcon = document.querySelector(".search-box-icon");
  const searchBox = document.querySelector(".search-box");

  searchIcon.addEventListener("click", () => {
    searchBox.classList.toggle("active")
  });
}

export { showSearchBar }
