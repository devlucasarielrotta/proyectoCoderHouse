import { Router } from "express";
import  CartManager  from '../managers/CartManager.js';


const carritoManager = new CartManager();

const router = Router();

router.get('/:cid', async (req,res) => {

    try {
        const id = Number(req.params.cid);
        const encontrado = await carritoManager.carritoById(id);
        res.send({
            productos:encontrado
        })
    }catch( error ) {
        console.log(error)
    }

})

router.post('/', async(req,res) => {

    try {
        const carritoCreado = await carritoManager.crearCarrito();
        res.send({
        carritoCreado
    })

    }catch( error ) {
        console.log( error )
    }
    
})

router.post('/:cid/product/:pid', async (req,res) => {
    try {
        const {cid, pid} = req.params;
        
        const producto = await carritoManager.agregarProductoACarrito(Number(cid),Number(pid));
        res.send({producto})

    }catch( error ){
        console.log( error )
    }
})

export { router } 