
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


form.addEventListener('submit',()=>{
    
    let contact = {
        firstname:firstname.value,
        surname:surname.value,
        email:email.value,
        address:address.value,
        post:post.value,
        state:state.value,
        country:country.value
        
    }

    let products = [];
    for (listId of basket){
        products.push(listId.id);
    }
    
    //Post all information to local storage 
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({contact, products}),
    })
    .then((response) => response.json())
    .then((data) =>{
        localStorage.setItem('orderId', JSON.stringify(data));
        document.location.href ="orderConfirmation.html";
    })
    .catch((error))

    saveUser(contact, products)
})