class UpdateMember < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:users, :member, from: false, to: true)
  end
end
