//import ProductManager from './productoManager.js';
import  express  from "express";
import { Server } from "socket.io";
import handlebars from 'express-handlebars';
import { router as viewsRouter } from './src/routes/views.routes.js'
import { __dirname } from './utils.js'
import ProductManager from "./src/managers/ProductManager.js";
const productoManager = new ProductManager()

const app = express();
const port = 8080;

app.use(express.static(`${__dirname}/src/public`))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/src/views`)
app.set('view engine', 'handlebars')

app.use('/',viewsRouter)

const server = app.listen(port,() => {
    console.log(`Listen on localhost:${port}`)
})


const io = new Server(server);
// io.on('connection', socket => {

//     console.log('Nuevo cliente conectado')

//     socket.on('message',data => {
//         console.log(data);
//     })

//     socket.emit('evento_socket_individual','Este mensaje solo lo debe recibir el socket');
//     socket.broadcast.emit('eventos_todos_menos_actual','Lo veran todos menos el actual');
//     io.emit('evento_todos','Lo recibiran todos los clientes')
// })
const data = await productoManager.getProducts();

io.on('connection', socket=> {
   
    console.log('Usuario conectado', socket.id);

    socket.emit('cargar-productos',data)

    socket.on('eliminar-producto', async id => {
        
        await productoManager.deleteProduct(Number(id));
       
    })

    socket.on('agregar-producto', async (obj) => {
        console.log("hola")
        await productoManager.addProduct(obj)
    })


    // socket.on('message2', data => {
    //     logs.push({ socketId: socket.id, message: data});
    //     io.emit('log',{logs})
    // })
})