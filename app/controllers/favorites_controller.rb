class FavoritesController < ApplicationController
  def index
  end

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user = current_user
    respond_to do |format|
      @favorite.save
      format.json
    end
  end

  def update
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @movie = @favorite.movie_id
    respond_to do |format|
      @favorite.destroy
      format.json
    end
  end


  private

  def favorite_params
    params.require(:favorite).permit(:movie_id)
  end
end
