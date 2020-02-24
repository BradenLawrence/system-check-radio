class Playlist < ApplicationRecord
  validates :name, presence: true
  validates :compilation, inclusion: { in: [ true, false ] }

  has_many :submissions
end
