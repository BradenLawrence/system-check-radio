class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to view this page."
    redirect_to(request.referrer || root_path)
  end

  protected

   def configure_permitted_parameters
     devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
   end
end
