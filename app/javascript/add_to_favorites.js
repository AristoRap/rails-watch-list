import { csrfToken } from "@rails/ujs";

const addToFavorites = () => {
  const forms = document.querySelectorAll(".simple_form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const formBtn = e.currentTarget.querySelector("button");
      const form = e.currentTarget;
      e.preventDefault();
      if (form.classList.contains('new_favorite')) {
        alert('entered  if')
        fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
          body: new FormData(form),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.form) {
            setTimeout(() => {
              formBtn.innerText = "Added!";
            }, 500);

            setTimeout(() => {
              formBtn.innerText = "Remove from favorites";
            }, 1000);

            form.outerHTML = data.form;
          }
        });
      } else if (form.classList.contains('edit_favorite')) {
        alert('entered else if')
        fetch(form.action, {
          method: "DELETE",
          body: new FormData(form)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.form) {
              setTimeout(() => {
                formBtn.innerText = "Removed!";
              }, 500);

              setTimeout(() => {
                formBtn.innerText = "Add to favorites";
              }, 1000);

              form.outerHTML = data.form;
            }
          });
      }
    });
  });
};

export { addToFavorites };
