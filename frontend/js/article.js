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

//Catch Errors 
.catch(function () {
  window.alert('oops something went wrong! Try again.');
});

//First you need to get access to to your AddtoCart button on HTML
//Add a function for AddtoCart
//Make Event Listener for addcart capture the values in name, price, lenses
//Also make your event listener do the localStorage to store values in local storage
//Call the get-item on next page to retrieve data
//Don't forget to parse and stringify the JSON object 

function addToCart(){
    //for the add to cart button 
    const submitButton = document.getElementById ("submitProductButton");
    //listen for click events to this button  
    submitProductButton.addEventListener("click", (event) => {
        event.preventDefault();

      //creating constant for lenses and recovery of value 
      const cameraSelect = document.getElementById("lenses");

      //creating object to add to the basket 

      let newProduct = {
        lenses: cameraSelect.value,
      };

      let productBasket = JSON.parse(localStorage.getItem("product"));

      if (productBasket < 1) {
        productBasket = [];
      }
      productBasket.push(newProduct);
      localStorage.setItem("product", JSON.stringify(productBasket));
    });
}
