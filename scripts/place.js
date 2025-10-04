
const yearEl = document.getElementById("currentYear");
const lastModEl = document.getElementById("lastModified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = `Last Modification: ${document.lastModified}`;

const tempC = 10;        
const windKmh = 5;       
const condition = "Partly Cloudy";

document.getElementById("tempValue").textContent = `${tempC} °C`;
document.getElementById("windValue").textContent = `${windKmh} km/h`;
document.getElementById("conditionValue").textContent = condition;

function calculateWindChill(tC, vKmh) {
    return 13.12 + (0.6215 * tC) - (11.37 * Math.pow(vKmh, 0.16)) + (0.3965 * tC * Math.pow(vKmh, 0.16));
}

const chillEl = document.getElementById("chillValue");
if (tempC <= 10 && windKmh > 4.8) {
    const chill = calculateWindChill(tempC, windKmh);
    chillEl.textContent = `${chill.toFixed(1)} °C`;
} else {
    chillEl.textContent = "N/A";
}
