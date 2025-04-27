const header = document.getElementById("header");

// Sticky navbar
window.onscroll = () => {
    header.classList.toggle("navbar-sticky", window.scrollY > 80);
};

const scrollContainer = document.getElementById("scrollContainer");
const cards = scrollContainer.children;
const pagination = document.getElementById("pagination");

let isDown = false;
let startX;
let scrollLeft;

// Handle Dragging
scrollContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    scrollContainer.classList.add("cursor-grabbing");
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("mouseleave", () => {
    isDown = false;
    scrollContainer.classList.remove("cursor-grabbing");
});

scrollContainer.addEventListener("mouseup", () => {
    isDown = false;
    scrollContainer.classList.remove("cursor-grabbing");
});

scrollContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
});

// Create bullets dynamically
for (let i = 0; i < cards.length; i++) {
    const bullet = document.createElement("div");
    bullet.className = "w-2 h-2 rounded-full bg-primary transition-all";
    pagination.appendChild(bullet);
}

const bullets = pagination.children;

function updateActiveBullet() {
    const slideWidth = cards[0].offsetWidth + 24; // card width + gap
    const index = Math.round(scrollContainer.scrollLeft / slideWidth);

    for (let i = 0; i < bullets.length; i++) {
        if (i === index) {
            bullets[i].classList.add("bg-primary", "scale-125");
            bullets[i].classList.remove("bg-[#FFF9EA]");
        } else {
            bullets[i].classList.add("bg-[#FFF9EA]");
            bullets[i].classList.remove("bg-primary", "scale-125");
        }
    }
}

Array.from(bullets).forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        const slideWidth = scrollContainer.children[0].offsetWidth + 24; // Tambah gap (24px) kalau ada
        scrollContainer.scrollTo({
            left: index * slideWidth,
            behavior: "smooth",
        });

        // Optional: kasih aktif class ke bullet yang dipilih
        Array.from(bullets).forEach((b) => b.classList.remove("active"));
        bullet.classList.add("active");
    });

    bullet.classList.add("cursor-pointer");
});

// Update bullet when scroll
scrollContainer.addEventListener("scroll", updateActiveBullet);

// Update bullet on load
updateActiveBullet();
