class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :role, :member

  has_many :submissions, each_serializer: SubmissionSerializer
  has_many :votes, each_serializer: VoteSerializer
end
