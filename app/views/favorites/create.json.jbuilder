if @favorite.persisted?
  json.form json.partial!('favorites/form.html.erb', movie: @favorite.movie_id.to_i, favorite: @favorite)
else
  json.form json.partial!('favorites/form.html.erb', movie: @favorite.movie_id.to_i, favorite: Favorite.new)
end
