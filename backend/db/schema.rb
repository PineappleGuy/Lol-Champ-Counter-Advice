# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_23_194842) do

  create_table "champions", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.string "passive_title"
    t.string "passive_description"
    t.string "q_title"
    t.string "q_description"
    t.string "w_title"
    t.string "w_description"
    t.string "e_title"
    t.string "e_description"
    t.string "r_title"
    t.string "r_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.integer "upvotes", default: 1
    t.integer "downvotes", default: 0
    t.integer "difference", default: 1
    t.integer "champion_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["champion_id"], name: "index_comments_on_champion_id"
  end

end
