require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    name { 'WeBeJammin' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
