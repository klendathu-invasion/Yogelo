# app/admin/bulkreservation.rb
ActiveAdmin.register_page "Bulkreservation" do
  menu false
  
  content title: "Créer plusieurs réservations" do
    render partial: 'admin/bulk_reservation_form'
  end
  
  page_action :create, method: :post do
    date = params[:date]
    cours = params[:cours]
    count = params[:count].to_i
    
    created_count = 0
    
    if cours.present? && count > 0
      # Vérifier si des réservations existent déjà pour ce cours à cette date
      existing_count = Reservation.where(date: date, cours: cours).count
      
      # Calculer combien de nouvelles réservations créer
      new_count = count - existing_count
      
      if new_count > 0
        new_count.times do
          reservation = Reservation.new(
            date: date,
            cours: cours,
            status: nil # créneau libre
          )
          
          if reservation.save
            created_count += 1
          end
        end
        
        message = "#{created_count} réservation(s) ont été créées pour le cours #{cours} du #{date}."
        if existing_count > 0
          message += " #{existing_count} réservation(s) existaient déjà pour ce cours à cette date."
        end
        
        redirect_to admin_reservations_path, notice: message
      else
        redirect_to admin_reservations_path, alert: "Il existe déjà #{existing_count} réservation(s) pour ce cours à cette date, ce qui est supérieur ou égal au nombre demandé (#{count})."
      end
    else
      redirect_to admin_bulkreservation_path, alert: "Veuillez sélectionner un cours et indiquer un nombre valide de réservations à créer."
    end
  end
end