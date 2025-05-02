class Course < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "duration", "id", "id_value", "name", "start_time", "updated_at"]
  end
end
