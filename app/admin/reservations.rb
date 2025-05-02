# app/admin/reservations.rb
ActiveAdmin.register Reservation do
  # Autoriser les opérations sur ces champs
  permit_params :date, :cours, :name, :email, :phone, :status

  # Personnaliser l'index (liste)
  index do
    selectable_column
    id_column
    column :date
    column :cours
    column :name
    column :email
    column :status do |reservation|
      if reservation.status.present?
        status_tag "Réservé", class: "red"
      else
        status_tag "Libre", class: "green"
      end
    end
    column :created_at
    actions
  end

  # Personnaliser les filtres de recherche
  filter :date
  filter :cours
  filter :name
  filter :email
  filter :status
  filter :created_at

  # Personnaliser le formulaire
  form do |f|
    f.inputs 'Détails de la réservation' do
      f.input :date, as: :datepicker
      f.input :cours, label: 'Cours',
              collection: Course.all.map { |c| [c.name, c.name] }
      f.input :name, label: 'Nom du client'
      f.input :email
      f.input :phone, label: 'Téléphone'
      f.input :status, label: 'Statut (vide = libre)',
              hint: 'Laissez vide pour indiquer que le créneau est libre, ou entrez le nom du client pour marquer comme réservé'
    end
    f.actions
  end

  # Personnaliser l'affichage en détail
  show do
    attributes_table do
      row :id
      row :date
      row :cours
      row :name
      row :email
      row :phone
      row :status do |reservation|
        if reservation.status.present?
          status_tag "Réservé", class: "red"
        else
          status_tag "Libre", class: "green"
        end
      end
      row :created_at
      row :updated_at
    end
  end

  # Actions personnalisées
  action_item :create_multiple, only: :index do
    # Utilisez la route correcte pour les pages personnalisées
    link_to 'Créer plusieurs réservations', admin_bulkreservation_path
  end
end