class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :album, :artists, :description, :duration_ms, :external_url,  :image, :name, :preview_url, :track_id, :author, :updated_at, :vote_total

  has_many :votes, each_serializer: VoteSerializer

  belongs_to :user
  belongs_to :playlist

  def author
    {
      id: object.user.id,
      name: object.user.name
    }
  end

  def updated_at
    object.updated_at.to_date
  end
end
