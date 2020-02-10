class Submission < ApplicationRecord
  validates :track, presence: true
  validates :description, presence: true

  belongs_to :playlist
end
