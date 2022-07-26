//modal//
const micarrito = document.getElementById ('micarrito')
const close = document.getElementById('close');

micarrito.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener ('click',() => {
    modal_container.classList.remove('show');
})

// constantes de carrito 
const contenedorcarrito= document.getElementById('carrito-contenedor')

const contadorcarrito = document.getElementById('contadorcarrito')

const preciototal = document.getElementById('totalapagar')

let stockProductos = [
    {id: 1, nombre: "llanta SW-14 ", modelo:"Volkswagen", cantidad: 1 , precio: 30000, img: './assets/image/product-1.jpg'},
    {id: 2, nombre: "llanta SW-15 ", modelo:"Volkswagen", cantidad: 1 , precio: 40000, img: './assets/image/llanta_volkswagen_modelo_14.jpeg'},
    {id: 3, nombre: "llanta SW-16 ", modelo:"Volkswagen", cantidad: 1 , precio: 20000, img: './assets/image/llanta_volkswagen_modelo_15.jpg'},
    {id: 4, nombre: "llanta SP-16 ", modelo:"Peugeot", cantidad: 1 , precio: 25000, img: './assets/image/modelo_llanta_peugeot_16.jpg'},
    {id: 5, nombre: "llanta SP-17 ", modelo:"Peugeot", cantidad: 1 , precio: 60000, img: './assets/image/llanta_modelo_peugeot_17.jpg'},
    {id: 6, nombre: "llanta SP-18 ", modelo:"Peugeot", cantidad: 1 , precio: 40000, img: './assets/image/modelo_llanta_peugeot_18.jpg'},
    {id: 7, nombre: "llanta SF-20 ", modelo:"Ford", cantidad: 1 , precio: 40000, img: './assets/image/llanta_ford_modelo20.jpg'},
    {id: 8, nombre: "llanta SR-14 ", modelo:"Ford", cantidad: 1 , precio: 40000, img: './assets/image/modelo_llanta_ford_modelo21.jpg'},
    {id: 8, nombre: "llanta SR-14 ", modelo:"Ford", cantidad: 1 , precio: 40000, img: './assets/image/modelo_llanta_ford_22.jpeg'},
]
let carrito= []

document.addEventListener('DOMContentLoaded', () => {
     if ( localStorage.getItem('carrito')){
        carrito= JSON.parse(localStorage.getItem('carrito'))
        carritoactualizado()
     }
})

//logica de las cards de los productos//
const pagecontenedor = document.getElementById('pagecontenedor')
 
 stockProductos.forEach((Producto)=>{
          const div = document.createElement('div')
          div.classList.add('producto-container')
          div.innerHTML = `
           <h3>${Producto.nombre}</h3>
           <p>${Producto.modelo}</p>
           <img src=${Producto.img} alt="">
           <h4>$${Producto.precio}</h4>
           <button id="agregar${Producto.id}" class="button-add">Comprar</button>
           `
           
           pagecontenedor.appendChild(div)

           const boton = document.getElementById(`agregar${Producto.id}`)

           boton.addEventListener ('click', () => {agregaralcarrito(Producto.id)
           })
 })
//carrito
const agregaralcarrito = (prodid) => {
    const almacenado = carrito.some (prod => prod.id === prodid)

    if (almacenado){
        const prod = carrito.map (prod => {
            if (prod.id === prodid){
                prod.cantidad++
            }

        })
    } else{


    const item = stockProductos.find((prod) => prod.id === prodid)
    carrito.push(item)
    carritoactualizado()
    console.log(carrito)
}
carritoactualizado ()
}

const eliminardelcarrito = (prodid) => {
    const item = carrito.find ((prod) => prod.id === prodid)
    const indice = carrito.indexOf (item)
    carrito.splice (indice,1)
    carritoactualizado ()
}
      

const carritoactualizado = () => {
    contenedorcarrito.innerHTML = ""
    carrito.forEach ((prod) => {
       const div= document.createElement('div')
       div.className = ('productoparacomprar')
       div.innerHTML =`
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <button onclick = "eliminardelcarrito (${prod.id})" class="boton-eliminar">Eliminar</button>
       ` 
       contenedorcarrito.appendChild(div)

       localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorcarrito.innerText = carrito.length
    preciototal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}



document.getElementById('pagar').onclick = function(){
    Swal.fire({
        title: "Su compra se registro con exito!",
        icon: 'success',
        footer: '<span class="rojo">En breve nos estaremos comunicando contigo via E-mail</span>'
        
    })
}