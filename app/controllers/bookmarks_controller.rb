class BookmarksController < ApplicationController

  before_action :find_list

  def new
    @bookmark = Bookmark.new
  end

  def create
    @bookmark = Bookmark.new(bookmark_params)
    @bookmark.list = @list
    if @bookmark.save
      redirect_to list_path(@list)
    else
      render :new
    end
  end

  def destroy
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:comment, :movie_id)
  end

  def find_list
    @list = List.find(params[:list_id])
  end
end
