import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function Login(){

    let navigate = useNavigate();
    const [credencial, guardarCredenciales] = useState({})
    const [auth, guardarAuth] = useContext(CRMContext)

    // almacenar lo que el usuario escribe en el state
    const leerDatos = (e) => {
        guardarCredenciales({
            ...credencial, 
            [e.target.name] : e.target.value
        })
    }

    const iniciarSesion = async (e) => {
        e.preventDefault()

        clienteAxios.post('/iniciar-sesion', credencial)
        .then(result => {

            console.log('Login success LOG: ', result)
            const {jwtoken} = result.data

            // localStorage.setItem('jwtoken',jwtoken)
            guardarAuth({token: jwtoken, auth: true})

            // redirect
            navigate('/', {replace:true});

            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: true
              })
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
                footer: '<a href="">Contact Support</a>'
              })
        })
        
    }

    return (
        <div className='login'>
            <h2>LogIn</h2>

            <div className="contener-formulario">
                <form action="">
                    <div className='campo'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' placeholder='here your email' required onChange={leerDatos}/>
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Password</label>
                        <input type="text" name='password' placeholder='here your password' required onChange={leerDatos}/>
                    </div>
                    <input  value="Login" className='btn btn-verde btn-block' onClick={iniciarSesion}/>
                </form>
            </div>
        </div>
    )
}

export default Login