function initSlideshow(container) {
    let slideIndex = 1;
    const slides = container.querySelectorAll(".mySlides");
    const dotsContainer = container.querySelector("div[style='text-align:center']");
    let dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : []; // Handle cases where dots might not be present.
  
    showSlides(slideIndex);
  
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
  
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
  
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
  
    // Attach event listeners within the scope of each slideshow
    const prevButton = container.querySelector(".prev");
    const nextButton = container.querySelector(".next");
  
    if (prevButton) {
      prevButton.addEventListener("click", () => plusSlides(-1));
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => plusSlides(1));
    }
  
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.addEventListener("click", () => currentSlide(index + 1));
        });
    }
  
  
  }
  
  const slideshowContainers = document.querySelectorAll(".slideshow-container");
  slideshowContainers.forEach(initSlideshow);


  