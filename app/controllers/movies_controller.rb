class MoviesController < ApplicationController
  def popular
    @movies = popular_movies
  end

  private

  def popular_movies
    url = "https://api.themoviedb.org/3/movie/popular?api_key=#{ENV["TMDB_KEY"]}"
    movies_serialized = URI.parse(url).read
    JSON.parse(movies_serialized)['results']
  end
end
