// Smooth Scroll
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 300,
    speedAsDuration: true,
    easing: "easeInOutCubic",
    updateURL: false,
});

document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", function(event) {
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
    img.addEventListener("click", function(event) {
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
window.onload = function() {
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