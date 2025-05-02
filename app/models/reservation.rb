class Reservation < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["cours", "created_at", "date", "email", "id", "id_value", "name", "phone", "status", "updated_at"]
  end
end
