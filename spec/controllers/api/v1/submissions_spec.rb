require 'rails_helper'

RSpec.describe Api::V1::SubmissionsController, type: :controller do
  let!(:playlist1) { Playlist.create(name: "Heavy Metal Jazz")}
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }
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
    playlist: playlist1,
    user: user1
  } }
  let!(:submission2_missing_params) { {
    playlist: playlist1,
    user: user1
  } }

  describe "POST#create" do
    context "Post was successful" do
      it "should persist in the database" do
        sign_in user1
        previous_count = Submission.all.count
        post :create, params: {submissionData: submission1}, format: :json
        next_count = Submission.all.count

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(next_count).to eq(previous_count + 1)
      end

      it "should return the submission that was posted" do
        sign_in user1
        post :create, params: {submissionData: submission1}, format: :json

        returned_json = JSON.parse(response.body)
        expect(returned_json["name"]).to eq(submission1[:name])
      end

      it "should be present on the playlist it was posted to" do
        sign_in user1
        post :create, params: {submissionData: submission1}, format: :json

        returned_sub = JSON.parse(response.body)
        newest_sub = Playlist.find_by(name: playlist1.name).submissions.last

        expect(returned_sub["name"]).to eq(newest_sub[:name])
        expect(returned_sub["artists"]).to eq(newest_sub[:artists])
        expect(returned_sub["album"]).to eq(newest_sub[:album])
        expect(returned_sub["duration_ms"]).to eq(newest_sub[:duration_ms])
        expect(returned_sub["image"]).to eq(newest_sub[:image])
        expect(returned_sub["preview_url"]).to eq(newest_sub[:preview_url])
        expect(returned_sub["external_url"]).to eq(newest_sub[:external_url])
        expect(returned_sub["description"]).to eq(newest_sub[:description])
        expect(returned_sub["track_id"]).to eq(newest_sub[:track_id])
      end
    end

    context "Post was unsuccessful"
      it "should not be saved" do
        sign_in user1
        previous_count = Submission.all.count
        post :create, params: {
          submissionData: submission2_missing_params
        }, format: :json
        next_count = Submission.all.count

        expect(next_count).to eq(previous_count)
      end

      it "should return errors" do
        sign_in user1
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
        sign_in user1
        previous_count = Submission.all.count
        post :create, params: {submissionData: submission1}, format: :json
        post :create, params: {submissionData: submission1}, format: :json
        next_count = Submission.all.count

        expect(next_count).to eq(previous_count + 1)

        returned_json = JSON.parse(response.body)["errors"]

        expect(returned_json.include?("Track has already been taken")).to be(true)
      end

      it "should not save if user is not signed in" do
        previous_count = Submission.all.count
        post :create, params: {submissionData: submission1}, format: :json
        next_count = Submission.all.count

        expect(next_count).to eq(previous_count)

        returned_json = JSON.parse(response.body)["errors"]

        expect(returned_json.include?("You must be signed in to make a submission")).to be(true)
      end
  end

  describe "PATCH#update" do
    context "Update was successful" do
      it "should save changes in the database" do
        sign_in user1
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

    context "Update was unsuccessful" do
      it "should not save if the user is not the author of the submission" do
        sign_in user1
        post :create, params: {submissionData: submission1}, format: :json
        old_description = Submission.last.description

        sign_out user1
        sign_in user2

        update_payload = {
          id: Submission.last.id,
          submissionData: {
            description: "stop"
          }
        }

        patch :update, params: update_payload, format: :json
        new_description = Submission.last.description

        expect(new_description).to eq(old_description)

        returned_json = JSON.parse(response.body)["errors"]

        expect(returned_json.include?("You are not authorized to edit this submission.")).to be(true)
      end
    end
  end

  describe "DELETE#destroy" do
    context "Delete was successful" do
      it "should remove the submission from the database" do
        sign_in user1
        post :create, params: {submissionData: submission1}, format: :json

        submission_to_delete = Submission.find_by(name: submission1[:name])
        previous_count = Submission.all.length

        delete :destroy, params: {id: submission_to_delete.id}, format: :json
        next_count = Submission.all.length

        expect(next_count).to eq(previous_count-1)
      end
    end

    context "Delete was unsuccessful" do
      it "should not remove the submission if user is not the author" do
        sign_in user1
        post :create, params: {submissionData: submission1}, format: :json

        submission_to_delete = Submission.find_by(name: submission1[:name])
        previous_count = Submission.all.length

        sign_out user1
        sign_in user2

        delete :destroy, params: {id: submission_to_delete.id}, format: :json
        next_count = Submission.all.length

        expect(next_count).to eq(previous_count)

        returned_json = JSON.parse(response.body)["errors"]

        expect(returned_json.include?("You are not authorized to delete this submission.")).to be(true)
      end
    end
  end
end
