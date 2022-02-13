import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
  static targets = [ "form", 'movieId', 'delete', 'btnForm', 'info'];

  favorite(e) {
    e.preventDefault();

    fetch(this.formTarget.action, {
      method: "POST",
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(this.formTarget),
    })
      .then((response) => response.json())
      .then((data) => {

        this.infoTarget.innerHTML = ''
        this.infoTarget.innerHTML = data.alert
        this.formTarget.outerHTML = data.form
      });
    }
  }
