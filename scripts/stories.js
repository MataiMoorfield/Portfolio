function initSlideshow(container) {
  let slideIndex = 1;
  const slides = container.querySelectorAll(".mySlides");
  const dotsContainer = container.querySelector("div[style='text-align:center']");
  let dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

  showSlides(slideIndex);

  // Make plusSlides and currentSlide methods of the slideshow object.
  const slideshow = {
      plusSlides: function(n) {
          showSlides(slideIndex += n);
      },
      currentSlide: function(n) {
          showSlides(slideIndex = n);
      }
  };


  function showSlides(n) {
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      if (dots.length > 0) {
          for (let i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[slideIndex - 1].style.display = "block";
          dots[slideIndex - 1].className += " active";
      } else {
          slides[slideIndex - 1].style.display = "block";
      }
  }

  const prevButton = container.querySelector(".prev");
  const nextButton = container.querySelector(".next");

  if (prevButton) {
      prevButton.addEventListener("click", () => slideshow.plusSlides(-1)); // Call via slideshow object
  }
  if (nextButton) {
      nextButton.addEventListener("click", () => slideshow.plusSlides(1)); // Call via slideshow object
  }

  if (dots.length > 0) {
      dots.forEach((dot, index) => {
          dot.addEventListener("click", () => slideshow.currentSlide(index + 1)); // Call via slideshow object
      });
  }
  return slideshow; // Return the slideshow object if needed.
}

const slideshowContainers = document.querySelectorAll(".slideshow-container");
const slideshowInstances = [];

slideshowContainers.forEach(container => {
  const slideshow = initSlideshow(container); // Initialize and return the slideshow object.
  slideshowInstances.push(slideshow); // Store the slideshow object for later use if needed.
});