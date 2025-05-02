# app/admin/dashboard.rb
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Réservations à venir" do
          table_for Reservation.where('date >= ?', Date.today).where.not(status: nil).order(date: :asc).limit(10) do
            column("Date") { |r| l r.date, format: :long }
            column("Cours") { |r| r.cours }
            column("Client") { |r| r.name }
            column("Email") { |r| r.email }
            column("Actions") { |r| link_to "Voir", admin_reservation_path(r) }
          end
        end
      end

      column do
        panel "Créneaux disponibles" do
          table_for Reservation.where('date >= ?', Date.today).where(status: nil).order(date: :asc).limit(10) do
            column("Date") { |r| l r.date, format: :long }
            column("Cours") { |r| r.cours }
            column("Actions") { |r| link_to "Voir", admin_reservation_path(r) }
          end
        end
      end
    end

    columns do
      column do
        panel "Statistiques" do
          div do
            render 'admin/dashboard_stats'
          end
        end
      end
    end
  end
end