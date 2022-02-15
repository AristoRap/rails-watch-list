import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "title",
    "overview",
    "imdbAverage",
    "favorite",
    "movieId",
    "backdrop",
    "delete",
    "btnForm",
    "category",
    "modal",
    "info"
  ];

  add(e) {
    const movieId = e.currentTarget.dataset.id;
    console.log(movieId);
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`;
    this.infoTarget.innerHTML = "";

    fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
    .then((response) => response.json())
    .then((movie) => {
      //   // Update backdrop
      this.backdropTarget.src = `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`;
      //   // Update title
      this.titleTarget.innerText = movie.original_title;
      this.overviewTarget.innerText = movie.overview;
      this.imdbAverageTarget.innerText = `${movie.vote_average} / 10`;
      this.movieIdTarget.value = movieId;

      fetch("/favorites", {
        method: "GET",
        headers: { Accept: "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        let favorite = data.favorites.find(
          (favorite) => favorite.movie_id == this.movieIdTarget.value
          );
          // Update favorite form and attributes
          this.favoriteTarget.outerHTML = data.form
          console.log(this.favoriteTarget)
          if (favorite) {
            this.favoriteTarget.action = `/favorites/${favorite.id}`;
            this.btnFormTarget.textContent = "Remove from favorites";
            this.movieIdTarget.id = favorite.id;
            this.deleteTarget.outerHTML =
              '<input type="hidden" name="_method" value="delete" data-add-modal-target="delete"></input>';
          } else {
            this.favoriteTarget.action = `/favorites`;
            this.btnFormTarget.textContent = "Add to favorites";
            this.deleteTarget.outerHTML =
              '<input type="hidden" data-add-modal-target="delete"></input>';
            this.movieIdTarget.value = movieId;
            }
            //   //Trigger bootstrap modal to show via jQuery
            $("#movieModal").modal("show");
          });
      });
  }
}
