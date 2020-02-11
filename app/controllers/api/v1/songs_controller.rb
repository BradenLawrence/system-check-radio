require 'rspotify'

class Api::V1::SongsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  RSpotify.authenticate(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"])

  def search
    query = query_params
    results = RSpotify::Track.search(query["term"])
    render json: results
  end

  private

  def query_params
    params.require(:query).permit(:term)
  end
end
