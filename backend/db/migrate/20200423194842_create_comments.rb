class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :upvotes, default: 1
      t.integer :downvotes, default: 0
      t.integer :difference, default: 1
      t.references :champion, foreign_key: true

      t.timestamps
    end
  end
end
