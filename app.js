//import ProductManager from './productoManager.js';
import express from 'express';
import { router as productsRouter } from './src/routes/products.routes.js'
import { router as cartsRouter } from './src/routes/carts.routes.js'


const app = express(); // crea el servidor
const port = 8080;

// config 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use('/api/products/',productsRouter);
app.use('/api/carts/',cartsRouter);


app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})
