function productList (){
    const request = XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readystate == XMLHttpRequest.DONE && this.status == 200) {
            const response = JSON.parse(this.responseText);
        }
    }
    request.open('GET', "http://localhost:3000/api/cameras");
    request.send();
}

productList();

function getParameter (queryString){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(queryString);
}

function productList () {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            const response = JSON.parse(this.responseText);

            let body = document.querySelector("body");

            let productList = document.createElement("div");
            productList.className = "container";
            body.appendChild(productList);
        }
    }
    request.open("GET", "http://localhost:3000/api/cameras/");
    request.send();
}

productList();

//API URL 
const api = "https://localhost:3000/api/cameras/";

function makeRequest(verb, url, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(verb, url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201) {
                    resolve(JSON.parse(requests))
                }
            }
        }
    request.open("GET", "api" + id);
    request.send();
    });
}

async function renderProducts(id) {

    try {

        let response = await fetch(`http://localhost:3000/api/cameras/${id}`, { method: 'GET' })

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

function productList(Product) {
    //Selection de la class ou on vas injecter le code HTML

    let body = document.querySelector("body");
    //la structure
    const results = ` 
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-7">
                <img src="images/vcam_1.jpg" alt="vcam one" class="card-img-top">
            </div>
            <div class="col">
                <h3 class="card-title">Zurss 50S</h3>
                <div class="card-text">
                <p><strong>€</strong>49900</p>
                <p class="text-justify">"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".</p>
            </div>
            <form>
              <div class="form-group">
                <label for ="qty">Qty:</label>
                <input type="text" class="form-control" placeholder="1" id="qty">
              </div>
              <button type="submit" class="btn btn-primary">Add to Cart</button>
            </form>
        </div>`

    results.innerHTML = results;

}

//AJOUT DU PRODUIT au panier
function addItem(id) {
    let panier = localStorage.getItem('panier'); //recuperer
    panier = JSON.parse(panier) // PARSE LE JSON
        //si le panier n' existe pas
    if (panier === null) {
        panier = []
    }
    panier.push(id)
    panier = JSON.stringify(panier) //RETRANSFORME EN JSON
    localStorage.setItem('panier', panier); //STOCKER
    console.log(panier);

}

renderProducts(id)
    .then(Product => {
        console.log(Product);
        //display produit
        renderContainer(Product)
            //selectionner l'element par click
        const buttonElement = document.getElementById('btn-envoyer');
        console.log('btn-envoyer');
        buttonElement.addEventListener('click', function(event) {
            addItem(id)

        })
});


