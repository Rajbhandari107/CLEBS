const apiURL = 'http://127.0.0.1:5000/api/contact';

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('show');
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return false;
            }

            try {
                const response = await fetch(apiURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, phone, message }),
                });

                if (response.ok) {
                    alert('Thank you for contacting us, ' + name + '! We will reach you at ' + phone + '.');
                    form.reset();
                } else {
                    const data = await response.json();
                    alert('Error: ' + (data.message || 'Failed to send message.'));
                }
            } catch (error) {
                alert('Error: Could not send message. Please try again later.');
            }
            return false;
        });
    }

    // Slideshow for hero banner
    const slides = document.querySelectorAll('.slideshow-container img.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer = setInterval(showNextSlide, slideInterval);

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPrevSlide() {
        showSlide(currentSlide - 1);
    }

    const leftBtn = document.querySelector('.slide-btn.left-btn');
    const rightBtn = document.querySelector('.slide-btn.right-btn');

    if (leftBtn) {
        leftBtn.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
            showPrevSlide();
        });
        leftBtn.addEventListener('mouseleave', () => {
            slideTimer = setInterval(showNextSlide, slideInterval);
        });
        leftBtn.addEventListener('click', () => {
            clearInterval(slideTimer);
            showPrevSlide();
            slideTimer = setInterval(showNextSlide, slideInterval);
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
            showNextSlide();
        });
        rightBtn.addEventListener('mouseleave', () => {
            slideTimer = setInterval(showNextSlide, slideInterval);
        });
        rightBtn.addEventListener('click', () => {
            clearInterval(slideTimer);
            showNextSlide();
            slideTimer = setInterval(showNextSlide, slideInterval);
        });
    }

    // Read More / Read Less toggle functionality for statements
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textContent = button.previousElementSibling;
            if (textContent.classList.contains('expanded')) {
                textContent.classList.remove('expanded');
                button.textContent = 'READ MORE';
            } else {
                textContent.classList.add('expanded');
                button.textContent = 'READ LESS';
            }
        });
    });
});
