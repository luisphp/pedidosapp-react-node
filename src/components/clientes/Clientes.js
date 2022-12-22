import React, {Fragment, useEffect, useState} from 'react';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

import { Link } from "react-router-dom";


function Clientes(){

    // trabajar con el useState (lo que vendria siendo el Store de VueJS)
    // clientes = state | guardarClientes = funcion para guardar clientes
    const [allClients, guardarClientes] = useState([]);
    const [refresh, setRefresh] = useState(true);

    //use effect es similar a component didmount y willmount
    const consultarAPI = async () => {

        // console.log('Consultando...');

        const clienteAxiosResult = await clienteAxios.get('/clients');
        
        // colocar el resultado de la consulta a la API en el state
        guardarClientes(clienteAxiosResult.data.result)

        console.log('Consultando result', clienteAxiosResult);
    
    }

    // Si quieres que una accion se lleve a cabo al cargar el componente
    useEffect(() => {
        if(refresh){
            consultarAPI();
            setRefresh(false)
        }
        
    }, [refresh] ) // Al pasarle el "allClients" en el array quiere decir que va a reejecutar el hook, esto lo hacemos para recargar la informacion cuando eliminamos un cliente en este caso

    return (
        <Fragment>
            
            <h2> Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">Clientes <i className="fas fa-plus-circle" ></i></Link>

            <ul className="listado-clientes" >

                { allClients.map( (cliente, index) => {
                    return (
                        // <li key={index}>Name : {cliente.name}</li>
                        <Cliente cliente={cliente} key={cliente._id} setRefresh={setRefresh}/>
                    );
                }) }
            </ul>
        </Fragment>
    )
}

export default Clientes;