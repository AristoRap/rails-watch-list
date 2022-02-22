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
    'youtube',
    'likeWrap',
    'likeBtn',
    'dislikeBtn',
    'likeForm',
    'dislikeForm',
    'likeDelete',
    'likePatch',
    'dislikeDelete',
    'dislikePatch'
  ];

  add(e) {
    const movieId = e.currentTarget.dataset.id;
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`;
    this.infoTarget.innerHTML = "";
    const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_KEY}`;
    this.youtubeTarget.src = ``;

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
        this.movieIdTargets.forEach(target => {
          target.value = movieId;
        })

        fetch("/favorites", {
          method: "GET",
          headers: { Accept: "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            let favorite = data.favorites.find(
              (favorite) => favorite.movie_id == this.movieIdTargets[0].value
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

          fetch("/likes", {
            method: "GET",
            headers: { Accept: "application/json" },
          })
          .then(response => response.json())
          .then(data => {
            let like = data.likes.find(
              (like) => like.movie_id == this.movieIdTargets[0].value
            );

            this.likeWrapTarget.innerHTML = data.form;
            console.log(this.movieIdTargets)
            this.movieIdTargets.forEach((target) => {
              target.value = movieId
            })
            if (like) {
              this.likeFormTarget.action = `/likes/${like.id}`
              this.dislikeFormTarget.action = `/likes/${like.id}`

              if (like.liked) {
                this.likeDeleteTarget.outerHTML =
                  '<input type="hidden" name="_method" value="delete" data-add-modal-target="delete"></input>';
                this.likeBtnTarget.outerHTML =
                  '<i class="fas fa-thumbs-up thumb thumb-active" data-add-modal-target="likeBtn"></i>';
                this.dislikePatchTarget.outerHTML =
                  '<input type="hidden" name="_method" value="patch" data-add-modal-target="dislikePatch"></input>';
              } else {
                this.dislikeDeleteTarget.outerHTML =
                  '<input type="hidden" name="_method" value="delete" data-add-modal-target="delete"></input>';
                this.dislikeBtnTarget.outerHTML =
                  '<i class="fas fa-thumbs-down thumb thumb-down thumb-active" data-add-modal-target="dislikeBtn"></i>';
                this.likePatchTarget.outerHTML =
                  '<input type="hidden" name="_method" value="patch" data-add-modal-target="dislikePatch"></input>';
              }
            } else {
              this.likeFormTarget.action = `/likes`;
              this.dislikeFormTarget.action = `/likes`;
            }

          })
          // render create json in index and return form partial
          // update likeWrapTarget with json response data.form
      });
  }
}
