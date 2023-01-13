import React, {Fragment, useContext, useEffect, useState} from 'react';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

import { Link, useNavigate } from "react-router-dom";


// Importamos el context
import {CRMContext} from '../../../src/context/CRMContext'


function Clientes(){

    // trabajar con el useState (lo que vendria siendo el Store de VueJS)
    // clientes = state | guardarClientes = funcion para guardar clientes
    const [allClients, guardarClientes] = useState([]);
    const [refresh, setRefresh] = useState(true);
    let navigate = useNavigate();

    // Utilizamos los valores (el token de autneticado) del context
    const [auth, guardarAuth] = useContext(CRMContext)

    console.log(auth)

    //use effect es similar a component didmount y willmount
    const consultarAPI = async () => {

        // Verificamos si existe un token en nuestro Context 
        if(auth.token !== ''){

            // console.log('Consultando...');
    
            const clienteAxiosResult = await clienteAxios.get('/clients', {
                headers:{Authorization: 'Bearer '+ auth.token}
            });
            
            // colocar el resultado de la consulta a la API en el state
            guardarClientes(clienteAxiosResult.data.result)
    
            console.log('Consultando result', clienteAxiosResult);
        }else{
            navigate('/login', {replace:true});
        }

    
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