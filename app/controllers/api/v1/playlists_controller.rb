class Api::V1::PlaylistsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Playlist.last
  end
end
