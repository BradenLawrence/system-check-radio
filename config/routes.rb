Rails.application.routes.draw do
  root to: redirect("/playlists")
  devise_for :users

  get "/playlists", to: "static_pages#index"
  get "/playlists/hits", to: "static_pages#index"
  resources :users, only: [:index, :show]

  namespace "api" do
    namespace "v1" do
      resources :playlists, only: [:index, :show]
      resources :submissions, only: [:create, :update, :destroy] do
        resources :votes, only: [:show, :create, :update]
      end
      get "/users/current", to: "users#current"
      resources :users, only: [:index, :show, :update]
      post "/songs", to: "songs#search"
    end
  end
end
