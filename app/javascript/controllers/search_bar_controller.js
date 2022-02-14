import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["searchBar", "searchBtn"];

  preview(e) {
    console.log('Hey from stimulus!')
  }
}
