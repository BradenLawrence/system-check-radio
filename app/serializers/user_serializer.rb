class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :isCurrentUser, :role, :member, :isAdmin

  has_many :submissions, each_serializer: SubmissionSerializer

  def isCurrentUser
    object == current_user
  end

  def isAdmin
    if current_user
      current_user.role == "admin"
    else
      false
    end
  end
end
