const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
const carrito = []; /* array de carrito vacio */
const botonConfirmar = document.getElementById("botonConfirmar");
const botonVaciar = document.getElementById("botonVaciar");


/* Defino productos */
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

/* Armo tarjetas con bootstrap */
const obtenerTarjeta = (item) => {
    return (
        `
        <div class="card" style="width: 33.3%">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">Precio: $${item.precio}</p>
                <p class="card-text">Stock: ${item.stock}</p>
                <a href=# button onclick=agregarCarrito(${item.id}) class="btn btn-primary">Agregar al carrito</a>
                </div>
        </div>
    `)
};

/* Armo tabla de carrito con bootstrap */
const obtenerTabla = (item) => {
    return(
        `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio}</td>
        <td>$${item.precio * item.cantidad}</td>
        <td><img style="width:20px" src="${item.imagen}" alt="imagen"></td>
    </tr>
    `)
};

const cargarProductos = (datos, nodo, esTabla) => {
    let acumulador = "";
    datos.forEach((el) => {
        acumulador += esTabla ? obtenerTabla(el) : obtenerTarjeta(el); /* uso de ternarios */
    })
    nodo.innerHTML = acumulador; /* convierto el txt en nodo html*/
};

/* Agregando productos al carrito */
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
    cargarProductos(carrito, tablaCarrito, true)
};

cargarProductos(PRODUCTOS, contenedor, false);

function inicializarCarrito(){
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cargarProductos(carrito, tablaCarrito, true);
};


/* Agrego alertas con sweet alert */
botonConfirmar.addEventListener('click', () =>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sus clases fueron reservadas exitosamente',
        showConfirmButton: false,
        timer: 1500
    })    
});


botonVaciar.addEventListener('click', () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Estas a punto de vaciar el carrito!',
        text: '¿Estas seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar clases!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Borradas!',
            'Sus clases fueron borradas exitosamente.',
            'success'
          )
        }else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Sus clases no se han borrado :)',
            'error'
          )
        }
    })
});