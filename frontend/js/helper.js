function GetBasket() {
    let basketFromStorage = localStorage.getItem("cart");
    if (basketFromStorage === null) {
        return [];
    } else {
        return JSON.parse(basketFromStorage);
    }
}

function SaveBasket(basketToSave) {
    let basketAsString = JSON.stringify(basketToSave);
    localStorage.setItem("cart", basketAsString);
}
