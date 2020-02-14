class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    submission = Submission.new(submission_params)
    submission.playlist = Playlist.last

    if submission.save
      render json: submission.playlist
    else
      render json: { errors: submission.errors.full_messages }
    end
  end

  def update
    changes = submission_params
    submission = Submission.find(params["id"])
    if submission.update_attributes(changes)
      render json: submission
    else
      render json: { errors: submission.errors.full_messages }
    end
  end

  private

  def submission_params
    params.require(:submissionData).permit(
      :id, :album, :artists, :description, :duration_ms,
      :external_url, :image, :name, :preview_url, :track_id
    )
  end

end
