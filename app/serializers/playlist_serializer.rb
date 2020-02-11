class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :submissions, each_serializer: SubmissionSerializer
end
