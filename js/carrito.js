class Product {
    constructor(name, price, domproduct, description, image){
        this.name= name;
        this.price = price;
        this.domproduct= domproduct;
        this.description= description;
        this.image = image;
    }
}

let products = [
    new Product('notebook', 100000, 'NT100' ,'notebook 16 - 4gb de ram ',''),
    new Product('celular', 70000, 'Nr100', 'celukar samsumg-  4gb de ram' , ''),
    new Product('tablet', 170000, 'Nr33100', 'notebook samsumg -14gb de ram', '')
]
let carrito = [];

products.forEach( product => {
    //crear elemento
    const newProductCard = document.createElement('div');
    //agregamos la informacion
    newProductCard.id = product.domproduct;
    newProductCard.classList.add('card');
    newProductCard.style.width= '18rem'
    // posible solucion - creamos el body de la card 
    let newProductBody =document.createElement('div');
    newProductBody.classList.add('card-body');

    //creamos la imagen 
    let imgProduct = document.createElement("img"); 
    imgProduct.classList.add("card-img-top"); 
    imgProduct.src = product.image; 

    // creamos el titulo
    let titleProduct = document.createElement("h5"); 
    titleProduct.classList.add("card-title"); 
    titleProduct.innerText = product.name; 

    //creamos el texto
    let textProduct = document.createElement("p"); 
    textProduct.classList.add("card-text"); 
    textProduct.innerText= product.price +`\n Descripcion: ${product.description}`; 

    // creamos el boton
    let btnComprar = document.createElement("button"); 
    btnComprar.classList.add("btn","btn-primary"); 
    btnComprar.innerText = "Comprar";
    btnComprar.type = "button"; 
    // agregamos la funcionalidad de que escuche los click sobre el boton 
    btnComprar.addEventListener("click", ()=>{
        agregarCarrito(product.domproduct); 
    })

/*
    newProductCard.innerHTML = `
    <img src=${product.image} class="card-img-top" >
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.price}</p>
    <button class="btn btn-primary" type="button" id="btnComprarProducto" onclick="agregarCarrito(${product.domproduct})">Comprar</button>
    </div>
    `;*/

    // agregamos los hijos del body del card
    newProductBody.appendChild(imgProduct); 
    newProductBody.appendChild(titleProduct); 
    newProductBody.appendChild(textProduct); 
    newProductBody.appendChild(btnComprar); 

    // agregamos el body al padre card 
    newProductCard.appendChild(newProductBody);

    //buscamos al padre
    const productsContainer = document.querySelector('main');
    productsContainer.appendChild(newProductCard)
    
})
function agregarCarrito (domproduct) { 
let product = products.find( product => product.domproduct ==  domproduct)
console.log(product)
}