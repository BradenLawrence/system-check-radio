class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    submission = create_params
    binding.pry
    
  end

  private

  def create_params
    params.require(:submissionData).permit(
      :name, :image, :album, :artists, :description, :preview_url, :external_url
    )
  end
end
