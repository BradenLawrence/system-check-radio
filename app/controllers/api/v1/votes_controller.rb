class Api::V1::VotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    if current_user.member
      voteData = create_params
      vote = Vote.new(
        value: voteData["value"],
        user: current_user,
        submission: Submission.find(voteData["submission_id"])
      )
      if vote.save
        render json: vote.submission
      else
        render json: { errors: vote.errors.full_messages }
      end
    else
      render json: { errors: ["You must be an active member to vote"] }
    end
  end

  private

  def create_params
    params.require(:voteData).permit(:value, :submission_id)
  end
end
