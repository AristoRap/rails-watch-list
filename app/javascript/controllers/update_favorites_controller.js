import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [ "form", 'movieId', 'delete', 'btnForm'];

  favorite(e) {
    console.log("Entered my AJAX method")
    const movieId = this.movieIdTarget.value
    const url = "/movies/popular";

    fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then((response) => response.json())
      .then(data => {
        const favorite = data.favorites.find((favorite) => favorite.movie_id == movieId);

        if (favorite) {
          this.formTarget.action = `/favorites/${favorite.id}`
          this.movieIdTarget.id = favorite.id

          this.btnFormTarget.textContent = 'Remove from favorites'
          this.deleteTarget.name = '_method'
          this.deleteTarget.value = 'delete'

        } else {
          this.formTarget.action = `/favorites`;
          this.btnFormTarget.textContent = 'Add to favorites'
          this.movieIdTarget.value = movieId;
          this.deleteTarget.name = ''
          this.deleteTarget.value = ''
        }
      });
    }
  }
