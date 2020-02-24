class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :compilation

  has_many :submissions, each_serializer: SubmissionSerializer
end
