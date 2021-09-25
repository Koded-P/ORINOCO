
const displayTable = document.querySelector('.display-table');
const tableTotal = document.querySelector('.total');

function getCart() {
    //if cart exist in the local storage return cart else return an empty array
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

function getCartTotal(){
    return localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : 0;
}

if (getCart().length > 0) {
    let cart = getCart()
    let listOfProducts = '';
    cart.forEach(cart =>
        listOfProducts += `
        <tr>
                
        <td> <img src=${cart.imageUrl} alt=""> ${cart.name}</td>
        <td>€${cart.price}</td>
        <td>${cart.number}</td>
        
        
        
        
      </tr>
      `
    );
    // displayTable.appendChild(listOfProducts)
   displayTable.insertAdjacentHTML('beforeend', listOfProducts); 
   displayTable.insertAdjacentHTML("afterend",`TOTAL:<td>€${getCartTotal()}</td>`)
}else{
    console.log('empty')
}





const form = document.getElementById('form')
const firstname = document.getElementById('name')
const surname = document.getElementById('surname')
const email = document.getElementById('email')
const address = document.getElementById('address')
const country = document.getElementById('country')
const post = document.getElementById('post')
const state = document.getElementById('state')



















// //retrieve from local storage 
// let product = localStorage.getItem('product');

// product = JSON.parse(product);
// console.log(product);
// if (product === null || product === []) {
//     console.log('product invalid');
// }
// async function getProduct(id) {
//     try {
//         let response = await fetch("http://localhost:3000/api/cameras/" + productId, { method: 'GET' })
//         return await response.json();

//     } catch (error) {
//         console.log(error);
//     }
// }
// let products = []; //initialiser une variable
// //console.log('avant', products);
// //let i = 0;
// //let ids = [];
// products.forEach(id => {
//         // console.log(++i, id);
//         //if (ids.indexOf(id) === -1) {
//         getProduct(id).then(product => {
//                 if (product !== undefined) {
//                     products.push(product);
//                     console.log(product);
//                 }
//             })

//     })
//     //console.log('apres', products);
// async function getProducts() {
//     let data = await getProducts();
//     let html = '';
//     data.forEach(id => {
//         let htmlSegment = `
            
//                                <div class="container">
//                                <div class="card">
//                                 <img src="${data.imageUrl}" alt="ours" class="img-thumbnail">
//                                 <div class="card-body">
//                                 <h2>${data.name} </h2>
//                                 <p class="price">${data.price/100}.00€</p>

//                             </div>
//                             </div>
                            
                            
//                              `;

//         html += htmlSegment;
//     });

//     let container = document.querySelector('container');
//     container.innerHTML = html;
// }
