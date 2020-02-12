class Api::V1::SongsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def search
    query = query_params
    results = TracksWrapper.retrieve_tracks(query["term"])
    render json: results.track_data
  end

  private

  def query_params
    params.require(:query).permit(:term)
  end
end
