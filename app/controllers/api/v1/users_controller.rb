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
    if current_user.role == "admin" || current_user.id == show_params.to_i
      render json: User.find(show_params)
    else
      render json: { errors: ["You are not authorized to view this page"] }
    end
  end

  def update
    if current_user.role == "admin"
      user = User.find(update_params["id"])
      if user.update_attributes(update_params)
        render json: user
      else
        render json: { errors: user.errors.full_messages }
      end
    else
      render json: { errors: "You are not authorized to edit users" }
    end
  end

  private

  def show_params
    params.require(:id)
  end

  def update_params
    params.require(:user).permit(:id, :member)
  end
end
