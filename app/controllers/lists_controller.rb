class ListsController < ApplicationController
  def index
    @lists = List.all
    @list = List.new
  end

  def show
  end

  def new
  end

  def create
  end
end
