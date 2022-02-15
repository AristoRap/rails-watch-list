json.alert json.partial!('shared/flashes.html.erb', notice: 'Removed from favorites!')
json.form json.partial!('favorites/form.html.erb', movie: @movie,
                                                   favorite: Favorite.new,
                                                   favorited: false)
json.favorites @favorites
