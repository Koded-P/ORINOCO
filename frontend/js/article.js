const urlParam = new URLSearchParams(window.location.search);
let productId = urlParam.get("id");
let product = null;
  // FETCH API

fetch("http://localhost:3000/api/cameras/" + productId)
    .then((response) => {
        return response.json();
    })

.then((data) => {
  let lenses = "";

  //Loop for lenses
  for (const cameraSelect of data.lenses) {
    lenses += `<option>${cameraSelect}</option>`
  }
  
    //InnerHTML
      let innerHTML = `
      <div class='col'>
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

      document.getElementById("productList").insertAdjacentHTML('beforeend',innerHTML) ;
      document.getElementById("submitProductButton").addEventListener('click',()=>AddToCart(data))
      console.log(data);
     
})

//Catch Errors 
.catch(function () {
  window.alert('oops something went wrong! Try again.');
});

///ADD TO CART BLOCK
//constants for products information
const productImage = document.getElementsByClassName('card-img-top')[0];
const productDescription = document.getElementsByClassName('card-description');
const productName = document.getElementsByClassName('card-name');
const productPrice = document.getElementsByClassName('card-price');
const productLenses = document.getElementsByClassName('lenses');
//submit button
const submitButton = document.getElementById('submitProductButton');

function AddToCart(data){
  if(data == null){
    return;
  }
  let cart = GetBasket();
  let indexInBasket = GetBasket((data) => data._id === productId);

  if (indexInBasket <= 0) {
    // data is present in basket 
    data.quantity = 1;

    cart.push(data);
  } // data is present modify quantity
  else {
    cart[indexInBasket] += 1;
  }

  SaveBasket(cart);
  window.alert("Added Item to cart");

  // you need to check if the localstorage cart has value or not if have a value we need to push to this aarray if not we need to add the prouct 
  console.log(data)
  localStorage.setItem('cart',JSON.stringify(data))
}

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

  let basketFromStorage = localStorage.getItem("cart");

  for(let i = 0; i < basketFromStorage; i++){
    if (data == 1) {

      data.push(basketToSave)
    }  
  }
}




