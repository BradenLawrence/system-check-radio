class CreateSubmission < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions do |t|
      t.string :track, null: false
      t.text :description, null: false
      t.belongs_to :playlist, null: false

      t.timestamps null: false
    end
  end
end
