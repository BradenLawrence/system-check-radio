require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#index" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:user3) { FactoryBot.create(:user) }

    it "should return a list of all users when logged in as an admin" do
      user1.role = "admin"
      user1.save
      sign_in user1

      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(returned_json.class).to eq(Array)
      expect(returned_json.length).to eq(3)
    end

    it "should return errors when not an admin user" do
      sign_in user1

      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(returned_json.class).to eq(Hash)
      expect(returned_json["errors"].include?("You are not authorized to view this page")).to eq(true)
    end
  end

  describe "GET#index" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:playlist1) { Playlist.create(name: "Technofolk")}
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

    it "should return the user's data when logged in as an admin" do
      user2.role = "admin"
      user2.save
      sign_in user2

      get :show, params: { id: user1.id }, format: :json

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(returned_json.class).to eq(Hash)
      expect(returned_json["name"]).to eq(user1.name)
      expect(returned_json["email"]).to eq(user1.email)
      expect(returned_json["isCurrentUser"]).to eq(false)
      expect(returned_json["submissions"].length).to eq(1)
      expect(returned_json["submissions"].first["name"]).to eq("Africa")
    end

    it "should return the user's data when logged in as that user" do
      sign_in user1

      get :show, params: { id: user1.id }, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(returned_json.class).to eq(Hash)
      expect(returned_json["name"]).to eq(user1.name)
      expect(returned_json["email"]).to eq(user1.email)
      expect(returned_json["isCurrentUser"]).to eq(true)
      expect(returned_json["submissions"].length).to eq(1)
      expect(returned_json["submissions"].first["name"]).to eq("Africa")
    end

    it "should return an error when not an admin and not the requested user" do
      sign_in user1

      get :show, params: { id: user2.id }, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      expect(returned_json.class).to eq(Hash)
      expect(returned_json["errors"].include?("You are not authorized to view this page")).to eq(true)
    end
  end
end
