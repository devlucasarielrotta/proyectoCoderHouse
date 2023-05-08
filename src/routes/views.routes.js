import { Router } from 'express';
const router = Router();
import ProductManager from "../managers/ProductManager.js";
const productoManager = new ProductManager()


router.get('/', async (req, res) => {
    const data = await productoManager.getProducts();
    console.log(data)
    res.render('home', {data});
});

router.get('/realtimeproducts', async (req,res)=>{
 
    res.render('realTimeProducts')
})

export {
    router
}