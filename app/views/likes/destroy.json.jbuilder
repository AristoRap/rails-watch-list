json.form json.partial!('likes/form.html.erb', movie: @like.movie_id,
                                               like: Like.new)
json.likes @likes
