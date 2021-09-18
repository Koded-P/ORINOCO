//retrieve from local storage 
let product = localStorage.getItem('product');

product = JSON.parse(product);
console.log(product);
if (product === null || product === []) {
    console.log('product invalid');
}
async function getProduct(id) {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/" + productId, { method: 'GET' })
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}
let products = []; //initialiser une variable
//console.log('avant', products);
//let i = 0;
//let ids = [];
products.forEach(id => {
        // console.log(++i, id);
        //if (ids.indexOf(id) === -1) {
        getProduct(id).then(product => {
                if (product !== undefined) {
                    products.push(product);
                    console.log(product);
                }
            })

    })
    //console.log('apres', products);
async function getProducts() {
    let data = await getProducts();
    let html = '';
    data.forEach(id => {
        let htmlSegment = `
            
                               <div class="container">
                               <div class="card">
                                <img src="${data.imageUrl}" alt="ours" class="img-thumbnail">
                                <div class="card-body">
                                <h2>${data.name} </h2>
                                <p class="price">${data.price/100}.00€</p>

                            </div>
                            </div>
                            
                            
                             `;

        html += htmlSegment;
    });

    let container = document.querySelector('container');
    container.innerHTML = html;
}