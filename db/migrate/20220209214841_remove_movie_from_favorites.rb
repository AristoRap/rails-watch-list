class RemoveMovieFromFavorites < ActiveRecord::Migration[6.1]
  def change
    remove_reference :favorites, :movie, null: false, foreign_key: true
  end
end
