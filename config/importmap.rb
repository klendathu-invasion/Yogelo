# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "contact_form", to: "contact_form.js"
pin "calendar", to: "calendar.js"
pin "burger_menu", to: "burger_menu.js"
pin "faq", to: "faq.js"