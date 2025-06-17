document.addEventListener('DOMContentLoaded', () => {
      const hireBtn = document.querySelector('.hire-btn');
      hireBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Thank you for your interest! I will get back to you soon.');
      });
    });
