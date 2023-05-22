let products =   localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
let carrito = [];

products.forEach(product => {
    //crear elemento
    const newProductCard = document.createElement('div');
    //agregamos la informacion
    newProductCard.id = product.id;
    newProductCard.classList.add('card', 'm-2', 'col-xl-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    newProductCard.style.width = '18rem'
    // posible solucion - creamos el body de la card 
    let newProductBody = document.createElement('div');
    newProductBody.classList.add('card-body','productoCard');

    //creamos la imagen 
    let imgProduct = document.createElement("img");
    imgProduct.classList.add("card-img-top");
    imgProduct.src = product.image;

    // creamos el titulo
    let titleProduct = document.createElement("h5");
    titleProduct.classList.add("card-title", "text-black");
    titleProduct.innerText = product.name;

    //creamos el texto
    let textProduct = document.createElement("p");
    textProduct.classList.add("card-text", "text-black");
    textProduct.innerText = '$' + product.price + `\n Descripcion: ${product.description}`;

    // creamos el boton
    let btnAgregarCarrito = document.createElement("button");
    btnAgregarCarrito.classList.add("btn", "btn-primary");
    btnAgregarCarrito.innerText = "Agregar al carrito";
    btnAgregarCarrito.type = "button";
    btnAgregarCarrito.id = "btnComprarProducto";
    

    // agregamos la funcionalidad de que escuche los click sobre el boton 
    btnAgregarCarrito.addEventListener("click", () => {
        agregarCarrito(product.id);
    });

    // agregamos los hijos del body del card
    newProductBody.appendChild(imgProduct);
    newProductBody.appendChild(titleProduct);
    newProductBody.appendChild(textProduct);
    newProductBody.appendChild(btnAgregarCarrito);

    // agregamos el body al padre card 
    newProductCard.appendChild(newProductBody);

    //buscamos al padre
    const productsContainer = document.querySelector('#listadoProductos');
    productsContainer.appendChild(newProductCard);

});

function agregarCarrito(id) {
    let product = products.find(product => product.id == id);
    carrito.push(product);
    alert('Producto Agregado al carrito!');

};
function llenarCarrito() {
    debugger
let suma =0; 
    const productsContainer = document.getElementById('bodyCarrito'),
             totalCompraContainer = document.getElementById('TotalCompra');

    while (productsContainer.hasChildNodes()) {
        productsContainer.childNodes.forEach(li => li.remove());
    }

    products.forEach(product => {
        //crear elemento

        let productCard = carrito.filter(productCards => productCards == product);

        const newProductRow = document.createElement('tr');

        let newProductColumn = document.createElement('td'); 
        //creamos la imagen 
        const imgProduct = document.createElement("img");
        imgProduct.style.width = "3rem"; 
        imgProduct.src = productCard[0].image;
        newProductColumn.appendChild(imgProduct);
        newProductRow.appendChild(newProductColumn); 

        // creamos nombre del producto
        newProductColumn = document.createElement('td'); 
        newProductColumn.innerText = productCard[0].name;
        newProductRow.appendChild(newProductColumn); 

        // creamos descripcion del producto
        newProductColumn = document.createElement('td'); 
        newProductColumn.innerText = `${productCard[0].description}`;
        newProductRow.appendChild(newProductColumn); 

        //creamos el precio
        newProductColumn = document.createElement('td'); 
        newProductColumn.innerText = '$' + productCard[0].price;
        newProductRow.appendChild(newProductColumn); 
        
        //creamos la cantidad 
        newProductColumn = document.createElement('td'); 
        newProductColumn.innerText =`${productCard.length}`; 
        newProductRow.appendChild(newProductColumn); 

        //creamos el subtotal
        newProductColumn = document.createElement('td'); 
        let subtotal = productCard[0].price * productCard.length;
        newProductColumn.innerText =  ` $ ${subtotal}`;
        newProductRow.appendChild(newProductColumn); 
        suma += subtotal; 
        // creamos el boton eliminar
        newProductColumn = document.createElement('td'); 
        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerText = "Eliminar";
        btnEliminar.type = "button";
        btnEliminar.id = "btnEliminarProducto";
        newProductColumn.appendChild(btnEliminar);

        // creamos el boton modificar
        let btnModificar = document.createElement("button");
        btnModificar.classList.add("btn", "btn-warning",'mx-2');
        btnModificar.innerText = "Modificar";
        btnModificar.type = "button";
        btnModificar.id = "btnModificarProducto";
        newProductColumn.appendChild(btnModificar);
        newProductRow.appendChild(newProductColumn); 

        // agregamos la funcionalidad de que escuche los click sobre el boton 
        btnEliminar.addEventListener("click", () => {
            eliminarProducto(productCard[0].id);
        });
        btnModificar.addEventListener("click", ()=> {
            modificarProducto(productCard[0].id);
            
        }); 

        //buscamos al padre
        productsContainer.appendChild(newProductRow);
    });
    totalCompraContainer.innerText = suma; 
}
function eliminarProducto(productId) {
    if(confirm('¿Desea eliminar Todos los productos Seleccionados?')){
        carrito = carrito.filter(product => product.id !== productId);
        llenarCarrito();
    }
}
function modificarProducto(productId){
    document.getElementById("btnModificarProducto").setAttribute("disabled" , true); 
    let productUpdate = carrito.filter(product => product.id == productId); 
  let updateContianer =   document.getElementById('modificarProducto'); 
updateContianer.innerHTML = `          
<h3>Modificar Producto</h3>
<form class="row needs-validation was-validated" novalidate="">
<div class="col-xl-6">
  <label for="validationCustom01" class="form-label">Cantidad de Productos</label>
  <input type="number" min="1" class="form-control" id="validationCustom01" value="${productUpdate.length}" required="">
  <div class="valid-feedback">
    Looks good!
  </div>
</div>
<div class="col-12">
<button class="btn btn-primary" type="button">Guardar Modificacion</button>
</div>
</form>`; 
    //alert(`Se encuentra en produccion ${productId}`); 
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
function verVentana(event){
    event.preventDefault();
    event.target.style.visibility = "framename"; 
    window.location.href = "./index.html";
    window.location.moveTo(200,200);
    window.location.resizeBy(100,100);

}