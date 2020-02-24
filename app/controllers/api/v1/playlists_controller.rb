class Api::V1::PlaylistsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Playlist.where(compilation: false).last
  end

  def show
    render(
      json: Playlist.find_or_create_by(
        name: "Greatest Hits",
        compilation: true
      ),
      serializer: HitsSerializer
    )
  end
end
