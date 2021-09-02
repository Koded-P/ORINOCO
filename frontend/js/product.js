//API Link
const api = "https://localhost:3000/api/cameras/";
console.log(api);


//GET API + ID request
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
    request.open("GET", "api" + "5be1ed3f1c9d44000030b061");
    request.send();
    });
}

//Extracting URL ID Value
function getParameter(parameterName){
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(queryString);

let id = urlParams.get('id');
console.log(id);

function recoverId() { // function that retrieves the ID of the camera
    return location.search.split('=')[1];
}

function getSelectedLens() { // function that allows you to select the lens 
    return lens.value;
}

// function that displays HTML of camera products
function productList(camera) {

    let newDiv = document.createElement('div');
    newDiv.className = 'card';
  
    cameraElement.appendChild(newDiv);
  
    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = "http://localhost:3000/images/vcam_1.jpg";
    img.alt = camera;
  
    newDiv.appendChild(img);
  
    let div1 = document.createElement('div');
    div1.className = 'card-body';
  
    let h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerHTML = camera.name;
  
    div1.appendChild(h5);
  
    let p = document.createElement('p');
    p.className = 'card-text';
    p.innerHTML = camera.description;
  
    div1.appendChild(p);
  
    let select = document.createElement('select');
    select.className = 'custom-select custom-select-sm';
    select.id = 'lens';
  
    div1.appendChild(select);
  
    // loop to display the different lenses
    for (let i = 0; i < camera.lenses.length; i++) {
      let option = document.createElement('option');
      option.value = camera.lenses[i];
      option.text = camera.lenses[i];
      select.appendChild(option);
    }
  
    newDiv.appendChild(div1);
  
    let button = document.createElement('button');
    button.setAttribute = 'type', 'submit';
    button.id = 'btnAddCart'
    button.className = 'btn btn-primary';
    button.innerHTML = 'Ajouter au panier';
  
    newDiv.appendChild(button);
  
    button.addEventListener('click', addProduct) 
    
    function addProduct(){ // function to add the product to the localstorage
  
      let products = []; 
      if (getSelectedLens()) {
        if(localStorage.getItem('products')) {
           products = JSON.parse(localStorage.getItem('products')); 
        }
  
        products.push({_id : camera._id, image : camera.imageUrl, name : camera.name, lenses : lens.value, price : camera.price/100 });
        localStorage.setItem('products', JSON.stringify(products));
        alert('Ajouté au panier !');
        window.location.reload();
        
      } 
    };
};

productList();
  