json.alert json.partial!('shared/flashes.html.erb', notice: 'Removed from favorites!')
json.form json.partial!('favorites/form.html.erb', movie: @favorite.movie_id.to_i,
                                                   favorite: Favorite.new,
                                                   favorited: false)
json.favorites @favorites
