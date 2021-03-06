class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    error_list = []
    if current_user.nil?
      error_list << "You must be signed in to make a submission"
    end
    if current_user && !current_user.member
      error_list << "You must be an active member to make a submission"
    end
    unless error_list.length > 0
      submission = Submission.new(submission_params)
      submission.playlist = Playlist.where(compilation: false).last
      submission.user = current_user
      if submission.save
        render json: submission
      else
        render json: { errors: submission.errors.full_messages }
      end
    else
      render json: { errors: error_list }
    end
  end

  def update
    submission = Submission.find(params["id"])
    if submission.user == current_user || current_user.role == "admin"
      changes = submission_params
      if submission.update_attributes(changes)
        render json: submission
      else
        render json: { errors: submission.errors.full_messages }
      end
    else
      render json: { errors: "You are not authorized to edit this submission." }
    end
  end

  def destroy
    submission = Submission.find(params["id"])
    if submission.user == current_user || current_user.role == "admin"
      if submission.destroy
        render json: submission
      else
        render json: { errors: submission.errors.full_messages }
      end
    else
      render json: { errors: "You are not authorized to delete this submission." }
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
