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
              <h3 class="card-title" >${data.name}</h3>
              <p class="card-text">${data.price}€</p>
              <select id="lenses">${lenses}</select>
          </div>
      </div>
          `;

      document.getElementById("productList").insertAdjacentHTML('beforeend',innerHTML) ;

      console.log(data);
     
})

//Catch Erros 
.catch(function () {
  window.alert('oops something went wrong! Try again.');
});



//Add to Basket
function AddtoCart() {
  if (product == null) {
    return;
  }
  let basket = GetBasket();

  let indexInBasket = basket.findIndex((item) => item._id === productId);

  //index ==-1
  if (indexInBasket < 0) {
    // if not present in basket
    product.quantity = 1;

    basket.push(product);
  } // product already present modify quantity
  else {

    basket[indexInBasket].quantity += 1;
  }

  SaveBasket(basket);
  window.alert("The item will be added to your Cart.");
}