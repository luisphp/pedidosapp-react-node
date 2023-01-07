import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Producto from './producto';



function Productos() {

    const [allProducts, guardarProductos] = useState([]);
    const [refreshProducto, setRefresh] = useState(true);
    
        
    const consultarAPIProducts = async () => {

        const clienteAxiosResult = await clienteAxios.get('/products');
                
        guardarProductos(clienteAxiosResult.data.result)

        console.log('Productos >> ', clienteAxiosResult );
    }

    // Si quieres que una accion se lleve a cabo al cargar el componente
    useEffect(() => {
        if(refreshProducto){
            consultarAPIProducts();
            setRefresh(false)
        }
    }, [refreshProducto] ) // Al pasarle el "allProducts" en el array quiere decir que va a reejecutar el hook, esto lo hacemos para recargar la informacion cuando eliminamos un cliente en este caso

    
    //Spinner de carga
    // if(!allProducts.length) return <Spinner></Spinner>

    return ( 

        <Fragment>
            <h2>Producto</h2>
            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">Productos <i className="fas fa-plus-circle" ></i></Link>
            <ul className="listado-clientes" >

                { allProducts.map( (producto, index)=> {
                    return (
                        // <li key={index}>Name : {cliente.name}</li>
                        <Producto producto={producto} key={producto._id} setRefresh={setRefresh}/>
                        // <p producto={producto} key={index} >{producto.name}</p>
                    );
                }) }
            </ul>
        </Fragment>
     );
}
 
export default Productos;