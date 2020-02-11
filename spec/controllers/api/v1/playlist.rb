require 'rails_helper'

RSpec.describe Api::V1::PlaylistsController, type: :controller do
  describe "GET#index" do
    let!(:playlist1) { Playlist.create(name: "Technofolk")}
    let!(:playlist2) { Playlist.create(name: "Heavy Metal Jazz")}
    let!(:submission1) { Submission.create(
      track: "Saxophone Thrash",
      description: "Gnarly stuff",
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
      expect(returned_json["submissions"].first["track"]).to eq("Saxophone Thrash")
    end
  end
end
