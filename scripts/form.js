document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

const selectElement = document.querySelector("#product");
const placeholder = document.createElement("option");
placeholder.textContent = "Select a Product";
placeholder.disabled = true;
placeholder.selected = true;
selectElement.appendChild(placeholder);

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    selectElement.appendChild(option);
});

const ratingOutput = document.querySelector("#ratingValue");
document.querySelectorAll('input[name="rating"]').forEach(radio => {
    radio.addEventListener("change", () => {
        ratingOutput.textContent = `Rating: ${radio.value}/5`;
    });
});