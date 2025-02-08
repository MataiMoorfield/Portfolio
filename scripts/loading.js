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

            if (image.complete) {
                checkImagesLoaded();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gallery.classList.add("active");
                observer.unobserve(about);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(about);
});

