require 'rails_helper'

RSpec.describe Submission, type: :model do
  it { should have_valid(:name).when("Africa") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:album).when("Toto IV") }
  it { should_not have_valid(:album).when(nil, "") }

  it { should have_valid(:artists).when("TOTO") }
  it { should_not have_valid(:artists).when(nil, "") }

  it { should have_valid(:description).when("go") }
  it { should_not have_valid(:description).when(nil, "") }

  it { should have_valid(:duration_ms).when(1) }
  it { should_not have_valid(:duration_ms).when(nil, "", 1.5, ) }
end
