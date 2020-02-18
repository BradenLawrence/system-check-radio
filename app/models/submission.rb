class Submission < ApplicationRecord
  validates :album, presence: true
  validates :artists, presence: true
  validates :description, presence: true
  validates :duration_ms, presence: true, numericality: { only_integer: true }
  validates :external_url, presence: true
  validates :image, presence: true
  validates :name, presence: true
  validates :preview_url, presence: true
  validates :track_id, presence: true

  has_many :votes

  belongs_to :user
  belongs_to :playlist
  validates_uniqueness_of :track_id, scope: :playlist_id
end
