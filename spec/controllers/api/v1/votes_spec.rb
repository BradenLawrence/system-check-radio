require 'rails_helper'

RSpec.describe Api::V1::VotesController, type: :controller do
  describe "GET#show" do
    let!(:playlist1) { Playlist.create(name: "Heavy Metal Jazz")}
    let!(:user1) { FactoryBot.create(:user) }
    let!(:user2) { FactoryBot.create(:user) }
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
      playlist: playlist1,
      user: user1
    )}
    let!(:vote1) { Vote.create(
      value: 1,
      user: user1,
      submission: submission1
    )}

    it "should return the vote associated with the submission and user" do
      sign_in user1
      show_params = {
        submission_id: submission1.id,
        id: user1.id
      }
      get :show, params: show_params, format: :json

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(JSON.parse(response.body)["value"]).to eq(1)
    end

    it "should create a new Vote if one does not already exist" do
      sign_in user2
      show_params = {
        submission_id: submission1.id,
        id: user2.id
      }
      get :show, params: show_params, format: :json

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(JSON.parse(response.body)["value"]).to eq(0)
    end
  end
end
