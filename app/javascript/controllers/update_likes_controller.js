import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
  static targets = ["likeForm"];

  like(e) {
    e.preventDefault();
    console.log('Hi from stimulus')

    // fetch(this.likeFormTarget.action, {
    //   method: "POST",
    //   headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
    //   body: new FormData(this.formTarget),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.likeFormTarget.outerHTML = data.form;
    //   });
  }
}
