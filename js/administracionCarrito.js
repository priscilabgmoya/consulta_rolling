class Product {
    constructor(id, name, price, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}
let products =  localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];

function agregarProducto(event) {
    event.preventDefault();
    const name = document.getElementById('inputNameProduct').value, 
    price = document.getElementById('inputPriceProduct').value, 
    image = document.getElementById('inputImageProduct').value,
    description = document.getElementById('inputDescriptionProduct').value;

if(name.length == 0 || price.length  == 0 || image.length  == 0 ||description.length  == 0 || price.includes(',') || image.includes(' ') ) 
return alert("Ingrese informacion valida!");

   const newProduct = new Product(generarID(), name, parseFloat(price), description, image); 
   products.push(newProduct); 
   localStorage.setItem("listProduct", JSON.stringify(products)); 
   alert('Se agregó el producto'); 

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






