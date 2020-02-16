require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:email).when("buddy@example.com") }
  it { should_not have_valid(:email).when(nil, "") }

  it { should have_valid(:name).when("WeBeJammin") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:role).when(0, 1) }
  it { should define_enum_for(:role).with_values([:user, :admin]) }
end
