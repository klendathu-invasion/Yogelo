# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_05_03_125402) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "bots", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "username", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_bots_on_email", unique: true
    t.index ["reset_password_token"], name: "index_bots_on_reset_password_token", unique: true
  end

  create_table "boxes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "pokemon_id"
    t.boolean "shiny"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "wild", default: true, null: false
    t.integer "attempt", default: 0, null: false
    t.bigint "pid", default: 0, null: false
    t.boolean "gender"
    t.index ["pokemon_id"], name: "index_boxes_on_pokemon_id"
    t.index ["user_id"], name: "index_boxes_on_user_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "nom"
    t.string "email"
    t.string "phone"
    t.string "sujet"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "start_time"
    t.integer "duration"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "published_in_calendar", default: false, null: false
    t.string "default_day"
  end

  create_table "inventories", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "item_id"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_inventories_on_item_id"
    t.index ["user_id"], name: "index_inventories_on_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon"
    t.integer "item_index"
    t.index ["item_index"], name: "index_items_on_item_index", unique: true
  end

  create_table "level_steps", force: :cascade do |t|
    t.integer "level", default: 1
    t.string "name"
    t.integer "total_exp", default: 0
    t.integer "next_level_xp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pokemon_translations", force: :cascade do |t|
    t.string "locale"
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "version"
    t.bigint "pokemon_id"
  end

  create_table "pokemons", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "type1"
    t.string "type2"
    t.integer "rarity"
    t.integer "catch_rate"
    t.integer "evol_level"
    t.string "forme"
    t.integer "base_hp"
    t.integer "base_spe"
    t.integer "base_def"
    t.integer "base_spe_def"
    t.integer "base_atk"
    t.integer "base_spe_atk"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "pokemon_id"
    t.integer "special_category", default: 0, null: false
    t.integer "special_spawn", default: 0, null: false
    t.integer "base_exp"
    t.integer "weight"
    t.integer "height"
    t.integer "base_happiness"
    t.string "egg_group_1"
    t.string "egg_group_2"
    t.boolean "forms_switchable"
    t.integer "gender_rate"
    t.string "growth_rate"
    t.string "habitat"
    t.boolean "has_gender_differences"
    t.integer "hatch_counter"
    t.bigint "evolve_from_id"
    t.index ["pokemon_id"], name: "index_pokemons_on_pokemon_id", unique: true
  end

  create_table "reservations", force: :cascade do |t|
    t.date "date"
    t.string "cours"
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "server_discords", force: :cascade do |t|
    t.string "guild_id"
    t.string "prefix"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stats", force: :cascade do |t|
    t.integer "hp"
    t.integer "spe"
    t.integer "def"
    t.integer "spe_def"
    t.integer "atk"
    t.integer "spe_atk"
    t.integer "hp_ev"
    t.integer "spe_ev"
    t.integer "def_ev"
    t.integer "spe_def_ev"
    t.integer "atk_ev"
    t.integer "spe_atk_ev"
    t.integer "hp_iv"
    t.integer "spe_iv"
    t.integer "def_iv"
    t.integer "spe_def_iv"
    t.integer "atk_iv"
    t.integer "spe_atk_iv"
    t.integer "happiness"
    t.string "nature"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "box_id"
    t.integer "exp", default: 0
    t.index ["box_id"], name: "index_stats_on_box_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "discord_id"
    t.string "language"
    t.boolean "patreon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "poke_dollars", default: 100
    t.integer "tid", default: 0, null: false
    t.integer "sid", default: 0, null: false
    t.datetime "last_daily_time"
    t.integer "exp", default: 0
  end

  add_foreign_key "boxes", "pokemons"
  add_foreign_key "boxes", "users"
  add_foreign_key "inventories", "items"
  add_foreign_key "inventories", "users"
  add_foreign_key "pokemon_translations", "pokemons", primary_key: "pokemon_id"
  add_foreign_key "pokemons", "pokemons", column: "evolve_from_id", primary_key: "pokemon_id"
  add_foreign_key "stats", "boxes"
end
