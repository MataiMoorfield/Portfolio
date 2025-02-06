(function () {
    emailjs.init('puowg7Gpudrlu45UV');
    console.log("EmailJS initialized");
})();

const handleForm = async (e) => {
    e.preventDefault();
    console.log("Form submission started");

    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    console.log("Form data:", formData);

    try {
        const response = await emailjs.sendForm('service_6m1t6ul', 'template_portfolio', form);
        console.log("Email sent successfully:", response);
        alert("Email sent! We'll be in touch soon!");
        form.reset();
    } catch (error) {
        console.error("Email send failed:", error);
        alert("Failed to send email. We're working on it!");
    }
};
