class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show]
  after_action :verify_authorized, only: [:index, :show]

  def index
    authorize current_user
    render "static_pages/index"
  end

  def show
    requested_user = User.find_or_initialize_by(id: params[:id])
    authorize requested_user
    if requested_user.created_at.nil?
      redirect_to(request.referrer || root_path)
    else
      render "static_pages/index"
    end
  end
end
