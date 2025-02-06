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

// Gallery fade in
document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gallery.classList.add("active"); // Add 'active' class when it appears
                observer.unobserve(gallery); // Stop observing after fade-in
            }
        });
    }, { threshold: 0.3 });

    observer.observe(gallery);
});

