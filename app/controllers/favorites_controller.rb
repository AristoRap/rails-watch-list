class FavoritesController < ApplicationController
  def index
    @movies = my_favorite_movies
    @favorite = Favorite.new
    @favorites = current_user.favorites
    respond_to do |format|
      format.html
      format.json { render 'create' }
    end
  end

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user = current_user
    @favorites = current_user.favorites
    respond_to do |format|
      if @favorite.save
        format.json
      else
        redirect_to root_path, alert: 'Something went wrong when adding to favorites'
      end
    end
  end

  def update
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @movie = @favorite.movie_id
    @favorites = current_user.favorites
    @favorite.destroy
    respond_to do |format|
      if @favorite.destroyed?
        format.json
      else
        redirect_to root_path, alert: 'Something went wrong when removing from favorites'
      end
    end
  end

  def delete_by_movie_id
    @favorite = current_user.favorites.find_by(movie_id: params[:movie_id])
    @favorite.destroy
    redirect_to favorites_path, notice: 'Removed from favorites'
  end

  private

  def my_favorite_movies
    favorites = current_user.favorites
    favorite_movies = []

    favorites.each do |favorite|
      favorite_movies << find_movie(favorite.movie_id)
    end
    favorite_movies
  end

  def find_movie(movie_id)
    url = "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{ENV["TMDB_KEY"]}"
    movie_serialized = URI.parse(url).read
    return JSON.parse(movie_serialized) if JSON.parse(movie_serialized)

    {}
  end

  def favorite_params
    params.require(:favorite).permit(:movie_id)
  end
end
