// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap";
import { loadSwiperCarousel } from "../components/carousel";
import { initSelect2 } from "../plugins/init_select2";
import { updateSearches } from "../plugins/init_select2";
import "controllers"
import { showSearchBar } from './search_show'
import { hideSearchBar } from './search_hide'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

document.addEventListener("turbolinks:load", () => {
  // Call your JS functions here
  // [...]
  loadSwiperCarousel();
  showSearchBar();
  hideSearchBar();
  initSelect2();
  updateSearches();
});
