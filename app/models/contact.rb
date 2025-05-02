class Contact < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "id", "id_value", "message", "nom", "phone", "sujet", "updated_at"]
  end
end
