Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get '/my_lists', to: 'lists#my_lists', as: 'my_lists'
  resources :favorites, only: %i[index create destroy]
  resources :lists, only: %i[index show new create] do
    resources :bookmarks, only: %i[new create]
  end
  resources :bookmarks, only: [:destroy]
  resources :lists, only: [:destroy]
  resources :movies, only: [:index] do
    collection do
      get '/discover', to: 'movies#discover'
    end
  end
end
