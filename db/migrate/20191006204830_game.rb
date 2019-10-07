class Game < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :letters
    end
  end
end
