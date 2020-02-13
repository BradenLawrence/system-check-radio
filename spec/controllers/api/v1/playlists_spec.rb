require 'rails_helper'

RSpec.describe Api::V1::PlaylistsController, type: :controller do
  describe "GET#index" do
    let!(:playlist1) { Playlist.create(name: "Technofolk")}
    let!(:playlist2) { Playlist.create(name: "Heavy Metal Jazz")}
    let!(:submission1) { Submission.create(
      name: "Africa",
      artists: "TOTO",
      album: "Toto IV",
      duration_ms: 295893,
      image: "https://i.scdn.co/image/ab67616d00004851673d6a2831f72e48745ea80d",
      preview_url: "https://p.scdn.co/mp3-preview/dd78dafe31bb98f230372c038a126b8808f9349b?cid=c205b06529104ab6a0d1148d267b56cf",
      external_url: "https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX",
      description: "go",
      track_id: "2374M0fQpWi3dLnB54qaLX",
      playlist: playlist2
    )}

    it "should return the most recently created playlist" do
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json.class).to eq(Hash)
      expect(returned_json.class).to_not eq(Array)

      expect(returned_json["name"]).to eq("Heavy Metal Jazz")
      expect(returned_json["submissions"].first["name"]).to eq("Africa")
    end
  end
end
