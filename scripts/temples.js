const yearSpan = document.getElementById("year");
const lastModP = document.getElementById("lastModified");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModP) lastModP.textContent = `Last Modification: ${document.lastModified}`;


const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function setButtonLabel(isOpen) {
    if (!toggleBtn) return;
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.textContent = isOpen ? "✖" : "☰";
    toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

if (toggleBtn && nav) {
    setButtonLabel(false);
    toggleBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        setButtonLabel(isOpen);
    });

    nav.addEventListener("click", (e) => {
        if (e.target.matches("a") && nav.classList.contains("open")) {
            nav.classList.remove("open");
            setButtonLabel(false);
        }
    });
}

const navLinks = document.querySelectorAll('#primary-nav a[data-filter]');
const cards = document.querySelectorAll('.gallery figure');

function applyFilter(filter) {
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.filter === filter));

    cards.forEach(card => {
        const year = Number(card.dataset.year || 0);
        const size = (card.dataset.size || '').toLowerCase();

        let show = true;
        if (filter === 'old') show = year > 0 && year < 1970;
        else if (filter === 'new') show = year >= 2000;
        else if (filter === 'large') show = size === 'large';
        else if (filter === 'small') show = size === 'small';
        else show = true;

        card.classList.toggle('hidden', !show);
    });
}

navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = a.dataset.filter || 'home';
        applyFilter(filter);

        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            setButtonLabel(false);
        }
    });
});

applyFilter('home');