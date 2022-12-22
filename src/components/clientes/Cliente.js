import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';


function Cliente({cliente, setRefresh}){

    const {_id, name, lastname, company, email, phone} = cliente

    //eliminar cliente

    const eliminarCliente = (id) => {
        
        // console.log('Eliminando ... ', id);
        const navigate = useNavigate

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                //enviar peticion a axios
                clienteAxios.delete(`/clients/${id}`)
                .then(response => {
                    console.log('Response delete cliente : ', response)
                    if(response.data.message === 'Cliente Eliminado'){
                        Swal.fire(
                            'Deleted!',
                            'Client has been deleted.',
                            'success'
                        )
                        // navigate('/', {replace:true})
                        setRefresh(true);
                        
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! '+response.data
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
          })
        
    }

    return(          
              <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{name} {lastname}</p>
                        <p className="empresa">Company {company}</p>
                        <p>{email}</p>
                        <p>Phone: {phone}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul" >
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>
                        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-azul" >
                            <i className="fas fa-plus"></i>
                            Nuevo Pedido 
                        </Link>
                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={ () => eliminarCliente(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
            )

}
// {"_id":"62aef12396234bef36d50dd7","name":"Martian","lastname":"Japeeto","company":"azteca","email":"carreo@correo.com","phone":"123456","__v":0}

export default Cliente;