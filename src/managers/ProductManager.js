import {existsSync, promises} from 'fs'
const path = './db/products.json' ;

class ProductManager {
    
    getProducts = async () => {
      
        try{

            if(existsSync(path)){
                // leo el archivo 
                const data = await promises.readFile(path,'utf-8')

                // se parsea a json
                const productosJSON = JSON.parse(data);

                return productosJSON;
            }else {

                return []

            }

        }catch( error ){

            console.log( error );
            throw  Error `${ error.message }`

        }
    }

    addProduct = async ( producto ) => {

        try {

          const { thumbnail, ...productoNuevo } = producto;
          

          const productos = await this.getProducts();

          // ************ validaciones generales ***********
          if ( productos.find(( p ) => p.code === productoNuevo.code )) {
            throw  Error(`El producto ${ productoNuevo.title } no se registro ya que el codigo ${ productoNuevo.code } ya existe registrado para otro producto, ingrese otro codigo por favor`);
          }

          for ( const propiedad in productoNuevo ) {
            if ( productoNuevo[propiedad] === undefined || productoNuevo[propiedad] === null || productoNuevo[propiedad] === '' ) {
              throw  Error(`Propiedad ${propiedad} con valor ${productoNuevo[propiedad]} es invalido, \nPor favor ingrese un valor valido`);
            }
          }

          // ************ validaciones especificas *********** 
          const { title, description, code, price, status, stock, category } = productoNuevo;
          
          if(
             typeof (title) !== 'string' || 
             typeof (description) !== 'string' || 
             typeof (code) !== 'string' || 
             typeof (price) !== 'number' || 
             typeof (status) !== 'boolean' && ( status !== true || status !== false )  || 
             typeof (stock) !== 'number' || 
             typeof (category) !== 'string' ){

             return   Error(`Los tipos de datos no coinciden o faltan argumentos, vuelva a intentar`);
          }


          // agregamos thumbnail si existe
            if( Array.isArray(thumbnail) && thumbnail.every(elemento => typeof (elemento) === 'string')){
                productoNuevo.thumbnail = thumbnail;
            } else {
                productoNuevo.thumbnail = [];
          }

          productos.length === 0 ? ( productoNuevo.id = 1 ) : ( productoNuevo.id = productos[productos.length - 1].id + 1 );
          productos.push(productoNuevo);
    
          // lo transforma el arreglo a cadena de texto
          await promises.writeFile( path, JSON.stringify(productos, null, '\t') );
          
          return productoNuevo;

        } catch ( error ) { 

            console.log( error );
            return  Error `${ error.message }`

        }
      };

      getProductById = async (id) => {

        try {

          const productos = await this.getProducts();
          const producto = productos.find( (p) => p.id === id );

          if(!producto){
            console.log(`El producto con id ${id}, no existe`)
            return [];
          }

          return producto;
          
        } catch ( error ) {

            console.log( error );
            throw  Error `${ error.message }`

        }
      };

      updateProduct = async ( id , productoActualizar ) => {

        try {

            const productos = await this.getProducts();
            const posicion = productos.findIndex( (p) => p.id === id ); 

            if( posicion !== -1 ) {

                productos[posicion] = {
                    ...productos[posicion],
                    ...productoActualizar
                }

                await promises.writeFile( path, JSON.stringify(productos, null, '\t' ));

                console.log('Producto actualizado correctamente ' , productos[posicion]);

            }else {

                console.log(`Error, Producto con id ${id} no encontrado, por lo tanto no se pudo actualizar `)
                
            }
        }catch ( error ) {

            console.log( error );
            throw  Error `${ error.message }`

        }

      }

      deleteProduct = async (id) => {

        try {

            const productos = await this.getProducts();
            const posicion = productos.findIndex( (p) => p.id === id );

            if( posicion !== -1 ) {
                productos.splice( posicion, 1 );
    
                await promises.writeFile(path, JSON.stringify(productos, null, '\t'));
    
                console.log(`Producto con id ${id} eliminado correctamente.`)

            }else {

                console.log(`Error, Producto con id ${id} no encontrado `)

            }
          

          } catch ( error ) {

            console.log( error );
            throw  Error `${ error.message }`

         }

      };
}


export default  ProductManager
