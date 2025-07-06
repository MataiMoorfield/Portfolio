        document.addEventListener("DOMContentLoaded", function() {
            const images = document.querySelectorAll('.hero-slider img');
            let currentImageIndex = 0;

            function changeImage() {
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].classList.add('active');
            }

            // Set the first image as active initially
            images[currentImageIndex].classList.add('active');

            // Change image every 5 seconds (adjust as needed)
            setInterval(changeImage, 7000);
        });