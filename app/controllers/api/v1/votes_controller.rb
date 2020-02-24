class Api::V1::VotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    submission = show_params.first
    user = current_user.id
    render json: Vote.find_or_create_by(
      submission_id: submission,
      user_id: user
    )
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
        updated_submission = update_total_votes(vote)
        update_top_submission(vote)
        render json: updated_submission
      else
        render json: { errors: vote.errors }
      end
    else
      render json: { errors: ["Error modifying vote"] }
    end
  end

  private

  def show_params
    params.require([:submission_id, :id])
  end

  def vote_params
    params.require(:voteData).permit(:value, :submission_id)
  end

  def update_total_votes(vote)
    sub = vote.submission
    sub.vote_total = sub.votes.reduce(0) {|total, vote| total + vote.value}
    if sub.save
      return sub
    else
      return { errors: ["Error updating vote total"] }
    end
  end

  def update_top_submission(vote)
    playlist = vote.submission.playlist
    top_submission = playlist.submissions.max_by {|sub| sub.vote_total}
    playlist.top_submission = top_submission.id
    if playlist.save
      return playlist
    else
      return { errors: ["Error updating playlist"] }
    end
  end
end
