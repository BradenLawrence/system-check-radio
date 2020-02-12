class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    submission = Submission.new(create_params)
    submission.playlist = Playlist.last

    if submission.save
      render json: submission.playlist
    else
      render json: submission.errors.full_messages
    end

  end

  private

  def create_params
    params.require(:submissionData).permit(
      :album, :artists, :description, :duration_ms, :external_url, :image,
      :name, :preview_url
    )
  end
end
