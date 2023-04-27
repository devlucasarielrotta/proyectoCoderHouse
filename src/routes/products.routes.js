import { Router } from 'express';
import  ProductManager  from '../managers/ProductManager.js';

const router = Router();
const productosManager = new ProductManager();

router.get('/', async (req,res) => {
    const productos = await productosManager.getProducts()
    res.send({
        productos
    })
})

router.get('/:pid', async (req,res) => {

    try {

        const id = Number(req.params.pid);
        const producto = await productosManager.getProductById(id);

        res.send(producto)
    }
    catch( error ){

        console.log(error)

    }

})
router.post('/',(req,res) => {
    // {
    //     name:'',
    //     age:
    // }
    const pet = req.body;
    pets.push(pet);

    res.send({
        status:'success',
        pet
    })
})



router.put('/',(req,res) => {

})

router.delete('/',(req,res) => {

})

export { router } 