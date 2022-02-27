import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["favoriteSearch"];

  search(e) {
    console.log("Hey from stimulus favoriteSearch!");
  }
}
