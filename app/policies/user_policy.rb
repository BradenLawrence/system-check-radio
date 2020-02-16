class UserPolicy < ApplicationPolicy
  attr_reader :current_user, :user_model

  def initialize(current_user, model)
    @current_user = current_user
    @user_model = model
  end

  def index?
    @current_user.admin?
  end

  def show?
    response = @current_user.admin? || @current_user == @user_model
    return response
  end
end
