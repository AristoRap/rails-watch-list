class MoviesController < ApplicationController

  def index
    @movies = if params[:query].present?
                search_movies(params[:query])
              else
                {}
              end
    @favorite = Favorite.new
    respond_to do |format|
      format.html
      format.json { render json: { movies: @movies, favorites: @favorites } }
    end
  end

  def discover
    @movies = fetch_movies(categories)
    @favorite = Favorite.new
    @favorites = current_user.favorites
    respond_to do |format|
      format.html
      format.json { render json: { movies: @movies, favorites: @favorites } }
    end
  end

  private

  def categories
    %w[latest now_playing popular top_rated upcoming]
  end

  def fetch_movies(categories, page = 1)
    movies_hash = {}

    categories.each do |category|
      url = "https://api.themoviedb.org/3/movie/#{category}?api_key=#{ENV["TMDB_KEY"]}&page=#{page}"
      movies_serialized = URI.parse(url).read
      if JSON.parse(movies_serialized)['results']
        movies_hash[category.to_sym] = JSON.parse(movies_serialized)['results']
      end
    end
    movies_hash
  end

  def search_movies(query, page = 1)
    url = "https://api.themoviedb.org/3/search/multi?api_key=#{ENV["TMDB_KEY"]}&query=#{query}&page=#{page}"
    movies_serialized = URI.parse(url).read
    return JSON.parse(movies_serialized)['results'] if JSON.parse(movies_serialized)['results']
  end
end
