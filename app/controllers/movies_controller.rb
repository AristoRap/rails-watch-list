class MoviesController < ApplicationController
  def index
    @movies = if params[:query].present?
                search_movies(params[:query])
              else
                {}
              end
    @favorite = Favorite.new
    @like = Like.new
    respond_to do |format|
      format.html
      format.json { render json: { movies: @movies, favorites: @favorites } }
    end
  end

  def discover
    @movies = fetch_movies(categories)
    @favorite = Favorite.new
    @like = Like.new
    @favorites = current_user.favorites
    @likes = current_user.likes
    respond_to do |format|
      format.html
      format.json { render json: { movies: @movies, favorites: @favorites, likes: @likes } }
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

  def find_movie(movie_id)
    url = "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{ENV["TMDB_KEY"]}"
    movie_serialized = URI.parse(url).read
    return JSON.parse(movie_serialized) if JSON.parse(movie_serialized)

    {}
  end

  def find_video(movie_id)
    url = "https://api.themoviedb.org/3/movie/#{movie_id}/videos?api_key=#{ENV["TMDB_KEY"]}"
    movie_serialized = URI.parse(url).read
    return JSON.parse(movie_serialized) if JSON.parse(movie_serialized)

    {}
  end
end
