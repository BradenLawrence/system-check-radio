Rails.application.routes.draw do
  root "static_pages#index"
  devise_for :users

  get "/playlists", to: "static_pages#index"
  resources :users, only: [:index, :show]

  namespace "api" do
    namespace "v1" do
      resources :playlists, only: [:index]
      resources :submissions, only: [:create, :update, :destroy]
      resources :users, only: [:index, :show, :update]
      resources :votes, only: [:create]
      post "/songs", to: "songs#search"
    end
  end
end
