import {existsSync, promises} from 'fs';
const path = './db/carts.json';

class CartManager {
  crearCarrito = async () => {
    try {
      if (existsSync(path)) {
        // leo el archivo
        const data = await promises.readFile(path, 'utf-8');
        
        if (data === '') {
          const carrito = {
            id: 1,
            productos: [],
          };

          await promises.writeFile(path, JSON.stringify([carrito], null, '\t'));
        } else {
            
          const carritoJSON = JSON.parse(data);

          const carrito = {
            productos: [],
          };

          carrito.id = carritoJSON[carritoJSON.length - 1].id + 1;

          carritoJSON.push(carrito);

          await promises.writeFile(path, JSON.stringify(carritoJSON, null, '\t'));
          return carrito;
        }
      }
    } catch (error) {
      console.log(error);
      throw Error`${error.message}`;
    }
  };

  carritoById = async (id) => {
    // leo el archivo
    const data = await promises.readFile(path, 'utf-8');
    // se parsea a json
    const carritoJSON = JSON.parse(data);

    const idx = carritoJSON.findIndex((c) => c.id === id);

    if (idx !== -1) {
      return carritoJSON[idx]['productos'];
    } else {
      console.log(`Id ${id} no encontrado`);
    }
  };

  agregarProductoACarrito = async (id , productoId) => {

    const productosCarrito = await this.carritoById(id);
    
    if( productosCarrito ) {
        const existe = productosCarrito.findIndex(p => p.product === productoId)
        
        if( existe !== -1 ){
            
            productosCarrito[existe].quantity = productosCarrito[existe].quantity + 1;

        }else {
            
            productosCarrito.push({
                product: productoId,
                quantity: 1
            })
            
        }

        const data = await promises.readFile(path, 'utf-8');
        const carritoJSON = JSON.parse(data);
        const indice = carritoJSON.findIndex(p => p.id === id)
        carritoJSON[indice]['productos'] = productosCarrito;
        await promises.writeFile(path, JSON.stringify(carritoJSON, null, '\t'));
        return productosCarrito;

    }else {
        console.log('Producto no encontrado')
    }

  }
}

export default CartManager;
