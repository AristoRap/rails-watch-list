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
    "info",
    'link',
    'youtube'
  ];

  add(e) {
    const movieId = e.currentTarget.dataset.id;
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`;
    this.infoTarget.innerHTML = "";
    const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_KEY}`;

    fetch(videoUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.youtubeTarget.src = `https://www.youtube.com/embed/${data.results[0].key}?controls=0&showinfo=0`;
        }
      })





    fetch(movieUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((movie) => {
        //   // Update backdrop
        this.backdropTarget.src = `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`;

        // this.linkTarget.href = movieId;
        this.linkTarget.innerText = movie.title;
        this.overviewTarget.innerText = movie.overview;
        this.imdbAverageTarget.innerText = `${movie.vote_average}`;
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
            this.favoriteTarget.outerHTML = data.form;
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
