class ReservationsController < ApplicationController
  protect_from_forgery except: [:create, :check_availability]
  
  def create
    @reservation = Reservation.new(reservation_params)
    
    # Par défaut, attribuer le nom de l'utilisateur comme statut
    @reservation.status = @reservation.name
    
    if @reservation.save
      render json: { 
        status: "success", 
        message: "Votre réservation a été confirmée!"
      }
    else
      render json: { 
        status: "error", 
        message: "Une erreur est survenue: #{@reservation.errors.full_messages.join(', ')}" 
      }, status: :unprocessable_entity
    end
  end

  def check_availability
    # Récupérer les paramètres
    date = params[:date]
    
    # Récupérer toutes les réservations pour cette date
    reservations = Reservation.where(date: date)
    
    # Organiser les données par cours
    availability = {}
    
    # Si aucune réservation n'existe pour cette date, renvoyer un tableau vide
    if reservations.empty?
      return render json: { availability: {} }
    end
    
    # Parcourir toutes les réservations pour cette date
    reservations.each do |reservation|
      # Vérifier si un cours est spécifié
      next if reservation.cours.blank?
      
      # Rechercher les détails du cours en base de données
      course = Course.find_by(name: reservation.cours)
      next unless course # Ignorer si le cours n'existe pas en base
      
      # Vérifier le statut de la réservation
      is_available = reservation.status.nil?
      
      # Ajouter les infos de disponibilité
      availability[reservation.cours] = {
      available: is_available,
      spots_available: is_available ? 1 : 0, # 1 place si disponible, 0 si occupé
      capacity: 1, # Chaque créneau est pour une personne
      course_time: course.start_time,
      duration: course.duration,
      description: course.description,
      reserved_by: reservation.status # nil ou le nom du client
      }
    end
    
    render json: { availability: availability }
  end
  
  
	def check_day_status
	  # Récupérer les paramètres
	  date = params[:date]
	  
	  # Récupérer toutes les réservations pour cette date
	  reservations = Reservation.where(date: date)
	  
	  # Déterminer s'il y a des cours ce jour-là
	  has_courses = reservations.any?
	  
	  # Déterminer s'il y a des cours disponibles
	  has_available = reservations.any? { |r| r.status.nil? }
	  
	  render json: { 
	    has_courses: has_courses,
	    has_available: has_available
	  }
	end
  private
  
  def reservation_params
    params.require(:reservation).permit(:date, :cours, :name, :email, :phone)
  end
  
end
