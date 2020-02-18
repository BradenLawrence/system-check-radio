class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :album, :artists, :description, :duration_ms, :external_url,  :image, :name, :preview_url, :track_id, :author, :isCurrentUser, :isAdmin, :updated_at, :vote_total

  has_many :votes, each_serializer: VoteSerializer

  belongs_to :user
  belongs_to :playlist

  def author
    object.user.name
  end

  def isCurrentUser
    object.user == current_user
  end

  def isAdmin
    if current_user
      current_user.role == "admin"
    else
      false
    end
  end

  def vote_total
    object.votes.reduce(0) {|total, vote| total + vote.value}
  end

  def updated_at
    object.updated_at.to_date
  end
end
