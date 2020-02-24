class AddCompilationToPlaylist < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :compilation, :boolean, null: false, default: false
  end
end
