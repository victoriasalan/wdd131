const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg",
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
    },
    {
        templeName: "San Diego California",
        location: "San Diego, California, United States",
        dedicated: "1993, April, 25",
        area: 72000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg",
    },
];


const cardsContainer = document.getElementById("temple-cards");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll("#primary-nav a[data-filter]");

const getYear = (t) => Number(String(t.dedicated).split(",")[0]);


function buildCard(t) {
    const article = document.createElement("article");
    article.className = "card";

    const h3 = document.createElement("h3");
    h3.textContent = t.templeName;

    const loc = document.createElement("p");
    loc.className = "meta";
    loc.innerHTML = `<span class="label">Location:</span> ${t.location}`;

    const ded = document.createElement("p");
    ded.className = "meta";
    ded.innerHTML = `<span class="label">Dedicated:</span> ${t.dedicated}`;

    const size = document.createElement("p");
    size.className = "meta";
    size.innerHTML = `<span class="label">Size:</span> ${t.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.loading = "lazy"; 
    img.src = t.imageUrl;
    img.alt = `${t.templeName} Temple`;

    article.append(h3, loc, ded, size, img);
    return article;
}

function render(list) {
    cardsContainer.innerHTML = "";
    list.forEach(t => cardsContainer.append(buildCard(t)));
}

function applyFilter(filter) {
    navLinks.forEach(a => a.classList.toggle("active", a.dataset.filter === filter));

    let out = temples.slice();
    if (filter === "old") out = temples.filter(t => getYear(t) < 1999);
    else if (filter === "new") out = temples.filter(t => getYear(t) > 2000);
    else if (filter === "large") out = temples.filter(t => t.area > 90000);
    else if (filter === "small") out = temples.filter(t => t.area < 10000);

    render(out);
}

navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        const f = a.dataset.filter || "home";
        applyFilter(f);

        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            setButtonLabel(false);
        }
    });
});

const yearSpan = document.getElementById("year");
const lastModP = document.getElementById("lastModified");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModP) lastModP.textContent = `Last Modification: ${document.lastModified}`;

const toggleBtn = document.querySelector(".menu-toggle");
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
}
applyFilter("home");