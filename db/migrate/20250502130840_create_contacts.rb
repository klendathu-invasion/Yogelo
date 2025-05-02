class CreateContacts < ActiveRecord::Migration[7.1]
  def change
    create_table :contacts do |t|
      t.string :nom
      t.string :email
      t.string :phone
      t.string :sujet
      t.string :message

      t.timestamps
    end
  end
end
