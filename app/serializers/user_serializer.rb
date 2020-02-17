class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email

  has_many :submissions, each_serializer: SubmissionSerializer
end
