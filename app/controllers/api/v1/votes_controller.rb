class Api::V1::VotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    if current_user.member
      voteData = vote_params
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

  def update
    voteData = vote_params
    vote = Vote.find_by(
      user: current_user, submission_id: voteData["submission_id"]
    )
    unless vote.nil?
      if vote.value == voteData["value"].to_i
        vote.value = 0
      else
        vote.value = voteData["value"].to_i
      end

      if vote.save
        render json: vote.submission
      else
        render json: { errors: vote.errors }
      end
    else
      render json: { errors: ["Error modifying vote"] }
    end
  end

  private

  def vote_params
    params.require(:voteData).permit(:value, :submission_id)
  end
end
