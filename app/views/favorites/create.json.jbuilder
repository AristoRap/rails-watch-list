json.alert json.partial!('shared/flashes.html.erb', notice: 'Added to favorites!')
json.form json.partial!('favorites/form.html.erb', movie: @favorite.movie_id.to_i,
                                                   favorite: @favorite,
                                                   favorited: true)
json.favorites @favorites
