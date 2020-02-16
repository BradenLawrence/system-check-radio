class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:show]

  def index
    render json: User.all
  end

  def show
    render json: User.find()
  end
end
