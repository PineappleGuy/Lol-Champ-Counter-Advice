class CreateChampions < ActiveRecord::Migration[5.2]
  def change
    create_table :champions do |t|
      t.string :name
      t.string :image_url
      t.string :passive
      t.string :q
      t.string :w
      t.string :e
      t.string :r

      t.timestamps
    end
  end
end
