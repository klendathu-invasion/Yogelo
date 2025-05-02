# app/admin/courses.rb
ActiveAdmin.register Course do
  # Autoriser les opérations sur ces champs
  permit_params :name, :start_time, :duration, :description

  # Personnaliser l'index (liste)
  index do
    selectable_column
    id_column
    column :name
    column :start_time
    column :duration do |course|
      "#{course.duration} minutes"
    end
    column :created_at
    actions
  end

  # Personnaliser les filtres de recherche
  filter :name
  filter :start_time
  filter :duration
  filter :created_at

  # Personnaliser le formulaire
  form do |f|
    f.inputs 'Détails du cours' do
      f.input :name, label: 'Nom du cours'
      f.input :start_time, label: 'Heure de début'
      f.input :duration, label: 'Durée (minutes)'
      f.input :description, as: :text
    end
    f.actions
  end

  # Personnaliser l'affichage en détail
  show do
    attributes_table do
      row :id
      row :name
      row :start_time
      row :duration do |course|
        "#{course.duration} minutes"
      end
      row :description
      row :created_at
      row :updated_at
    end
  end
end