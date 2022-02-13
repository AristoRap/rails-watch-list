const fetchMovies = () => {
  const url = "/movies/popular";

  fetch(url, {
    method: 'GET',
    headers: {Accept: 'application/json'}
  }).then(response => response.json())
};

export  { fetchMovies }
