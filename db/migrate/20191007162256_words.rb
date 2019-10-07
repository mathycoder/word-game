class Words < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string :word
    end
  end
end
