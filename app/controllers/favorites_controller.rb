class FavoritesController < ApplicationController
  def index
  end

  def create
    @favorite = Favorite.new
    @favorite.movie_id = params[:movie_id]
    @favorite.user = current_user
    if @favorite.save
      flash[:notice] = 'Added to favorites!'
    else
      flash[:alert] = 'Hmm, something went wrong!'
    end
  end

  def update
  end

  def destroy
  end
end
