require 'rspotify'

class TracksWrapper
  RSpotify.authenticate(ENV["CLIENT_ID"], ENV["CLIENT_SECRET"])

  attr_reader :track_data

  def initialize(track_data)
    @track_data = track_data
  end

  def self.retrieve_tracks(term)
    spotify_response = RSpotify::Track.search(term)
    track_data = parse_tracks(spotify_response)
    TracksWrapper.new(track_data)
  end

  def self.parse_tracks(spotify_data)
    spotify_data.map do |track|
      {
        id: track.id,
        name: track.name,
        album: track.album.name,
        artists: track.artists.map {|artist| artist.name},
        image: track.album.images.min_by{|value| value["height"]}["url"],
        preview_url: track.preview_url,
        external_url: track.external_urls["spotify"]
      }
    end
  end
end
