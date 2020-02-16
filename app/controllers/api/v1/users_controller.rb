class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:show]
  before_action :user_params, only: [:show]

  def index

  end

  def show

  end

  private

  def user_params
    @user = User.find(params[:id])
  end
end
