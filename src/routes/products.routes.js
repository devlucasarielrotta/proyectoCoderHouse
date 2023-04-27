import { Router } from 'express';
import  ProductManager  from '../managers/ProductManager.js';

const router = Router();
const productosManager = new ProductManager();

router.get('/', async (req,res) => {

    const limit = Number(req.query.limit);
    const productos = await productosManager.getProducts();

    if( limit ){

        res.send( {productos: productos.slice(0,limit)}  )
    }else {
        res.send({
            productos
        })
    }
    
})

router.get('/:pid', async (req,res) => {

    try {

        const id = Number(req.params.pid);
        const producto = await productosManager.getProductById(id);

        res.send({
            producto
        })
    }
    catch( error ){

        console.log(error)

    }

})

router.post('/', async (req,res) => {

    try {

        const nuevoProducto = req.body;
        const productoAgregado = await productosManager.addProduct(nuevoProducto);
        res.send({
            productoAgregado
        });
    }catch( error ){

        console.log(error)

    }
})

router.put('/:pid', async (req,res) => {
    try {

        const id = Number( req.params.pid );
        const productoActualizar = req.body;

        if(req.body.id){
            return res.status(400).send({
                msg:'No se puede modificar el id'
            })
        }

        const productoActualizado = await productosManager.updateProduct(id,productoActualizar);

        res.send({
            productoActualizado, 
            msg:'Producto actualizado OK'
        })

    }
    catch( error ){

        console.log( error )

    }
})

router.delete('/:pid', async (req,res) => {

    try{

        const id = Number( req.params.pid );
        const productoEliminado = await productosManager.deleteProduct(id);
      
        if( productoEliminado ){
            res.json({
                productoEliminado,
                msg:'Producto eliminado ok'
            })
        }else {
            res.json({
                
                msg:'Producto no encontrado'
            })
        }
      

    }catch( error ){

        console.log( error )

    }
})

export { router } 