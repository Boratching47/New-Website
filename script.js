// Contact form submit animation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Message sent! I will get back to you soon.");
        contactForm.reset();
    });
}
