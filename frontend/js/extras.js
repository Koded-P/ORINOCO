


//Add to Cart Button 
var addToCart = document.getElementById("addToCart")
console.log("addToCart")
addToCart.addEventListener('click', function($event){
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

})


const images = document.getElementById("productImage");
const productImage = data.imageUrl;

const price = document.getElementById("productPrice");
const productPrice = data.price;

const name = document.getElementById("productName");
const productName = data.name;
