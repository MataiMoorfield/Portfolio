
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
