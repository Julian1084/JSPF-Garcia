const productos = [
    { id: 01, nombre: "Picada para 3", categoria: "PICADA", precio: 3000, stock: 1, img: "images/picada3.PNG" },
    { id: 02, nombre: "Picada para 6", categoria: "PICADA", precio: 5000, stock: 10, img: "images/picada6.PNG" },
    { id: 03, nombre: "Picada para 10", categoria: "PICADA", precio: 7000, stock: 10, img: "images/picada10.PNG" },
    { id: 04, nombre: "Picada para 15", categoria: "PICADA", precio: 12000, stock: 10, img: "images/picada15.PNG" },
    { id: 05, nombre: "Cerveza Lata Quilmes - Pack de 6", categoria: "BEBIDAS CON ALCOHOL", precio: 1374, stock: 10, img: "images/quilmes.PNG" },
    { id: 06, nombre: "Cerveza Lata Antares - Pack de 6", categoria: "BEBIDAS CON ALCOHOL", precio: 2970, stock: 10, img: "images/antares.PNG" },
    { id: 07, nombre: "Cerveza Lata Patagonia - Pack de 6", categoria: "BEBIDAS CON ALCOHOL", precio: 2742, stock: 10, img: "images/patagonia.PNG" },
    { id: 08, nombre: "Cerveza Lata Andes - Pack de 6", categoria: "BEBIDAS CON ALCOHOL", precio: 1059, stock: 10, img: "images/andes.PNG" },
    { id: 09, nombre: "Coca-Cola Lata - Pack de 6", categoria: "BEBIDAS SIN ALCOHOL", precio: 1400, stock: 10, img: "images/coca.PNG" },
    { id: 10, nombre: "Aquarius Naranja botella 500cc - Pack de 6 ", categoria: "BEBIDAS SIN ALCOHOL", precio: 1229, stock: 10, img: "images/aquariusnaranja.JPG" },
    { id: 11, nombre: "Aquarius Manzana botella 500cc - Pack de 6 ", categoria: "BEBIDAS SI ALCOHOL", precio: 1229, stock: 10, img: "images/aquariusmanzana.PNG" },
   
]

let contenedorCarrito = document.getElementById("contenedorCarrito")

let contenedor = document.getElementById("contenedorProductos")
renderizarProductos(productos)

let carrito = []
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
}
renderizarCarrito(carrito)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", renderizarProductosFiltrados)

function renderizarProductosFiltrados() {
  let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categorias.find(categoria => categoria.includes(buscador.value.toLowerCase())))
  // producto.categoria.toLowerCase().includes(buscador.value.toLowerCase())
  renderizarProductos(productosFiltrados)
}

function renderizarProductos(arrayDeProductos) {
  contenedor.innerHTML = ""
  for (const producto of arrayDeProductos) {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "producto"
    tarjetaProducto.id = producto.id
  
    tarjetaProducto.innerHTML = 
    
    `<div class="card estilo-c">
    <a href="#">
      <div class="img-container">
        <img src="${producto.img}">
        <span class="promo">15% de descuento</span>
      </div>
     </a>
    <div class="info-container">
      <h3>${producto.nombre}</h3>
      <strong>$${producto.precio}</strong>
      <button class ="boton" id ="${producto.id}">Agregar al carrito</button>
    </div>
  </div>
  `
    contenedor.appendChild(tarjetaProducto)
  }
  let botones = document.getElementsByClassName("boton")
  for (const boton of botones) {
    boton.addEventListener("click", agregarAlCarrito)
  }
}

function agregarAlCarrito(e) {
  let productoBuscado = productos.find(producto => producto.id == e.target.id)
  let posicionDelProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)
  if (posicionDelProductoBuscado != -1) {
    carrito[posicionDelProductoBuscado].unidades++
    carrito[posicionDelProductoBuscado].subtotal = carrito[posicionDelProductoBuscado].unidades * carrito[posicionDelProductoBuscado].precioUnitario
  } else {
    carrito.push({id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio})
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  renderizarCarrito(carrito)
}

function renderizarCarrito(arrayDeProductos) {
  contenedorCarrito.innerHTML = ''
  for (const producto of arrayDeProductos) {
    contenedorCarrito.innerHTML += `
      <div class="flex">
        <p>${producto.nombre}</p>
        <p>${producto.precioUnitario}</p>
        <p>${producto.unidades}</p>
        <p>${producto.subtotal}</p>
      </div>
    `
  }

  let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
  contenedorCarrito.innerHTML += `
    <h3>TOTAL $${total}</h3>
  `
}

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
  localStorage.removeItem("carrito")
  carrito = []
  renderizarCarrito(carrito)
})





// 0      1       2
// nombre edad    apellido

/* for (let i = 0; i < localStorage.length; i++) {
  let nombreClave = localStorage.key(i)
  console.log(localStorage.getItem(nombreClave))
} */

/* localStorage.setItem("nombre", "Juan")
localStorage.setItem("edad", 25) */

/* localStorage.setItem("nombreUsuario", "pedrito@gmail.com")
localStorage.setItem("carrito", "pelota")

// si finaliza la compra
localStorage.removeItem("carrito")

// si quiere cerrar sesión
localStorage.removeItem("nombreUsuario")

// para borrar todo
localStorage.clear()

let nombre = localStorage.getItem("nombre")
console.log(nombre)

let edad = Number(localStorage.getItem("edad"))
console.log(edad) */

/* let productos = [
  { id: 2, categorias: ["entretenimiento", "futbol", "deportes"], nombre: "Pelota", stock: 23, precio: 6000, imgUrl: "https://ep01.epimg.net/verne/imagenes/2015/09/11/articulo/1441988783_165642_1442161238_sumario_normal.jpg" },
  { id: 5, categorias: ["ropa"], nombre: "Remera", stock: 10, precio: 8000, imgUrl: "https://cuestablanca.vteximg.com.br/arquivos/ids/360383-1000-1500/remera-manga-corta-negro-6.jpg?v=637801799314600000" },
  { id: 8, categorias: ["ropa"], nombre: "Short", stock: 34, precio: 4500, imgUrl: "./images/short.jpg" },
  { id: 9, categorias: ["ropa"], nombre: "Gorra", stock: 16, precio: 7500, imgUrl: "https://http2.mlstatic.com/D_NQ_NP_842761-MLA45601779395_042021-W.jpg" }
]

// let arrayProductos = [{nombre: "Pelota", nombre: "Remera"}]
// let granString = JSON.stringify(arrayProductos)
// '[{"nombre": "Pelota", "nombre": "Remera"}]'
// JSON.parse(granString)
// [{nombre: "Pelota", nombre: "Remera"}]

let productosEnString = JSON.stringify(productos)
localStorage.setItem("productos", productosEnString)

let productosRecuperadosEnString = localStorage.getItem("productos")
let productosRecuperados = JSON.parse(productosRecuperadosEnString)
console.log(productosRecuperados) */