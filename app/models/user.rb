class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
  validates :role, presence: true
  validates :member, inclusion: { in: [ true, false ] }
  enum role: { user: 0, admin: 1 }
  after_initialize :set_default_role, if: :new_record?

  has_many :submissions
  has_many :votes

  private

  def set_default_role
    self.role ||= :user
  end
end
