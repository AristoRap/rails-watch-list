class AddMovieIdToFavorites < ActiveRecord::Migration[6.1]
  def change
    add_column :favorites, :movie_id, :string
  end
end
