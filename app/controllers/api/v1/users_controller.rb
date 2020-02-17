class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user.role == "admin"
      render json: User.all
    else
      render json: { errors: ["You are not authorized to view this page"] }
    end
  end

  def show
    if current_user.role == "admin" || current_user.id == user_params.to_i
      render json: User.find(user_params)
    else
      render json: { errors: ["You are not authorized to view this page"] }
    end
  end

  private

  def user_params
    params.require(:id)
  end
end
