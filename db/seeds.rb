Movie.destroy_all

movies_api_url = 'http://tmdb.lewagon.com/movie/top_rated'
movies_serialized = URI.parse(movies_api_url).read
movies_response = JSON.parse(movies_serialized)

movies_response['results'].sample(5).each do |movie|
  Movie.create(
    title: movie['original_title'],
    overview: movie['overview'],
    poster_url: movie['poster_path'],
    rating: movie['vote_average']
  )
end
