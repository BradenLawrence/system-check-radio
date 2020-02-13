class CreateSubmission < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions do |t|
      t.string :album, null: false
      t.string :artists, null: false
      t.text :description, null: false
      t.integer :duration_ms, null: false
      t.string :external_url, null: false
      t.string :image, null: false
      t.string :name, null: false
      t.string :preview_url, null: false
      t.string :track_id, null: false
      t.belongs_to :playlist, null: false

      t.timestamps null: false
    end
  end
end
