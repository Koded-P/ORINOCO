function myProductList (){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            const response = JSON.parse(this.responseText);

            //BODY SELECTOR 
            let body = document.querySelector("body");

            
            let productList = document.createElement("div");
            productList.className = "container";
            body.appendChild(productList);
            
            //LOOP BLOCK
            for(let i = 0; i < response.length; i++){
                //Add Images to DOM
                let img = response[i].imageUrl;
                let name = response[i].name;
                let description = response[i].description;
                let id = response[i]._id;

                //Add Html Container
                let div = document.createElement("div");
                div.className = "row";
                productList.appendChild(div);

                //Add Link Element
                let a = document.createElement("a");
                a.className = "link"
                div.appendChild(a);
                a.href = "product.html?id=" + id;

                //Add Event Listener
                a.addEventListener("click", function(event){
                    console.log(id);
                    if(id){
                        console.log(name)

                    }
                })

                //List of Products 
                function productListInfo(){
                    let productImg = document.createElement("img");
                    productImg.className = "card-img-top";
                    productImg.src = img;
                    a.appendChild(productImg);  
                    
                    let h2 = document.createElement("h2");
                    h2.className = "card-title";
                    h2.innerHTML = name;
                    a.appendChild(h2);

                    let descriptionProduct = document.createElement("p");
                    descriptionProduct.className ="card-text";
                    descriptionProduct.innerHTML = description;
                    a.appendChild(descriptionProduct);

                }
                productListInfo();
                     
            }
        }
    }
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
}

myProductList();
