class RemoveColumnsFromMovies < ActiveRecord::Migration[6.1]
  def change
    remove_column :movies, :overview, :text
    remove_column :movies, :poster_url, :string
    remove_column :movies, :rating, :float
  end
end
