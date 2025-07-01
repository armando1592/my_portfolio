// Carousel functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            const slidesContainer = document.querySelector('.carousel-slides');
            const slideWidth = slides[0].offsetWidth;
            
            // Ensure index is within bounds
            if (index >= totalSlides) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = totalSlides - 1;
            } else {
                currentSlideIndex = index;
            }
            
            // Move to the correct slide
            slidesContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlideIndex);
            });
        }

        function nextSlide() {
            showSlide(currentSlideIndex + 1);
        }

        function prevSlide() {
            showSlide(currentSlideIndex - 1);
        }

        function currentSlide(index) {
            showSlide(index - 1);
        }

        // Auto-advance carousel
        setInterval(nextSlide, 5000);

        // Handle window resize
        window.addEventListener('resize', () => {
            showSlide(currentSlideIndex);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(196, 69, 105, 0.95))';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
                header.style.backdropFilter = 'none';
            }
        });

        // Animate blog cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
