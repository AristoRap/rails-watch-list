class LikesController < ApplicationController
  before_action :set_likes, only: %i[index create update destroy]
  before_action :set_like, only: %i[update destroy]

  def index
    @like = Like.new
    respond_to do |format|
      format.html
      format.json { render 'create' }
    end
  end

  def create
    @like = Like.new(like_params)
    @like.user = current_user
    respond_to do |format|
      if @like.save
        format.json
      else
        redirect_to root_path, alert: 'Something went wrong when adding to likes'
      end
    end
  end

  def update
    respond_to do |format|
      if @like.update(like_params)
        format.json { render 'create' }
      else
        redirect_to root_path, alert: 'Something went wrong when updating likes'
      end
    end
  end

  def destroy
    @movie = @like.movie_id
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

  def set_likes
    @likes = current_user.likes
  end

  def set_like
    @like = Like.find(params[:id])
  end
end
