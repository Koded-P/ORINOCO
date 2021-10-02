const order = JSON.parse(localStorage.getItem("order_id")) || [];

// affiche Mes informations
const informations = document.getElementById("contact");
informations.innerHTML += `
    <p class="fs-5">thanks for your order <span class="fw-bold">${order.orderId}</span>.</p>
    `;
