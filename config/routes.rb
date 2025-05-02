Rails.application.routes.draw do
  root :to => "home#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get '/', to: "home#index"
  get '/cours', to: "home#cours"
  get '/a-propos', to: "home#about"
  get '/contact', to: "home#contact"
  post '/contact/create', to: "home#create_contact"
  post '/reservation/create', to: "reservations#create"
  get '/reservation/check_availability', to: "reservations#check_availability"
  get '/reservation/check_day_status', to: 'reservations#check_day_status'
end
