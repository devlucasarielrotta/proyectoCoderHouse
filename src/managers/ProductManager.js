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

          // ************ validaciones ***********
          if ( productos.find(( p ) => p.code === productoNuevo.code )) {
            throw new Error(`El producto ${ productoNuevo.title } no se registro ya que el codigo ${ productoNuevo.code } ya existe registrado para otro producto, ingrese otro codigo por favor`);
          }

          for ( const propiedad in productoNuevo ) {
            if ( productoNuevo[propiedad] === undefined || productoNuevo[propiedad] === null || productoNuevo[propiedad] === '' ) {
              throw new Error(`Propiedad ${propiedad} con valor ${productoNuevo[propiedad]} es invalido, \nPor favor ingrese un valor valido`);
            }
          }

          


          // agregamos thumbnail si existe
          if( thumbnail ) {
            productoNuevo.thumbnail = thumbnail;
          }

          productos.length === 0 ? ( productoNuevo.id = 1 ) : ( productoNuevo.id = productos[productos.length - 1].id + 1 );
          productos.push(productoNuevo);
    
          // lo transforma el arreglo a cadena de texto
          await promises.writeFile( path, JSON.stringify(productos, null, '\t') );
          return productoNuevo;

        } catch ( error ) { 

            console.log( error );
            throw new Error `${ error.message }`

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
            throw new Error `${ error.message }`

        }
      };

      updateProduct = async ( id , productoActualizado ) => {

        try {

            const productos = await this.getProducts();
            const posicion = productos.findIndex( (p) => p.id === id ); 

            if( posicion !== -1 ) {

                productos[posicion] = {
                    ...productos[posicion],
                    ...productoActualizado
                }

                await promises.writeFile( path, JSON.stringify(productos, null, '\t' ));

                console.log('Producto actualizado correctamente ' , productos[posicion]);

            }else {

                console.log(`Error, Producto con id ${id} no encontrado, por lo tanto no se pudo actualizar `)
                
            }
        }catch ( error ) {

            console.log( error );
            throw new Error `${ error.message }`

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
            throw new Error `${ error.message }`

         }

      };
}


export default  ProductManager
