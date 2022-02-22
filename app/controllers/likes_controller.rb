class LikesController < ApplicationController
  def index
    @like = Like.new
    @likes = current_user.likes
    respond_to do |format|
      format.html
      format.json { render 'create' }
    end
  end

  def create
    @like = Like.new(like_params)
    @like.user = current_user
    @likes = current_user.likes
    respond_to do |format|
      if @like.save
        format.json
      else
        redirect_to root_path, alert: 'Something went wrong when adding to likes'
      end
    end
  end

  def update
    @like = Like.find(params[:id])
    respond_to do |format|
      if @like.update(like_params)
        format.json { render 'create' }
      else
        redirect_to root_path, alert: 'Something went wrong when updating likes'
      end
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @movie = @like.movie_id
    @likes = current_user.likes
    @like.destroy
    respond_to do |format|
      if @like.destroyed?
        format.json
      else
        redirect_to root_path, alert: 'Something went wrong when removing from likes'
      end
    end
  end

  private

  def like_params
    params.require(:like).permit(:movie_id, :liked)
  end
end
