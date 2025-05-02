
// app/javascript/jquery_burger_menu.js
function initBurgerMenu() {
  // Détacher d'abord les gestionnaires d'événements existants pour éviter les doublons
  $('.nav__toggle').off('click');
  
  // Toggle mobile menu
  $('.nav__toggle').on('click', function() {
    if ($('.nav__menu').hasClass('nav__menu--open')) {
      // Close menu
      $('.nav__menu').addClass('nav__menu--closing');
      setTimeout(function() {
        $('.nav__menu').removeClass('nav__menu--open nav__menu--closing');
      }, 300);
      $('.nav__toggle').attr('aria-expanded', 'false');
      $('.nav__toggle-bar').removeClass('nav__toggle-bar--active');
      $('body').removeClass('menu-open');
    } else {
      // Open menu
      $('.nav__menu').addClass('nav__menu--open');
      $('.nav__toggle').attr('aria-expanded', 'true');
      $('.nav__toggle-bar').addClass('nav__toggle-bar--active');
      $('body').addClass('menu-open');
    }
  });
  
  // Close menu when clicking outside
  $(document).off('click.navOutside');
  $(document).on('click.navOutside', function(event) {
    if ($('.nav__menu').hasClass('nav__menu--open') && 
        !$(event.target).closest('.nav').length) {
      $('.nav__toggle').trigger('click');
    }
  });
  
  // Close menu on window resize
  $(window).off('resize.navResize');
  $(window).on('resize.navResize', function() {
    if (window.innerWidth > 768 && $('.nav__menu').hasClass('nav__menu--open')) {
      $('.nav__menu').removeClass('nav__menu--open nav__menu--closing');
      $('.nav__toggle-bar').removeClass('nav__toggle-bar--active');
      $('body').removeClass('menu-open');
    }
  });
}

// Initialiser avec jQuery
$(document).ready(initBurgerMenu);

// Initialiser après chaque navigation Turbo
$(document).on('turbo:load', initBurgerMenu);
$(document).on('turbo:render', initBurgerMenu);