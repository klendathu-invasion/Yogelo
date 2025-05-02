// Correction pour l'ouverture des questions FAQ
// Vous pouvez ajouter ce code à votre fichier calendar.js existant
// ou créer un nouveau fichier app/javascript/faq.js

document.addEventListener('DOMContentLoaded', function() {
  initializeFAQ();
});

document.addEventListener('turbo:load', function() {
  initializeFAQ();
});

document.addEventListener('turbo:render', function() {
  initializeFAQ();
});

function initializeFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length === 0) return; // Sortir si aucun élément n'est trouvé
  
  // Supprimer d'abord tous les anciens écouteurs d'événements
  // (en clonant et remplaçant les éléments)
  faqQuestions.forEach(question => {
    const parent = question.parentNode;
    const clone = question.cloneNode(true);
    parent.replaceChild(clone, question);
  });
  
  // Ajouter de nouveaux écouteurs d'événements
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
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
  
  // Vous pouvez ouvrir la première question par défaut
  // Décommentez ces lignes si vous le souhaitez
  /*
  const firstQuestion = document.querySelector('.faq-question');
  const firstAnswer = firstQuestion.nextElementSibling;
  if (firstQuestion && firstAnswer) {
    firstQuestion.classList.add('active');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }
  */
}