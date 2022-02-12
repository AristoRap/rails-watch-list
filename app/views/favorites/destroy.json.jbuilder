if Favorite.exists?(@favorite.id)
  json.form json.partial!('favorites/form.html.erb', movie: @favorite.movie_id.to_i, favorite: @favorite)
else
  json.form json.partial!('favorites/form.html.erb', movie: @movie, favorite: Favorite.new)
end
