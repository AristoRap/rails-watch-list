import $ from "jquery";
import "select2";
import { updateResults } from "../packs/update_favorites_results";

const initSelect2 = () => {
  $(document).ready(function () {
    $(".js-example-basic-single").select2({
      placeholder: "Search favorites",
      allowClear: true,
    });
  });
};

const updateSearches = () => {
  $(".js-example-basic-single").on("select2:select", function (e) {
    updateResults(e);
  });

  $(".js-example-basic-single").on("select2:clear", function (e) {
    updateResults(e);
  });


}

export { initSelect2, updateSearches };
