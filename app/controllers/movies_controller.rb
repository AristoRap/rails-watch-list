class MoviesController < ApplicationController
  def popular
    @movies = popular_movies
    @favorite = Favorite.new
    @favorites = current_user.favorites
    respond_to do |format|
      format.html
      format.json { render json: { movies: @movies, favorites: @favorites } }
    end
  end

  private

  def popular_movies
    url = "https://api.themoviedb.org/3/movie/popular?api_key=#{ENV["TMDB_KEY"]}"
    movies_serialized = URI.parse(url).read
    JSON.parse(movies_serialized)['results']
  end
end
