class FavoritesController < ApplicationController
  def index
  end

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user = current_user
    respond_to do |format|
      if @favorite.save
        format.json { render json: @favorite, status: :created, location: @favorite }
      else
        format.json { render json: @favorite.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    format.json { render json: @favorite.errors, status: :unprocessable_entity } unless @favorite.destroy
  end

  private

  def favorite_params
    params.require(:favorite).permit(:movie_id)
  end
end
