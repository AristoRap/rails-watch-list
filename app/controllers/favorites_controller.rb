class FavoritesController < ApplicationController
  def index
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


  private

  def favorite_params
    params.require(:favorite).permit(:movie_id)
  end
end
