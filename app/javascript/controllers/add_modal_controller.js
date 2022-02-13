import { Controller } from "stimulus";
import { fetchMovies } from "../fetch_movies";

export default class extends Controller {
  static targets = [ "movie", "modal", 'movieModal',
                     'title', 'overview', 'imdbAverage',
                     'favorite', 'movieId', 'backdrop',
                     'delete', 'btnForm' ];

  add(e) {
    const url = "/movies/popular";
    const movieId = e.currentTarget.dataset.id

    fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then((response) => response.json())
    .then(data => {
      const clickedMovie = data.movies.find((movie) => movie.id == movieId);
      const favorite = data.favorites.find((favorite) => favorite.movie_id == movieId);

      // Update backdrop
      this.backdropTarget.src = `https://www.themoviedb.org/t/p/original${clickedMovie.backdrop_path}`;
      // Update title
      this.titleTarget.innerText = clickedMovie.original_title;
      // Update overview
      this.overviewTarget.innerText = clickedMovie.overview;
      // Update imdbAverage
      this.imdbAverageTarget.innerText = `${clickedMovie.vote_average}/10`;

      if (favorite) {
        this.favoriteTarget.action = `/favorites/${favorite.id}`
        this.btnFormTarget.textContent = 'Remove from favorites'
        this.movieIdTarget.id = favorite.id
        this.deleteTarget.name = '_method'
        this.deleteTarget.value = 'delete'

      } else {
        this.favoriteTarget.action = `/favorites`
        this.btnFormTarget.textContent = 'Add to favorites'
        this.movieIdTarget.value = clickedMovie.id
        this.deleteTarget.name = ''
        this.deleteTarget.value = ''
      }
    });
  }
}
