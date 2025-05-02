class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.date :date
      t.string :cours
      t.string :name
      t.string :email
      t.string :phone
      t.string :status

      t.timestamps
    end
  end
end
