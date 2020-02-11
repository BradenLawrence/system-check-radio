Rails.application.routes.draw do
  root "static_pages#index"
  devise_for :users

  get "/playlists", to: "static_pages#index"

  namespace "api" do
    namespace "v1" do
      resources :playlists, only: [:index]
    end
  end
end
