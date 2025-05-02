class HomeController < ApplicationController

	def index
	end
	def cours
	end
	def about
	end
	def contact
	end

 	def create_contact
		# Récupérer les paramètres du formulaire
		@name = params[:name]
		@email = params[:email]
		@phone = params[:phone]
		@subject = params[:subject]
		@message = params[:message]

		success = false # Supposons que l'envoi est toujours réussi pour l'exemple
		begin
			Contact.create!(nom: @name,
							email: @email,
							phone: @phone,
							sujet: @subject,
							message: @message)
			success = true
		rescue
		end

		respond_to do |format|
			format.json {
				if success
					render json: { 
						status: "success", 
						message: "Merci #{@name} ! Votre message a été envoyé avec succès."
					}
				else
					render json: { 
						status: "error", 
						message: "Une erreur est survenue lors de l'envoi du message."
					}, status: :unprocessable_entity
				end
			}
		end
	end

end
