Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users
  resources :favorites, only: %i[index create destroy]
  delete '/favorites', to: 'favorites#delete_by_movie_id'
  resources :likes, only: %i[create destroy]

  resources :lists, only: %i[index show new create] do
    resources :bookmarks, only: %i[new create]
    collection do
      get '/featured', to: 'lists#feature'
    end
  end
  resources :bookmarks, only: [:destroy]
  resources :lists, only: [:destroy]
  resources :movies, only: %i[index show] do
    collection do
      get '/discover', to: 'movies#discover'
    end
  end
end
