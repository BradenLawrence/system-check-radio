class Vote < ApplicationRecord
  validates :value, presence: true, numericality: { only_integer: true }, inclusion: { in: [-1, 0, 1] }

  belongs_to :user
  belongs_to :submission
end
