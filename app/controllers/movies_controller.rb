class MoviesController < ApplicationController
  def popular
    @movies = fetch_movies
    @favorite = Favorite.new
    @favorites = current_user.favorites
    respond_to do |format|
      format.html
      format.json { render json: { movies: @movies, favorites: @favorites } }
    end
  end

  private

  def fetch_movies
    categories = %w[latest now_playing popular top_rated upcoming]
    movies_hash = {}

    categories.each do |category|
      url = "https://api.themoviedb.org/3/movie/#{category}?api_key=#{ENV["TMDB_KEY"]}"
      movies_serialized = URI.parse(url).read
      if JSON.parse(movies_serialized)['results']
        movies_hash[category.to_sym] = JSON.parse(movies_serialized)['results']
      end
    end
    movies_hash
  end
end
