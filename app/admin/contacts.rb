# app/admin/contacts.rb
ActiveAdmin.register Contact do
  # Enlever les actions de création et modification
  actions :all, except: [:new, :edit, :update]
  
  # Configurer les colonnes dans la liste
  index do
    selectable_column
    id_column
    column :name
    column :email
    column :phone
    column :subject
    column :created_at
    actions defaults: true do |contact|
      # Supprimer le lien d'édition
      item "Voir", admin_contact_path(contact), class: "member_link"
      item "Supprimer", admin_contact_path(contact), 
           method: :delete, 
           data: { confirm: "Êtes-vous sûr de vouloir supprimer ce contact?" }, 
           class: "member_link"
    end
  end
  
  # Filtres de recherche
  filter :name
  filter :email
  filter :subject
  filter :created_at
  
  # Personnaliser l'affichage détaillé
  show do
    attributes_table do
      row :id
      row :name
      row :email
      row :phone
      row :subject
      row :message do |contact|
        simple_format contact.message
      end
      row :created_at
      row :updated_at
    end
  end
  
  # Personnaliser les titres des pages
  menu label: "Messages Contact"
  
  controller do
    # Si vous voulez personnaliser les actions du contrôleur
    def scoped_collection
      super.order(created_at: :desc) # Montrer les plus récents en premier
    end
  end
end