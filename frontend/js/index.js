+fetch("http://localhost:3000/api/cameras/")

.then(response => { return response.json() })

.then(data => {
  
    //list of productst HTML Block
    let listOfProducts = '';
    data.forEach(prod =>
        listOfProducts += `
      <div class='col-12 col-md-4 col-lg-3'>
        <div class="card">
          <img src=${prod.imageUrl} class="card-img-top">
          <div class="card-body"></div>
            <h3 class="card-title" ><a href="article.html?id=${prod._id}">${prod.name}</a></h3>
            <p class="card-text">${prod.price}€</p>
          </div>
      </div>
      `
    );

    document.getElementById('allproducts').innerHTML = listOfProducts;

})

.catch(function (error) {
  window.alert('The server is not available, try again later');
});


