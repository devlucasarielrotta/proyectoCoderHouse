
window.addEventListener("DOMContentLoaded", (event) => {
    //referencias  HTML
const listaProductos = document.querySelector('#contenedor-productos');
const btnEliminar = document.querySelector('#eliminar');
const btnAgregar = document.querySelector('#agregar');
const idEliminar = document.querySelector('#id');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const code = document.querySelector('#code');
const price = document.querySelector('#price');
const status = document.querySelector('#status');
const stock = document.querySelector('#stock');
const category = document.querySelector('#category');
const thumbnail = document.querySelector('#thumbnail');



// Objeto agregarProducto
const productoObj = {
    title :'',
    description :'',
    code :'',
    price :'',
    status :'',
    stock :'',
    category :'',
    thumbnail :''
}

const socket = io();


socket.emit('message','Hola es un mensaje desde el front end')

socket.on('cargar-productos', data  => {

    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
      }

    const listaDesorneada = document.createElement('ul');
    const fragment = document.createDocumentFragment();
    data.forEach((producto, indice) => {
        const li = document.createElement('li');
        
         li.innerHTML = ` 
                Title: ${producto.title} 
                Descripcion: ${producto.description} 
                Precio: ${producto.price} 
                Thumbnail: ${producto.thumbnail} 
                Codigo de producto: ${producto.code} 
                Stock vigente: ${producto.stock} 
                ID: ${producto.id} 
        `
        li.style.backgroundColor = '#7c7c7c';
   
       fragment.appendChild(li);
    })

    listaDesorneada.appendChild(fragment)
    listaProductos.appendChild(listaDesorneada);
    
})

btnAgregar.addEventListener('click',e=> {
    e.preventDefault();
   
    const {thumbnail,...objetoNuevo} = productoObj

    objetoNuevo.title = title.value
    objetoNuevo.description = description.value
    objetoNuevo.code = code.value
    objetoNuevo.price = Number(price.value)
    objetoNuevo.status = Boolean(status.value)
    objetoNuevo.stock = Number(stock.value)
    objetoNuevo.category = category.value
 
    if(Object.values(objetoNuevo).includes('')){
        console.log("error, todos los campos son obligatorios");
        return
    }

    objetoNuevo.thumbnail = thumbnail;
    socket.emit('agregar-producto',objetoNuevo);
    
})


// listeners
btnEliminar.addEventListener('click', e => {
    e.preventDefault()
    const id = idEliminar.value
    socket.emit('eliminar-producto', id)
    idEliminar.value = '';
})
  });
