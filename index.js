class Producto{

    constructor(tipo, turno, precio){
        this.tipo = tipo;
        this.turno = turno;
        this.precio = precio;
    }

    obtenerDatos(){

        return `Tipo: ${this.tipo}.\nTurno: ${this.turno}.\nPrecio: ${this.precio}.`;
    }
}

class Carrito{

    constructor(){

        this.productosSeleccionados = [];/* array vacio para ir sumando productos */
    }

    agregarProducto(nuevoProducto){

        this.productosSeleccionados.push(nuevoProducto);/* push para ir sumando productos */
    }

    eliminarProducto(productoAEliminar){

        let index = this.productosSeleccionados.indexOf(productoAEliminar); /* indexOff para buscar objeto */

        this.productosSeleccionados.splice(index, 1); /* splice para eliminar producto determinado */
    }

    obtenerProductosSeleccionados(){

        let auxProductosSeleccionados = [];

        for(let i = 0; i < this.productosSeleccionados.length; i++){

            auxProductosSeleccionados.push( `Producto: ${i + 1}.\n` + this.productosSeleccionados[i].obtenerDatos() + "\n");

        }

        auxProductosSeleccionados.push(`\nIngrese 0 si no quiere eliminar ningun producto.\n`);

        return auxProductosSeleccionados.join("\n");
    }
}

class Catalogo{

    constructor(producto, stock){
        this.producto = producto;
        this.stock = stock; 
    }

    agregarStock(cantidad){

        this.stock = this.stock + cantidad;
    }

    reducirStock(cantidad){

        this.stock = this.stock - cantidad;
    }

    obtenerDatos(){

        return this.producto.obtenerDatos() + `\nStock: ${this.stock}.`; 

    }
}

class Supermercado{

    constructor(){

        this.catalogo = [];

        this.carrito = new Carrito();

    }

    agregarCatalogoProducto(catalogo){
        this.catalogo.push(catalogo);
    }

    obtenerCatalogo(){

        let auxCatalogo = [];

        for(let i = 0; i < this.catalogo.length; i++){

            if(this.catalogo[i].stock > 0)
                auxCatalogo.push( `Producto: ${i + 1}.\n` + this.catalogo[i].obtenerDatos() + "\n");

        }

        auxCatalogo.push(`\nIngrese 0 si no quiere agregar ningun producto.\n`);

        return auxCatalogo.join("\n");
    }

    obtenerIndiceCatalogo(catalogo){
        return this.catalogo.find(catalogo);
    }

}

/* ----------------------------------------------------------------------- */
/* base de datos */
function cargaPreviaDatos(){
    const productoUno = new Producto("Crossfit", "Mañana", 3200);
    const productoDos = new Producto("Funcional", "Tarde", 3500);
    const productoTres = new Producto("Semi Privado", "Noche", 3300);

    const supermercado = new Supermercado();

    supermercado.agregarCatalogoProducto(new Catalogo(productoUno, 20));
    supermercado.agregarCatalogoProducto(new Catalogo(productoDos, 25));
    supermercado.agregarCatalogoProducto(new Catalogo(productoTres, 18));

    return supermercado;
}

/* Mensaje inicial */
const mensajeBienvenida = "-- Bienvenido al sistema de turnos --\n" +
                          "1 - Agregar clases al carrito.\n" +
                          "2 - Eliminar clases del carrito.\n" +
                          "3 - Ver clases agregadas al carrito.\n" +
                          "\n0 - Salir del programa.\n";

/* Validaciones */
const validarRango = (valor) =>{ return (minimo, maximo) => minimo <= valor && maximo >= valor }

const validarOpcionIngresada= (minimo, maximo, mensaje) => {

    let opcion;
    let auxFuncion;

    do{

        opcion = parseInt(prompt(mensaje));

        auxFuncion = validarRango(opcion);

    } while(!auxFuncion(minimo, maximo));

    return opcion;
}

/* Menu inicial */
const supermercado = cargaPreviaDatos();

/* Funciones */
function agregarProductoCarrito() {

    let cantidad = 0;

    for(const aux of supermercado.catalogo){
        if(aux.stock > 0)
         cantidad++;
    }

    let producto = validarOpcionIngresada(0, cantidad, supermercado.obtenerCatalogo());
    
    if (!Number.isNaN(producto)){
        if(producto != 0) {
            producto--;
            let productoSeleccionado = supermercado.catalogo[producto].producto;
            supermercado.carrito.agregarProducto(productoSeleccionado);
            supermercado.catalogo[producto].reducirStock(1);
        }
    }
}

function eliminarProductoCarrito(){

    let producto = validarOpcionIngresada(0, supermercado.carrito.productosSeleccionados.length, supermercado.carrito.obtenerProductosSeleccionados());

    if (!Number.isNaN(producto)){
        if(producto != 0) {
      
            producto--;

            let productoSeleccionado = supermercado.carrito.productosSeleccionados[producto];

            supermercado.catalogo.forEach((element)=>{
                if (element.producto == productoSeleccionado){
                    element.agregarStock(1);
                }
            });

            supermercado.carrito.eliminarProducto(productoSeleccionado);
        }
    }
}

function finalizarCompra(){

    let producto = validarOpcionIngresada(0, supermercado.carrito.productosSeleccionados.length, supermercado.carrito.obtenerProductosSeleccionados());

    if (!Number.isNaN(producto)){

        producto--;      
            
        let producto = alert(supermercado.catalogo[producto].producto);

    }
}


function ejecutarOpcion(opcion){

    if(opcion == 0){

        return true;

    } else if (opcion == 1){

        agregarProductoCarrito();
        
    } else if(opcion == 2) {

        eliminarProductoCarrito();

    }else if (opcion == 3){
        
        finalizarCompra();
    
    } else {
        
        return false;    
    }
}

let terminarPrograma = false;

while(!terminarPrograma){

    let opcion = validarOpcionIngresada(0, 3, mensajeBienvenida);

    terminarPrograma = ejecutarOpcion(opcion);
}