import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
// import { withRouter } from "react-router";

const EditarCliente = (props) => {

    // Obtener el Id de la URL usando el Hook
    const {id} = useParams();

    // Hook que permite la redireccion
    let navigate = useNavigate();

    // useEffect se ejecuta cuando el componente carga
    useEffect ( () => {
        consultarAPI();
    }, []);

    //consultarAPI
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clients/${id}`);

        console.log('GET clienteById Server Response: ', clienteConsulta)
        // console.log('GET clienteById Server Response: ', id)

        //colocar en el state
        datosCliente(clienteConsulta.data.result[0])
        
    }

    // cliente = state , datosCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        name : '', 
        lastname: '', 
        company: '', 
        email: '', 
        phone: ''
    })

    const actualizarCliente = e => {
        // console.log([e.target.name] +':', e.target.value)

        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            // Obtener copia del state actual
            ...cliente,  // es importante tener una copia porque si no cada que escribas en un campo va a eliminar u olvidar lo que escribiste antes
            // y se sustituye con esto
            [e.target.name] : e.target.value
        })

        console.log(cliente);
    } 

    //validar formulario
    const validarCliente = () => {
        const {name, lastname, email, company, phone} = cliente

        let valido = !name.length || !lastname.length || !email.length || !company.length || !phone.length

        // return tur o false
        return valido
    }

    // Actualizar un cliente usando la RestAPI con axios
    const updateClientDB = (e) => {
        e.preventDefault();

        //enviar peticion a axios
        clienteAxios.put(`/clients/${id}`, cliente)
        .then(response => {
            console.log('Rsponse updateCliente : ', response)
            if(response.data.result.acknowledged === true){
                Swal.fire(
                    'Good job!',
                    'Client Updated',
                    'success'
                )

                navigate('/', {replace:true})
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! '+ e
                    // footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        })
        .catch(e => {
            console.log('Error al guardar el nuevoCliente : ', e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! '+ e
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        })
    }

    return ( 
        <Fragment>

            <h2>Editar Cliente</h2>

            <form
                onSubmit={updateClientDB}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="name"
                            value={cliente.name}
                            onChange={actualizarCliente}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="lastname"
                            value={cliente.lastname}
                            onChange={actualizarCliente}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente" 
                            name="company"
                            value={cliente.company}
                            onChange={actualizarCliente}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            value={cliente.email}
                            onChange={actualizarCliente}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="number" 
                            placeholder="Teléfono Cliente" 
                            name="phone"
                            value={cliente.phone}
                            onChange={actualizarCliente}/>
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Cliente"
                                disabled={validarCliente()}
                                />
                </div>
            </form>
        </Fragment>
     );
}

//Higer order component --> Es una funcion que toma un componente y etoma un nuevo componente
 
export default EditarCliente;