// app/javascript/calendar_responsive.js
document.addEventListener('DOMContentLoaded', function() {
  initCalendarResponsive();
});

// Reinitialize after Turbo navigation
document.addEventListener('turbo:load', function() {
  initCalendarResponsive();
});

document.addEventListener('turbo:render', function() {
  initCalendarResponsive();
});

function initCalendarResponsive() {
  // Check if we're on the calendar page
  const calendarGrid = document.querySelector('.weekly-calendar__grid');
  if (!calendarGrid) return;
  
  // Function to adjust the calendar layout
  function adjustCalendar() {
    const isMobile = window.innerWidth < 768; // Match your media query breakpoint
    const dayColumns = document.querySelectorAll('.day-column');
    
    // For mobile: ensure day columns are displayed one per row
    if (isMobile) {
      dayColumns.forEach(column => {
        column.style.width = '100%';
      });
    } else {
      // For desktop: ensure day columns are displayed side by side
      const width = `${100 / dayColumns.length}%`;
      dayColumns.forEach(column => {
        column.style.width = width;
      });
    }
    
    // Equalize heights in desktop view
    if (!isMobile) {
      let maxHeight = 0;
      dayColumns.forEach(column => {
        column.style.height = 'auto'; // Reset height
        const height = column.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });
      
      // Apply the max height to all columns
      dayColumns.forEach(column => {
        column.style.height = `${maxHeight}px`;
      });
    } else {
      // Reset heights in mobile view
      dayColumns.forEach(column => {
        column.style.height = 'auto';
      });
    }
  }
  
  // Run on initial load
  adjustCalendar();
  
  // Run on window resize
  window.addEventListener('resize', adjustCalendar);
}