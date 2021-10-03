const order = JSON.parse(localStorage.getItem("orderId")) || [];

// Order Confirmation Information
const informations = document.getElementById("contact");
informations.innerHTML += `
    <p class="fs-5">thanks for your order <span class="fw-bold">${order.orderId}</span>.</p>
    `;

    
