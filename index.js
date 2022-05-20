const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
const carrito = []; 
let boton = document.getElementById("botonVerCarrito")

const PRODUCTOS = [
    {
        id: 1,
        nombre: "Funcional",
        precio: 5000,
        stock: 5,
        imagen: "../img/GimNova17-2-6.jpg"
    },
    {
        id: 2,
        nombre: "Crossfit",
        precio: 4500,
        stock: 10,
        imagen: "../img/GimNova17-2-21.jpg"
    },
    {
        id: 3,
        nombre: "Semi-Privado",
        precio: 4800,
        stock: 8,
        imagen: "../img/GimNova17-2-36.jpg"
    }];

const getCard = (item) => {
    return (
        `
        <div class="card" style="width: 33.3%">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">$${item.precio}</p>
                <p class="card-text">Stock: ${item.stock}</p>
                <button=agregarCarrito(${item.id}) class="btn ${item.stock ? 'btn-primary' : 'btn-secondary'}" ${!item.stock ? 'disabled' : '' } >Agregar clase al carrito</button>
            </div>
        </div>
    `);
};

boton.addEventListener("click", respuestaclick)
function respuestaclick(){
    console.log("Vistas carrito")
}

const getRow = (item) => {
    return(
        `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio * item.cantidad} ($${item.precio})</td>
        <td><img style="width:20px" src="${item.imagen}" alt="imagen"></td>
    </tr>
        `
    )
}

const cargarProductos = (datos, nodo, esTabla) => {
    let acumulador = "";
    datos.forEach((el) => {
        acumulador += esTabla ? getRow(el) : getCard(el);
    })
    nodo.innerHTML = acumulador;
};

const agregarCarrito = (id) => {
    const seleccion = PRODUCTOS.find(item => item.id === id);
    const busqueda = carrito.findIndex(el => el.id === id);
    
    if (busqueda === -1) {
        carrito.push({
            id: seleccion.id,
            nombre: seleccion.nombre,
            precio: seleccion.precio,
            cantidad: 1,
            imagen: seleccion.imagen,
        })
    } else {
        carrito[busqueda].cantidad = carrito[busqueda].cantidad + 1
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarProductos(carrito, tablaCarrito, true);
}

cargarProductos(PRODUCTOS, contenedor, false);

function inicializarCarrito(){
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cargarProductos(carrito, tablaCarrito, true);
}

