class CreateChampions < ActiveRecord::Migration[5.2]
  def change
    create_table :champions do |t|
      t.string :name
      t.string :image_url
      t.string :passive_title
      t.string :passive_description
      t.string :q_title
      t.string :q_description
      t.string :w_title
      t.string :w_description
      t.string :e_title
      t.string :e_description
      t.string :r_title
      t.string :r_description

      t.timestamps
    end
  end
end
