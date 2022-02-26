Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users
  resources :favorites, only: %i[index create destroy]
  delete '/favorites', to: 'favorites#delete_by_movie_id'
  resources :likes, only: %i[index create update destroy]

  resources :movies, only: %i[index] do
    collection do
      get '/discover', to: 'movies#discover'
    end
  end
end
