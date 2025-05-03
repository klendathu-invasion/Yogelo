# app/admin/courses.rb
ActiveAdmin.register Course do
  # Authorize these fields for operations
  permit_params :name, :start_time, :duration, :description, :published_in_calendar, :default_day

  # Customize the index (list)
  index do
    selectable_column
    id_column
    column :name
    column :start_time
    column :duration do |course|
      "#{course.duration} minutes"
    end
    column :default_day
    column :published_in_calendar do |course|
      status_tag course.published_in_calendar? ? "Yes" : "No" 
    end
    column :created_at
    actions
  end

  # Customize search filters
  filter :name
  filter :start_time
  filter :duration
  filter :default_day
  filter :published_in_calendar
  filter :created_at

  # Customize the form
  form do |f|
    f.inputs 'Course Details' do
      f.input :name, label: 'Course Name'
      f.input :start_time, label: 'Start Time'
      f.input :duration, label: 'Duration (minutes)'
      f.input :description, as: :text
      f.input :default_day, as: :select, collection: 
        ['Lundi', 'Mardi', 'Jeudi', 'Vendredi'], 
        label: 'Default Day of the Week'
      f.input :published_in_calendar, label: 'Show in Calendar?'
    end
    f.actions
  end

  # Customize the detailed view
  show do
    attributes_table do
      row :id
      row :name
      row :start_time
      row :duration do |course|
        "#{course.duration} minutes"
      end
      row :description
      row :default_day
      row :published_in_calendar do |course|
        status_tag course.published_in_calendar? ? "Yes" : "No"
      end
      row :created_at
      row :updated_at
    end
  end
end