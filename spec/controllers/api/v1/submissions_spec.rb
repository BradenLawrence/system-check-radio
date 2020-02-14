require 'rails_helper'

RSpec.describe Api::V1::SubmissionsController, type: :controller do
  let!(:playlist1) { Playlist.create(name: "Heavy Metal Jazz")}
  let!(:submission1) { {
    name: "Africa",
    artists: "TOTO",
    album: "Toto IV",
    duration_ms: 295893,
    image: "https://i.scdn.co/image/ab67616d00004851673d6a2831f72e48745ea80d",
    preview_url: "https://p.scdn.co/mp3-preview/dd78dafe31bb98f230372c038a126b8808f9349b?cid=c205b06529104ab6a0d1148d267b56cf",
    external_url: "https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX",
    description: "go",
    track_id: "2374M0fQpWi3dLnB54qaLX",
    playlist: playlist1
  } }
  let!(:submission2_missing_params) { {
    playlist: playlist1
  } }

  describe "POST#create" do
    context "Post was successful" do
      it "should persist in the database" do
        previous_count = Submission.all.count
        post :create, params: {submissionData: submission1}, format: :json
        next_count = Submission.all.count

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(next_count).to eq(previous_count + 1)
      end

      it "should return the playlist it was assigned to" do
        post :create, params: {submissionData: submission1}, format: :json

        returned_json = JSON.parse(response.body)
        expect(returned_json["name"]).to eq(playlist1.name)
      end

      it "should be present on the returned playlist" do
        post :create, params: {submissionData: submission1}, format: :json

        returned_sub = JSON.parse(response.body)["submissions"].last

        expect(returned_sub["name"]).to eq(submission1[:name])
        expect(returned_sub["artists"]).to eq(submission1[:artists])
        expect(returned_sub["album"]).to eq(submission1[:album])
        expect(returned_sub["duration_ms"]).to eq(submission1[:duration_ms])
        expect(returned_sub["image"]).to eq(submission1[:image])
        expect(returned_sub["preview_url"]).to eq(submission1[:preview_url])
        expect(returned_sub["external_url"]).to eq(submission1[:external_url])
        expect(returned_sub["description"]).to eq(submission1[:description])
        expect(returned_sub["track_id"]).to eq(submission1[:track_id])
      end
    end

    context "Post was unsuccessful"
      it "should not be saved" do
        previous_count = Submission.all.count
        post :create, params: {
          submissionData: submission2_missing_params
        }, format: :json
        next_count = Submission.all.count

        expect(next_count).to eq(previous_count)
      end

      it "should return errors" do
        post :create, params: {
          submissionData: submission2_missing_params
        }, format: :json

        returned_json = JSON.parse(response.body)["errors"]
        expect(returned_json.include?("Album can't be blank")).to be(true)
        expect(returned_json.include?("Artists can't be blank")).to be(true)
        expect(returned_json.include?("Description can't be blank")).to be(true)
        expect(returned_json.include?("Duration ms can't be blank")).to be(true)
        expect(returned_json.include?("Duration ms is not a number")).to be(true)
        expect(returned_json.include?("External url can't be blank")).to be(true)
        expect(returned_json.include?("Image can't be blank")).to be(true)
        expect(returned_json.include?("Name can't be blank")).to be(true)
        expect(returned_json.include?("Preview url can't be blank")).to be(true)
        expect(returned_json.include?("Track can't be blank")).to be(true)
      end

      it "should not save duplicate songs to the same playlist" do
        previous_count = Submission.all.count
        post :create, params: {submissionData: submission1}, format: :json
        post :create, params: {submissionData: submission1}, format: :json
        next_count = Submission.all.count

        expect(next_count).to eq(previous_count + 1)

        returned_json = JSON.parse(response.body)["errors"]

        expect(returned_json.include?("Track has already been taken")).to be(true)
      end
  end

  describe "PATCH#update" do
    context "Update was successful" do
      it "should save changes in the database" do
        post :create, params: {submissionData: submission1}, format: :json
        old_description = Submission.last.description

        update_payload = {
          id: Submission.last.id,
          submissionData: {
            description: "stop"
          }
        }

        patch :update, params: update_payload, format: :json
        new_description = Submission.last.description

        expect(new_description).to eq(update_payload[:submissionData][:description])
        expect(new_description).to_not eq(old_description)
      end
    end
  end
end
