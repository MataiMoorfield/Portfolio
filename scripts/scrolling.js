var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 300,
    speedAsDuration: true,
    easing: "easeInOutCubic",
    updateURL: false,
});

document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
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

window.onload = function () {
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


const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})