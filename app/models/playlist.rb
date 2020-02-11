class Playlist < ApplicationRecord
  validates :name, presence: true

  has_many :submissions
end
