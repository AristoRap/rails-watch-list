Bookmark.destroy_all
Movie.destroy_all

movies_serialized = URI.parse(ENV["MOVIES_API_URL"]).read
movies_response = JSON.parse(movies_serialized)

movies_response['results'].sample(10).each do |movie|
  Movie.create(
    title: movie['original_title'],
    overview: movie['overview'],
    poster_url: "https://www.themoviedb.org/t/p/original#{movie['poster_path']}",
    rating: movie['vote_average']
  )
end
