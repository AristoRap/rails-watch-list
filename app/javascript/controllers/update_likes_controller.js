import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
  static targets = ["likeForm", "likeWrap"];

  like(e) {
    e.preventDefault();
    const likeForm = e.currentTarget

    fetch(likeForm.action, {
      method: "POST",
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
      body: new FormData(likeForm),
    })
      .then((response) => response.json())
      .then((data) => {
        this.likeWrapTarget.innerHTML = data.form;
      });
  }
}
