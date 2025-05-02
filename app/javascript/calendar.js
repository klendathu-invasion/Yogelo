// app/javascript/calendar.js

document.addEventListener('DOMContentLoaded', function() {
  initCalendar();
  initReservationButtons();
});

// Réinitialiser après une navigation Turbo
document.addEventListener('turbo:load', function() {
  initCalendar();
  initReservationButtons();
});

// Données des cours (structure statique)
const coursesData = {
  'Hatha Yoga': {
    days: [3], // Mercredi (0 = dimanche, 1 = lundi, etc.)
    time: '12:00',
    duration: 75,
    capacity: 10
  },
  'Vinyasa Flow': {
    days: [0], // Dimanche
    time: '10:00',
    duration: 75,
    capacity: 10
  },
  'Yin Yoga': {
    days: [6], // Samedi
    time: '18:00',
    duration: 75,
    capacity: 10
  },
  'Yin Yang Yoga': {
    days: [2], // Mardi
    time: '19:00',
    duration: 90,
    capacity: 10
  }
};

function initCalendar() {
  const calendar = document.querySelector('.calendar-grid');
  const calendarTitle = document.querySelector('.calendar-title');
  const prevMonthBtn = document.querySelector('.prev-month');
  const nextMonthBtn = document.querySelector('.next-month');
  
  if (!calendar || !calendarTitle || !prevMonthBtn || !nextMonthBtn) return;
  
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  // Générer le calendrier initial
  generateCalendar(currentMonth, currentYear);
  
  // Navigation des mois
  prevMonthBtn.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });
  
  nextMonthBtn.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });
  
  // Générer le calendrier
function generateCalendar(month, year) {
  // Vider le calendrier
  calendar.innerHTML = '';
  
  // Définir le titre du mois
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  calendarTitle.textContent = `${monthNames[month]} ${year}`;
  
  // Ajouter les jours de la semaine
  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  daysOfWeek.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day-name');
    dayElement.textContent = day;
    calendar.appendChild(dayElement);
  });
  
  // Calculer le premier jour du mois
  const firstDay = new Date(year, month, 1).getDay();
  
  // Calculer le nombre de jours dans le mois
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Ajouter les jours vides avant le premier jour du mois
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day', 'inactive');
    calendar.appendChild(emptyDay);
  }
  
  // Pour chaque jour du mois, vérifier s'il y a des cours disponibles
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = i;
    
    const dateString = formatDate(new Date(year, month, i));
    
    // Vérifier si ce jour est dans le futur (passé = inactif)
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, i);
    
    if (checkDate < currentDate) {
      // Jour dans le passé, le rendre inactif
      dayElement.classList.add('inactive');
    } else {
      // Jour dans le futur ou aujourd'hui, vérifier les disponibilités
      dayElement.setAttribute('data-date', dateString);
      
      // Pour chaque jour, faire une requête AJAX pour vérifier les disponibilités
      // Note: Dans une vraie application, on pourrait optimiser cela avec un appel unique pour tout le mois
      fetch(`/reservation/check_day_status?date=${dateString}`)
        .then(response => response.json())
        .then(data => {
          if (data.has_courses) {
            if (data.has_available) {
              // Il y a des cours disponibles
              dayElement.classList.add('has-class');
            } else {
              // Tous les cours sont réservés
              dayElement.classList.add('has-class', 'fully-booked');
            }
            
            // Ajouter l'événement de clic
            dayElement.addEventListener('click', function() {
              // Supprimer la classe sélectionnée de tous les jours
              document.querySelectorAll('.day').forEach(day => {
                day.classList.remove('selected');
              });
              
              // Ajouter la classe sélectionnée à ce jour
              this.classList.add('selected');
              
              // Vérifier les disponibilités et afficher les cours disponibles
              checkAvailability(dateString);
            });
          } else {
            // Aucun cours ce jour-là
            dayElement.classList.add('no-class');
          }
        })
        .catch(error => {
          console.error('Erreur lors de la vérification du jour:', error);
        });
    }
    
    // Marquer le jour actuel
    const today = new Date();
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayElement.classList.add('today');
    }
    
    calendar.appendChild(dayElement);
  }
}

function checkAvailability(dateString) {
  const selectedDateInfo = document.querySelector('.selected-date-info');
  const availableClasses = document.querySelector('.available-classes');
  const classList = document.querySelector('.class-list');
  const bookingForm = document.querySelector('.booking-form');
  const calendarContainer = document.querySelector('.calendar-container'); // Ajoutez cette ligne
  
  // Afficher la date sélectionnée
  selectedDateInfo.innerHTML = `<p>Vérification des disponibilités...</p>`;
  
  // Masquer les sections jusqu'à ce que les données soient chargées
  availableClasses.classList.add('hidden');
  bookingForm.classList.add('hidden');
  
  // S'assurer que le calendrier reste visible
  calendarContainer.style.display = 'block'; // Ajoutez cette ligne
  
  // Faire une requête AJAX pour vérifier les disponibilités
  fetch(`/reservation/check_availability?date=${dateString}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur réseau: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      // Mettre à jour l'affichage avec la date sélectionnée
      selectedDateInfo.innerHTML = `<p>Cours le :</p><div class="date-display">${formatDisplayDate(dateString)}</div>`;
      
      // Vider la liste des cours
      classList.innerHTML = '';
      
      // Vérifier si des cours sont disponibles ce jour-là
      const availabilityData = data.availability;
      const courseKeys = Object.keys(availabilityData);
      
      if (courseKeys.length === 0) {
        // Aucun cours ce jour-là
        selectedDateInfo.innerHTML += `<p class="no-classes">Aucun cours disponible à cette date.</p>`;
        return;
      }
      
      // Afficher les cours disponibles
      let availableCoursesFound = false;
      
      courseKeys.forEach(course => {
        const courseData = availabilityData[course];
        
        // Créer l'élément de cours
        const courseElement = document.createElement('li');
        
        // Déterminer le statut à afficher
        const statusText = courseData.available ? 'Disponible' : `Réservé par ${courseData.reserved_by}`;
        const statusClass = courseData.available ? 'available' : 'reserved';
        
        courseElement.innerHTML = `
          <div class="class-info">
            <span class="class-time">${courseData.course_time} - ${calculateEndTime(courseData.course_time, courseData.duration)}</span>
            <span class="class-name">${course}</span>
            <span class="class-description">${courseData.description || ''}</span>
          </div>
          <span class="class-status ${statusClass}">${statusText}</span>
        `;
        
        // Ajouter l'attribut data
        courseElement.setAttribute('data-course', course);
        courseElement.setAttribute('data-date', dateString);
        
        // Désactiver si déjà réservé
        if (!courseData.available) {
          courseElement.classList.add('inactive');
        } else {
          availableCoursesFound = true;
          
          // Ajouter l'événement de clic
          courseElement.addEventListener('click', function() {
            // Supprimer la classe sélectionnée de tous les cours
            document.querySelectorAll('.class-list li').forEach(item => {
              item.classList.remove('selected');
            });
            
            // Ajouter la classe sélectionnée à ce cours
            this.classList.add('selected');
            
            // Remplir les champs cachés du formulaire
            document.getElementById('selected-date').value = dateString;
            document.getElementById('selected-class').value = course;
            
            // Afficher le formulaire de réservation
            bookingForm.classList.remove('hidden');
          });
        }
        
        classList.appendChild(courseElement);
      });
      
      // Afficher ou masquer la section des cours disponibles
      if (courseKeys.length > 0) {
        availableClasses.classList.remove('hidden');
      } else {
        availableClasses.classList.add('hidden');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      selectedDateInfo.innerHTML = `<p>Erreur lors de la vérification des disponibilités.</p>`;
    });
}
  
  // Initialiser le formulaire de réservation
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Récupérer les données du formulaire
      const selectedDate = document.getElementById('selected-date').value;
      const selectedClass = document.getElementById('selected-class').value;
      const name = document.getElementById('booking-name').value;
      const email = document.getElementById('booking-email').value;
      const phone = document.getElementById('booking-phone').value;
      
      // Désactiver le bouton pendant la soumission
      const submitButton = bookingForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Réservation en cours...';
      
      // Préparer les données pour l'envoi
      const formData = {
        reservation: {
          date: selectedDate,
          cours: selectedClass,
          name: name,
          email: email,
          phone: phone
        }
      };
      
      // Envoyer la requête AJAX
      fetch('/reservation/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Réinitialiser le formulaire
        bookingForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmer la réservation';
        
        // Masquer le formulaire
        bookingForm.classList.add('hidden');
        
        // Afficher un message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'booking-success';
        successMessage.innerHTML = `
          <div class="success-icon">✓</div>
          <h4>Réservation confirmée !</h4>
          <p>Votre place pour le cours de ${selectedClass} le ${formatDisplayDate(selectedDate)} a été réservée.</p>
          <p>Un email de confirmation sera envoyé à ${email}.</p>
        `;
        
        // Ajouter le message au conteneur
        const calendarDetails = document.querySelector('.calendar-details');
        calendarDetails.appendChild(successMessage);
        
        // Rafraîchir les disponibilités
        const selectedDay = document.querySelector('.day.selected');
        if (selectedDay) {
          const dateString = selectedDay.getAttribute('data-date');
          const dayOfWeek = new Date(dateString).getDay();
          checkAvailability(dateString, dayOfWeek);
        }
        
        // Supprimer le message après quelques secondes
        setTimeout(function() {
          successMessage.classList.add('fade-out');
          setTimeout(function() {
            successMessage.remove();
          }, 500);
        }, 5000);
      })
      .catch(error => {
        console.error('Erreur:', error);
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmer la réservation';
        
        // Afficher un message d'erreur
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error-message';
        errorMessage.textContent = 'Une erreur est survenue lors de la réservation. Veuillez réessayer.';
        bookingForm.appendChild(errorMessage);
        
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
      });
    });
  }
}

// Initialiser les boutons de réservation dans les cartes de cours
function initReservationButtons() {
  const reserveButtons = document.querySelectorAll('.btn--reserve');
  
  reserveButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const courseName = this.getAttribute('data-cours');
      
      // Naviguer vers la section de réservation
      window.location.href = '#reservation';
      
      // Trouver le prochain jour disponible pour ce cours
      findNextAvailableDate(courseName);
    });
  });
}

// Rechercher le prochain jour disponible pour un cours
function findNextAvailableDate(courseName) {
  if (!coursesData[courseName]) return;
  
  const courseData = coursesData[courseName];
  const today = new Date();
  
  // Trouver le prochain jour de la semaine où ce cours est donné
  let nextDay = new Date(today);
  let found = false;
  let attempts = 0;
  
  // Limiter à 14 tentatives (2 semaines)
  while (!found && attempts < 14) {
    const dayOfWeek = nextDay.getDay();
    
    if (courseData.days.includes(dayOfWeek)) {
      found = true;
    } else {
      nextDay.setDate(nextDay.getDate() + 1);
      attempts++;
    }
  }
  
  if (found) {
    const dateString = formatDate(nextDay);
    
    // Simuler un clic sur ce jour dans le calendrier
    setTimeout(function() {
      const dayElement = document.querySelector(`.day[data-date="${dateString}"]`);
      if (dayElement) {
        dayElement.click();
        
        // Attendre que les cours soient chargés
        setTimeout(function() {
          const courseElement = document.querySelector(`.class-list li[data-course="${courseName}"]:not(.inactive)`);
          if (courseElement) {
            courseElement.click();
          }
        }, 500);
      }
    }, 100);
  }
}

// Initialiser la FAQ
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    // Supprimer les anciens écouteurs (cloné et remplace)
    const newQuestion = question.cloneNode(true);
    question.parentNode.replaceChild(newQuestion, question);
    
    newQuestion.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      // Fermer toutes les réponses
      document.querySelectorAll('.faq-answer').forEach(item => {
        item.style.maxHeight = null;
      });
      
      document.querySelectorAll('.faq-question').forEach(item => {
        item.classList.remove('active');
      });
      
      // Ouvrir/fermer cette réponse
      if (!isActive) {
        this.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// Fonctions utilitaires
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

function calculateEndTime(startTime, durationMinutes) {
  if (!startTime) return '';
  
  const [hours, minutes] = startTime.split(':').map(Number);
  
  let endHours = hours + Math.floor((minutes + durationMinutes) / 60);
  let endMinutes = (minutes + durationMinutes) % 60;
  
  // Format
  endHours = String(endHours).padStart(2, '0');
  endMinutes = String(endMinutes).padStart(2, '0');
  
  return `${endHours}:${endMinutes}`;
}