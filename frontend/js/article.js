const urlParam = new URLSearchParams(window.location.search);
let productId = urlParam.get("id");
let product = null;

fetch("http://localhost:3000/api/cameras/" + productId)
    .then((response) => {
        return response.json();
    })

.then((data) => {
    console.log(data);
    product = data;
    
      let container = document.querySelector('#productList');

      //HTML container
  
      let innerHTML = `
      <div class='col'>
          <div class="card">
          <img src=${data.imageUrl} class="card-img-top">
          <div class="card-body"></div>
              <h3 class="card-title" >${data.name}</h3>
              <p class="card-text">${data.price}€</p>
              <select class="lenses">${data.lenses}</select>
          </div>
      </div>
          `;
  
      document.getElementById("productList").insertAdjacentHTML('beforeend',innerHTML) ;
      console.log(container);
})


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

  //index ==-1 signifie non trouvé
  if (indexInBasket < 0) {
    // si non présent dans le panier
    product.quantity = 1;

    basket.push(product);
  } // produit déja présent, modifier quantité
  else {

    basket[indexInBasket].quantity += 1;
  }

  SaveBasket(basket);
  window.alert("Votre article a été ajouté au panier.");
}