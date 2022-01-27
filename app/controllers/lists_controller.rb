class ListsController < ApplicationController
  def index
    @lists = List.order(:name)
  end

  def show
    @list = List.find(params[:id])
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to lists_path
    else
      render :new
    end
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    redirect_to root_path
  end

  private

  def list_params
    params.require(:list).permit(:name, :image_url, :photo)
  end
end
