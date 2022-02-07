class AddIdToMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :tmdb_id, :bigint
  end
end
