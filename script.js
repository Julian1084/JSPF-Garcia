let url = ('./productos.json')
fetch(url)
  .then(response => response.json())
  .then(productos => {
let carritoJSON = ""
let totalFinal = ""
let unidades = ""
let contenedor = document.getElementById("contenedor")
let carritoRender = document.getElementById("cart-row")
let carritoRender2 = document.getElementById("cart-row-2")
let total = document.getElementById("total")
let cartNav = document.getElementById("cart-nav")
let botonCarrito = document.getElementById("cart-button")
let picada = document.getElementById("picada")
let cervezas = document.getElementById("cervezas")
let gaseosas = document.getElementById("gaseosas")
let input = document.getElementById("input")
let button = document.getElementById("buscador")

function alertaPersonalizada(texto, icono, confirmacion, tiempo) {
    Swal.fire({
        text: texto,
        icon: icono,
        showConfirmButton: confirmacion,
        timer: tiempo
    })
    
}
function renderizar(array) {

    contenedor.innerHTML = ""
    for (const producto of array) {

        let tarjetaBody = document.createElement("div")
        tarjetaBody.className = "col-lg-4"
        tarjetaBody.innerHTML =
          `<div class="card estilo-c">
          <a href="#">
            <div class="img-container">
              <img src="${producto.img}">
              <span class="promo">15% de descuento</span>
            </div>
           </a>
          <div class="info-container">
            <h4>${producto.nombre}</h4>
            <strong>$${producto.precio}</strong>
            <button id ="${producto.id}" class="btn btn-outline-secondary add-btn update-cart">Agregar al carrito</button>
          </div>
        </div>
        `
        contenedor.append(tarjetaBody)
    }
    let agregarCarrito = document.getElementsByClassName('btn btn-outline-secondary add-btn update-cart')
    for (boton of agregarCarrito) {
        boton.addEventListener("click", addItem)
        
    }
}

function addItem(e) {

    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)

    if (indexProduct != -1) {
        carrito[indexProduct].unidades++
        carrito[indexProduct].subtotal = carrito[indexProduct].precio * carrito[indexProduct].unidades
        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", carritoJSON)
    }
    else {
        carrito.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, categoria: productoBuscado.categoria, precio: productoBuscado.precio, subtotal: productoBuscado.precio, unidades: 1, img: productoBuscado.img })

        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", carritoJSON)
    }
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)
    renderizarCarro(carrito)
    totalRender(carrito)
    alertaPersonalizada("Haz agregado un item al carrito", "success", false, 2000)
}

function renderizarCarro(array) {
    carritoRender.innerHTML = ""
    for (let producto of array) {
        let cart = document.createElement("div")
        cart.className = "cart-render"
        cart.innerHTML = `
        <div class="cart-row">
        <div  style="flex:2"><img class="row-image" src="${producto.img}"></div>
        <div  style="flex:2"><p>${producto.nombre}</p></div>
        <div  style="flex:1"><p>$${producto.precio.toFixed(2)}</p></div>
        <div style="flex:1">
        <p class="quantity">${producto.unidades}</p>
        <div class="quantity">
        <img id="${producto.id}" class="chg-quantity update-cart " src="images/arrow-up.png">
        <img id="${producto.id}" class="chg-quantity-2 update-cart" src="images/arrow-down.png">
        </div>
        </div>
        <div style="flex:1"><p>$${producto.subtotal.toFixed(2)}</p></div>
        </div>
        `
        carritoRender.append(cart)
    }
    let add = document.getElementsByClassName("chg-quantity update-cart")
    for (let a of add) {
        a.addEventListener("click", addItem)
    }
    let remove = document.getElementsByClassName("chg-quantity-2 update-cart")
    for (let b of remove) {
        b.addEventListener("click", removeItem)
    }
}

function removeItem(e) {

    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)
    if (indexProduct != -1) {
        if (carrito[indexProduct].unidades >= 2) {
            carrito[indexProduct].unidades--
            carrito[indexProduct].subtotal = carrito[indexProduct].subtotal - carrito[indexProduct].precio
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
        else {
            carrito.splice(indexProduct, 1)
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
    }
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)

    renderizarCarro(carrito)
    totalRender(carrito)
}

function totalRender(array) {
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)
    total.innerHTML = ""
    let totalResumen = document.createElement("div")
    totalResumen.className = "total"
    totalResumen.innerHTML = `
    <h5>Items: <strong>${unidades} </strong></h5>
    <h5>Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h5>
    <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a>
    `
    total.append(totalResumen)

    cartNav.innerHTML = ""
    if (array.lenght != 0) {
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>${unidades}</p>`
        cartNav.append(parrafo)
    } else {
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>0</p>`
        cartNav.append(parrafo)
    }
    let clear = document.getElementById("clear")
    clear.addEventListener("click", borrarStorage)
}
function totalRenderVacio(array) {

    total.innerHTML = ""
    let totalResumen = document.createElement("div")
    totalResumen.className = "total"
    totalResumen.innerHTML = `
    <h5>Items: <strong>  0 </strong></h5>
    <h5>Total:<strong> $ 0.00 </strong></h5>
    <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a>
    `
    total.append(totalResumen)

    cartNav.innerHTML = ""
    let parrafo = document.createElement("div")
    parrafo.className = "cart-total"
    parrafo.innerHTML = `<p>0</p>`
    cartNav.append(parrafo)
}

function borrarStorage() {
    localStorage.removeItem("Carrito")
}

botonCarrito.addEventListener("click", esconder)

function esconder(e) {
    contenedor.innerHTML = ""
    if (carrito.length == 0){
        let boton = document.createElement("div")
    boton.className = "boton-render"
    boton.innerHTML = `
        <a type="button" class="btn btn-success" href="index.html">Ir a la Tienda</a>
        `
    contenedor.append(boton)
    } else{

        let boton = document.createElement("div")
        boton.className = "boton-render"
        boton.innerHTML = `
        <a type="button" class="btn btn-success" href="index.html">Seguir comprando</a>
        `
        contenedor.append(boton)
    }

}

renderizar(productos)

let carrito = []
if (localStorage.getItem("Carrito")) {
    carrito = JSON.parse(localStorage.getItem("Carrito"))
    renderizarCarro(carrito)
    totalRender(carrito)
} else {
    totalRenderVacio(carrito)
}

picada.addEventListener("click", filtroCategoria)
cervezas.addEventListener("click", filtroCategoria)
gaseosas.addEventListener("click", filtroCategoria)
function filtroCategoria(e) {
    e.preventDefault()
    let categoriafiltrado = productos.filter(producto => producto.categoria.toLowerCase() == e.target.id)
    renderizar(categoriafiltrado)
}
button.addEventListener("click", buscar)
function buscar(e) {
    e.preventDefault()
    let productoFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()) || producto.categoria.toLowerCase().includes(input.value.toLowerCase()))
    renderizar(productoFiltrado)
}
})
