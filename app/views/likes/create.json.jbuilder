json.form json.partial!('likes/form.html.erb', movie: @like.movie_id,
                                                   like: @like,
                                                   liked: @like.liked)
json.likes @likes
