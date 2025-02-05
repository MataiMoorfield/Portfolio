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

// Modal Image Viewer
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = '<span class="modal-close">×</span><img class="modal-content">';
document.body.appendChild(modal);

const modalContent = modal.querySelector(".modal-content");
const modalClose = modal.querySelector(".modal-close");

document.querySelectorAll(".gallery img").forEach((img) => {
    img.addEventListener("click", function (event) {
        event.stopPropagation();
        modalContent.src = this.src;
        modal.style.display = "flex";
        requestAnimationFrame(() => modal.classList.add("open"));
    });
});

function closeModal() {
    modal.classList.remove("open");
    modal.addEventListener(
        "transitionend",
        () => (modal.style.display = "none"), {
        once: true
    }
    );
}

modal.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

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
        alert('Email sent!');
    } catch (error) {
        console.error("Email send failed:", error);
        alert('Failed to send email');
    }
};

// Loading
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    function checkImagesLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            const loadingScreen = document.getElementById('loading-screen');
            const content = document.getElementById('content');

            loadingScreen.style.transition = 'opacity 1s ease';
            loadingScreen.style.opacity = '0';

            setTimeout(function() {
                loadingScreen.style.display = 'none';
                content.style.display = 'block';
                content.style.opacity = '1';
                content.style.transition = 'opacity 1s ease';
            }, 1000);
        }
    }

    if (images.length === 0) {
        checkImagesLoaded();
    } else {
        images.forEach(function(image) {
            image.addEventListener('load', checkImagesLoaded);

            // Check if image is already loaded (in case it comes from cache)
            if (image.complete) {
                checkImagesLoaded();
            }
        });
    }
});

// bot 
function onSubmit(token) {
    document.getElementById("demo-form").submit();
  }