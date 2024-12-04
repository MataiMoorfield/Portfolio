/*
-------------------------------------
-   Author: Matai Moorfield         -
-   Latest update: Dec 2024         -
-------------------------------------
*/

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 200,
    speedAsDuration: true,
    easing: "easeInOutCubic",
    updateURL: false,
});

document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        scroll.animateScroll(targetElement, null, {
            callback: () => {
                history.replaceState(null, null, " ");
            },
        });
    });
});

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = '<span class="modal-close">&times;</span><img class="modal-content" />';
document.body.appendChild(modal);

const modalContent = modal.querySelector(".modal-content");

document.querySelectorAll(".gallery img").forEach((img) => {
    img.addEventListener("click", function () {
        modalContent.src = this.src;
        modal.style.display = "flex";
    });
});

modal.addEventListener("click", () => (modal.style.display = "none"));
modal.querySelector(".modal-close").addEventListener("click", () => (modal.style.display = "none"));
document.querySelectorAll(".gallery img").forEach((img) => {
    img.addEventListener("click", function () {
        modalContent.src = this.src;
        modal.style.display = "flex";
        setTimeout(() => modal.classList.add("open"), 5);
    });
});

modal.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.addEventListener(
        "transitionend",
        function () {
            if (!modal.classList.contains("open")) {
                modal.style.display = "none";
            }
        },
        { once: true }
    );
});

modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.classList.remove("open");
    modal.addEventListener(
        "transitionend",
        function () {
            if (!modal.classList.contains("open")) {
                modal.style.display = "none";
            }
        },
        { once: true }
    );
});