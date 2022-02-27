const updateResults = (e) => {
  const favorites = document.querySelectorAll(".grid-favorites .fav")

  favorites.forEach((f) => {
    if (e.currentTarget.value == '' || f.id == e.currentTarget.value) {
      f.classList.remove("d-hidden");
    } else {
      f.classList.add("d-hidden");
    }
  })
}

export { updateResults }
