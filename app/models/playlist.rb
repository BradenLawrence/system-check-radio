class Playlist < ApplicationRecord
  validates :name, presence: true
  validates :compilation, presence: true

  has_many :submissions
end
