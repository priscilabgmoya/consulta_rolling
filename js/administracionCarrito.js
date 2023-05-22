class Product {
    #id; 
    #name; 
    #price;
    #image; 
    #description;
    constructor(name, price, description, image) {
        this.#id =this.#generarID();
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#image = image;
    }
    get getID(){
        return this.#id; 
    }
    get getName(){
        return this.#name; 
    }
    get getPrice(){
        return  this.#price; 
    }
    get getImage(){
        return this.#image; 
    }
    get getDescription(){
        return this.#description; 
    }
    set setName(name){
        this.#name = name; 
    }
    set setPrice(price){
        this.#price = price; 
    }
    set setImage(image){
        this.#image = image; 
    }
    set setDescription(description){
        this.#description = description; 
    }
    #generarID(){
        var id = "";
        var str =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 1; i <= 6; i++) {
            var char = Math.floor(Math.random() * str.length + 1);
            id += str.charAt(char);
        }
        return id;
    }
    toJson(){
        return {
            id: this.#id, 
            name: this.#name,
            price: this.#price,
            image: this.#image,
            description: this.#description
        }
    }
}
const bodyListProduct = document.getElementById('bodyTablaProducto'); 
let products =  localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];

function agregarProducto(event) {
    event.preventDefault();
    const name = document.getElementById('inputNameProduct'), 
    price = document.getElementById('inputPriceProduct'), 
    image = document.getElementById('inputImageProduct'),
    description = document.getElementById('inputDescriptionProduct');

    if ((name.checkValidity() && price.checkValidity() && image.checkValidity() && description.checkValidity() )){
        const newProduct = new Product(name.value, parseFloat(price.value), description.value, image.value); 
        products.push(newProduct.toJson()); 
        console.log(products); 
        console.log(products);  
        localStorage.setItem("listProduct", JSON.stringify(products)); 
        document.getElementById('fromAgregarProducto').reset();
        listProducts(products); 
        alert('Se agregó el producto'); 
    }else{
        alert("Ingrese informacion valida!");
    }
}

function generarID() {
    var id = "";
    var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i <= 6; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        id += str.charAt(char);
    }
    return id;
}

function listProducts(products){
    deleteChildNode(bodyListProduct); 
    products.forEach(product => {
        let row = document.createElement("tr");
    
        let column = document.createElement("td");
           //creamos la imagen 
        const imgProduct = document.createElement("img");
        imgProduct.style.width = "5rem"; 
        imgProduct.src = product.image;
        column.appendChild(imgProduct);
        row.appendChild(column);
    
        column = document.createElement("td");
        column.innerText = product.id;
        row.appendChild(column);
    
        column = document.createElement("td");
        column.innerText = product.name;
        row.appendChild(column);
    
        column = document.createElement("td");
        column.innerText ='$ '+ product.price;
        row.appendChild(column);
    
        column = document.createElement("td");
        column.innerText = product.description;
        row.appendChild(column);
    
        column = document.createElement("td");
    
        let buttonDelete = document.createElement("button");
        buttonDelete.type ="button"; 
        buttonDelete.className = "btn btn-danger mx-2";
        buttonDelete.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
    
        let buttonUpdate = document.createElement("button");
        buttonUpdate.className = "btn btn-warning mx-2";
        buttonUpdate.innerHTML =`<i class="bi bi-pencil-square"></i>`;
    
        let buttonFavorite = document.createElement("button");
        buttonFavorite.className = "btn btn-success mx-2";
        buttonFavorite.innerHTML =`<i class="bi bi-star-fill"></i>`;
    
        column.appendChild(buttonDelete);
        column.appendChild(buttonUpdate);
        column.appendChild(buttonFavorite); 
    
        row.appendChild(column);
    
        buttonDelete.addEventListener("dblclick", (event) => {
            while (confirm('¿Desea Eliminar el Producto?')) {
                let fila = event.target.parentNode.parentNode,
                codigoProducto = fila.getElementsByTagName('td')[1].innerText;
                products =  products.filter(product => product.id !== codigoProducto);
                localStorage.setItem("listProduct", JSON.stringify(products)); 
                fila.remove();
                 alert("Producto Eliminado!");
                 return; 
            }
        });
        buttonUpdate.addEventListener('dblclick', () => {
            alert('me falta resolver!')
          });
          
    
        bodyListProduct.appendChild(row);
    });

}

function deleteChildNode(container){
    while (container.hasChildNodes()) {
        container.childNodes.forEach(li => li.remove());
    }
}