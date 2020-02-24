class AddTopSubmissionToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :top_submission, :bigint, default: nil
  end
end
