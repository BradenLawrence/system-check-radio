class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :value, null: false, default: 0
      t.belongs_to :user, null: false
      t.belongs_to :submission, null: false
      t.index [:user_id, :submission_id], unique: true

      t.timestamps null: false
    end
  end
end
