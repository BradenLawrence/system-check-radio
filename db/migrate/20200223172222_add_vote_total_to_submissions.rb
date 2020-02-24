class AddVoteTotalToSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :vote_total, :integer, null: false, default: 0
  end
end
