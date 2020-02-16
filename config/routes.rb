Rails.application.routes.draw do
  root "static_pages#index"
  devise_for :users

  get "/playlists", to: "static_pages#index"
  get "/users", to: "static_pages#index"
  get "/users/:id", to: "static_pages#index"

  namespace "api" do
    namespace "v1" do
      resources :playlists, only: [:index]
      resources :submissions, only: [:create, :update, :destroy]
      resources :users, only: [:index, :show]
      post "/songs", to: "songs#search"
    end
  end
end
