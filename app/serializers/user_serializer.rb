class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :isCurrentUser

  has_many :submissions, each_serializer: SubmissionSerializer

  def isCurrentUser
    object == current_user
  end
end
