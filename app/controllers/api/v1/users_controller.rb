class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user.role == "admin"
      render json: User.all
    else
      render json: { error: "You are not authorized to view this page" }
    end
  end
end
