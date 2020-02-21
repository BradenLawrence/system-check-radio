class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :isMember

  has_many :submissions, each_serializer: SubmissionSerializer

  def isMember
    current_user && current_user.member
  end
end
