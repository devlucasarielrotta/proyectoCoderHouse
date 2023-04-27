//import ProductManager from './productoManager.js';
import express from 'express';
import {router as productsRouter} from './src/routes/products.routes.js'


const app = express(); // crea el servidor
const port = 8080;

// config 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use('/api/products/',productsRouter);
app.use('/api/carts/',productsRouter);


app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})
