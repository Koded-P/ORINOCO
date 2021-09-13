function fetchBasket() {
    document.getElementById("cartItems").innerHTML = "";
    let totalBasket = 0;

    let basket = getBasket();
    for (const product of basket) {
        totalBasket = totalBasket + product.quantity * product.price;


        //Generate HTML Block
        let htmlBlock = `
        <h3 class="card-title">${product.name}</>
        <p class="card-text">${product.quantity}</p>
        <p class= "card-text">${product.price}</p>`;

        document.getElementById("cartItems").innerHTML += htmlBlock;
        
    }
}