require 'rails_helper'

RSpec.describe Playlist, type: :model do
  it { should have_valid(:name).when("Heavy Metal Jazz") }
  it { should_not have_valid(:name).when(nil, "") }
end
