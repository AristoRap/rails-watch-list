class LikesController < ApplicationController
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

  def destroy
  end

  private

  def like_params
    params.require(:like).permit(:movie_id)
  end
end
