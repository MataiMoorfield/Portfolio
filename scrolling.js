// Smooth Scroll
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 300,
    speedAsDuration: true,
    easing: "easeInOutCubic",
    updateURL: false,
});

document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            event.preventDefault();
            setTimeout(() => {
                scroll.animateScroll(targetElement, null, {
                    callback: () => history.replaceState(null, null, " "),
                });
            }, 50);
        }
    });
});

// Ensure proper scrolling after page load
window.onload = function () {
    setTimeout(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetElement = document.getElementById(hash);
            if (targetElement) {
                scroll.animateScroll(targetElement);
            }
        }
    }, 100);
};

(function () {
    emailjs.init('puowg7Gpudrlu45UV');
    console.log("EmailJS initialized");
})();

const handleForm = async (e) => {
    e.preventDefault();
    console.log("Form submission started");

    const form = document.getElementById('contact-form');
    console.log("Form data:", new FormData(form));

    try {
        const response = await emailjs.sendForm('service_6m1t6ul', 'template_portfolio', form);
        console.log("Email sent successfully:", response);
        alert("Email sent! We'll be in touch soon!");
    } catch (error) {
        console.error("Email send failed:", error);
        alert("Failed to send email. We're working on it!");
    }
};