class AddCalendarFieldsToCourses < ActiveRecord::Migration[7.1]
  def change
    add_column :courses, :published_in_calendar, :boolean, default: false, null: false
    add_column :courses, :default_day, :string, null: true
    
  end
end
