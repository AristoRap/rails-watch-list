import { csrfToken } from "@rails/ujs";

const addToFavorites = () => {
  const addFavorites = document.querySelectorAll(".new_favorite");
  addFavorites.forEach((favorite) => {
    favorite.addEventListener("submit", (e) => {
      const formBtn = e.currentTarget.querySelector('button')
      e.preventDefault();
      fetch(e.currentTarget.action, {
        method: "POST",
        headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
        body: new FormData(e.currentTarget),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setTimeout(() => {
            formBtn.innerText = 'Added!';
          }, 500)

          setTimeout(() => {
            formBtn.innerText = 'Remove from favorites';
          }, 1000)
        }
      });
    });
  });
};

const removeFromFavorites = () => {
  const removeFavorites = document.querySelectorAll(".edit_favorite");
  removeFavorites.forEach((favorite) => {
    favorite.addEventListener("submit", (e) => {
      const formBtn = e.currentTarget.querySelector("button");
      e.preventDefault();
      fetch(e.currentTarget.action, {
        method: "DELETE",
        headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() }
      }).then((response) => {
        if (response.ok) {
          setTimeout(() => {
            formBtn.innerText = "Removed!";
          }, 500);

          setTimeout(() => {
            formBtn.innerText = "Add to favorites";
          }, 1000);
        }
      })
    });
  });
};



export { addToFavorites, removeFromFavorites };
