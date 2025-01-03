// Smooth Scroll
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
const modalClose = modal.querySelector(".modal-close");

document.querySelectorAll(".gallery img:not(#Shop .column img)").forEach((img) => {
    img.addEventListener("click", function (event) {
        event.stopPropagation();
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
            modal.style.display = "none";
        },
        { once: true }
    );
});

modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.addEventListener(
        "transitionend",
        function () {
            modal.style.display = "none";
        },
        { once: true }
    );
});

document.addEventListener("DOMContentLoaded", () => {
    const shopColumns = document.querySelectorAll('#Shop .column');
    const dropdowns = document.querySelectorAll('.dropdown');

    shopColumns.forEach(column => {
        column.addEventListener('click', event => {
            const target = event.target.closest('[data-dropdown]');

            if (target) {
                const dropdownId = target.getAttribute('data-dropdown');

                dropdowns.forEach(dropdown => {
                    if (dropdown.id !== dropdownId && !dropdown.classList.contains('hidden')) {
                        toggleDropdown(dropdown.id);
                    }
                });
                toggleDropdown(dropdownId);
                scrollToElement(dropdownId);
            }
        });
    });

    function toggleDropdown(id) {
        const dropdown = document.getElementById(id);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            dropdown.classList.toggle('visible');
        }
    }

    function scrollToElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
