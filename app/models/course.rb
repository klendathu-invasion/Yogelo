class Course < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "default_day", "description", "duration", "id", "id_value", "name", "published_in_calendar", "start_time", "updated_at"]
  end
  
  # Method to get all published courses for a specific day
  def self.published_for_day(day)
    where(published_in_calendar: true, default_day: day).order(:start_time)
  end
  
  # Method to get all days that have published courses
  def self.days_with_courses
    where(published_in_calendar: true)
      .pluck(:default_day)
      .uniq
      .compact
      .sort_by { |day| ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].index(day) || 999 }
  end
end