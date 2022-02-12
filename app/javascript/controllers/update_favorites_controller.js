import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [ "form" ];

  favorite() {
    console.log("Entered my AJAX method")
  }
}
