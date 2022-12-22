import React, {Fragment, useState} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import { withRouter } from "react-router";

const NuevoCliente = () => {

    let navigate = useNavigate();

    // cliente = state , guardarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        name : '', 
        lastname: '', 
        company: '', 
        email: '', 
        phone: ''
    })

    const actualizarCliente = e => {
        // console.log([e.target.name] +':', e.target.value)

        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
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

    //Guarda un cliente nuevo usando la RestAPI de con axios
    const agregarCliente = (e) => {
        e.preventDefault();

        //enviar peticion a axios
        clienteAxios.post('/clients', cliente)
        .then(response => {
            console.log('Rsponse guardarCliente : ', response)
            if(response.data.message === 'Client saved: '){
                Swal.fire(
                    'Good job!',
                    'Client saved',
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

            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="name"
                            onChange={actualizarCliente}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="lastname"
                            onChange={actualizarCliente}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente" 
                            name="company"
                            onChange={actualizarCliente}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarCliente}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="number" 
                            placeholder="Teléfono Cliente" 
                            name="phone"
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
 
export default NuevoCliente;