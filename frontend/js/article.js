const urlParam = new URLSearchParams(window.location.search);
let productId = urlParam.get('id');
let product = null;
// FETCH API

fetch('http://localhost:3000/api/cameras/' + productId)
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        let lenses = '';

        //Loop for lenses
        for (const cameraSelect of data.lenses) {
            lenses += `<option>${cameraSelect}</option>`;
        }

        //InnerHTML
        let innerHTML = `
      <div class='col products-center'>
        <div class="card">
          <img src=${data.imageUrl} class="card-img-top">
          <div class="card-body"></div>
              <h3 class="card-description">${data.description}</h3>
              <h3 class="card-name" >${data.name}</h3>
              <p class="card-price">${data.price}€</p>
              <select id="lenses">${lenses}</select>

          </div>
        </div>
        <button type="button" id="submitProductButton" >Add To Cart</button>
      </div>
          `;

        document.getElementById('productList').insertAdjacentHTML('beforeend', innerHTML);
        document
            .getElementById('submitProductButton')
            .addEventListener('click', () => addToCart(data));
        console.log(data);
        Storage.saveProduct(data);
    })

    //Catch Errors
    .catch(function () {
        window.alert('oops something went wrong! Try again.');
    });

// cart btn in index.html
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDom = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDom = document.querySelector('.products-center');

let cart = []; //initial state of the cart

//localstorage
class Storage {
    //saving the only product loaded to the local storage 
    static saveProduct(product) {
        localStorage.setItem('product', JSON.stringify(product));
    }
    //save the cart to local storage 
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    //save total amount to local storage 
    static saveTotal(total){
        localStorage.setItem('cartTotal',total)
    }

    static getCart() {
        //if cart exist in the local storage return cart else return an empty array
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

function addToCart(data) {
    //check if item you want to add is already in cart array using the ID. Check to see if the ID matches any product in the cart
    let inCart = cart.find((item) => item._id === data._id);
    const submitBtn = document.getElementById('submitProductButton');//access the submit button
    // console.log(submitBtn)

    if (inCart) {//if the product exist in cart 
        submitBtn.innerText = 'Item Already in Cart';
        submitBtn.disabled = true;//disable the button so user cant readd it 
    } else {
        //get product from localstorage
        //get all properties and values from data and add a new property called number and set value to 1
        let cartItem = { ...data, number: 1 };


        cart = [...cart, cartItem];
      
        //save cart to local storage
        Storage.saveCart(cart);
        //setCart Values
        setCartValues(cart);
        //display cart items
        addCartItem(cartItem);
        //show cart
        // showCart()
    }
}
//
function setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
        tempTotal += item.price * item.number;
        itemsTotal += item.number;
        
    });
    
    cartTotal.innerText = parseFloat(tempTotal);
    cartItems.innerText = itemsTotal;
    Storage.saveTotal(parseFloat(tempTotal))
}

function addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = ` <img src=${item.imageUrl} alt="">
  <div>
    <h4>${item.name}</h4>
    <h5>€${item.price}</h5>
    <span class="remove-item" data-id=${item._id}>remove</span>
  </div>
  <div>
    <i class="fas fa-chevron-up"  data-id=${item._id}></i>
    <p class="item-amount">${item.number}</p>
    <i class="fas fa-chevron-down"  data-id=${item._id}></i>
  </div>`;

    cartContent.appendChild(div);
}

function showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDom.classList.add('showCart');
}
function loadCart() {

    cart = Storage.getCart();
    setCartValues(cart);
    populateCart(cart);
    cartBtn.addEventListener('click', () => {
        showCart();
    });
    closeCartBtn.addEventListener('click', () => {
        hideCart();
    });
}

function hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDom.classList.remove('showCart');
}

function populateCart(cart) {
    cart.forEach((item) => addCartItem(item));
}

function remmoveItem(id) {
    cart = cart.filter((item) => item._id !== id);
    setCartValues(cart);
    Storage.saveCart(cart);
}

function cartLogic() {
    clearCartBtn.addEventListener('click', () => {
        clearCart();
    });
    cartContent.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            let removeItem = event.target;
            let id = removeItem.dataset.id;
            cartContent.removeChild(removeItem.parentElement.parentElement);
            remmoveItem(id);
        } else if (event.target.classList.contains('fa-chevron-up')) {
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find((item) => item._id === id);
            tempItem.number = tempItem.number + 1;
            Storage.saveCart(cart);
            setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.number;
        } else if (event.target.classList.contains('fa-chevron-down')) {
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find((item) => item._id === id);
            tempItem.number = tempItem.number - 1;
            if (tempItem.number > 0) {
                Storage.saveCart(cart);
                setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.number;
            } else {
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                remmoveItem(id);
            }
        }
    });

    function clearCart() {
        let cartItems = cart.map((item) => item._id);
        cartItems.forEach((id) => remmoveItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        hideCart();
    }
}
//when the DOM is loaded completely
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    cartLogic();
});
