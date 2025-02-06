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

const gallery = document.getElementById('gallery');

window.addEventListener('scroll', function() {
  const galleryTop = gallery.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (galleryTop < windowHeight * 0.5) {
    gallery.classList.add('active');
  } else {
    gallery.classList.remove('active');
  }
});
