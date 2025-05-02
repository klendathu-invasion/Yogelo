// app/javascript/contact_form.js
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// Réinitialiser le formulaire après une navigation Turbo
document.addEventListener('turbo:load', function() {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    // Supprimer les anciens gestionnaires d'événements
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validation simple du formulaire
      let isValid = true;
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const phoneField = document.getElementById('phone');
      const subjectField = document.getElementById('subject');
      const messageField = document.getElementById('message');
      const policyCheckbox = document.getElementById('policy');
      
      // Réinitialiser les messages d'erreur
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
        el.classList.remove('input-error');
      });
      
      // Vérifier le nom
      if (!nameField.value.trim()) {
        addErrorMessage(nameField, 'Veuillez entrer votre nom');
        isValid = false;
      }
      
      // Vérifier l'email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailPattern.test(emailField.value)) {
        addErrorMessage(emailField, 'Veuillez entrer un email valide');
        isValid = false;
      }
      
      // Vérifier le message
      if (!messageField.value.trim()) {
        addErrorMessage(messageField, 'Veuillez entrer votre message');
        isValid = false;
      }
      
      // Vérifier la politique
      if (!policyCheckbox.checked) {
        addErrorMessage(policyCheckbox, 'Vous devez accepter la politique de confidentialité');
        isValid = false;
      }
      
      if (isValid) {
        // Préparer les données à envoyer
        const formData = {
          name: nameField.value.trim(),
          email: emailField.value.trim(),
          phone: phoneField.value.trim(),
          subject: subjectField.value,
          message: messageField.value.trim()
        };
        
        sendContactForm(formData, newForm);
      }
    });
  }
}

function sendContactForm(formData, form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  submitButton.disabled = true;
  submitButton.textContent = 'Envoi en cours...';
  
  // Créer le token CSRF pour Rails
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  // Envoyer la requête AJAX
  fetch('/contact/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
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
    // Succès
    submitButton.textContent = 'Envoyé !';
    submitButton.classList.add('btn--success');
    
    // Afficher un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.textContent = data.message || 'Votre message a été envoyé avec succès ! Je vous recontacterai très bientôt.';
    form.appendChild(successMessage);
    
    // Réinitialiser le formulaire après un délai
    setTimeout(function() {
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      submitButton.classList.remove('btn--success');
      
      // Supprimer le message de succès avec une animation
      successMessage.style.opacity = '0';
      setTimeout(() => successMessage.remove(), 300);
    }, 3000);
  })
  .catch(error => {
    console.error('Erreur:', error);
    
    // Afficher un message d'erreur
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.textContent = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.';
    form.appendChild(errorMessage);
    
    setTimeout(() => {
      errorMessage.style.opacity = '0';
      setTimeout(() => errorMessage.remove(), 300);
    }, 4000);
  });
}

function addErrorMessage(element, message) {
  element.classList.add('input-error');
  
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  // Placer le message d'erreur après l'élément
  element.parentNode.insertBefore(errorElement, element.nextSibling);
}


