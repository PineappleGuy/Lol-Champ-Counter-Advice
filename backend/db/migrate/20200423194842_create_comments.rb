class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :upvotes
      t.integer :downvotes
      t.references :champion, foreign_key: true

      t.timestamps
    end
  end
end
