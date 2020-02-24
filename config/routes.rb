Rails.application.routes.draw do
  root to: redirect("/playlists")
  devise_for :users

  get "/playlists", to: "static_pages#index"
  get "/playlists/hits", to: "static_pages#index"
  resources :users, only: [:index, :show]

  namespace "api" do
    namespace "v1" do
      resources :playlists, only: [:index]
      resources :submissions, only: [:create, :update, :destroy]
      get "/users/current", to: "users#current"
      resources :users, only: [:index, :show, :update]
      resources :votes, only: [:create, :update]
      post "/songs", to: "songs#search"
    end
  end
end
