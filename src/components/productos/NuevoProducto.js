import React, {useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function NuevoProducto() {

    let navigate = useNavigate();

    // producto = state, guardarState, setState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    const [archivo, guardarArchivo] = useState('');

    // leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto, 
            [e.target.name] : e.target.value
        })
        console.log('Create Product >>> ', producto)
    }

    //Coloar la imagen en el state
    const leerArchivo = e => {
        // console.log('Lo que viene del E.Target.Files > ', e.target.files)
        guardarArchivo(e.target.files[0])
    }

    //Almacena nuevo producto en la base de datos 
    const agregarProducto = async e => {
        e.preventDefault();

        //crear un form data 
        const formData = new FormData();
        formData.append('name', producto.nombre)
        formData.append('price', producto.precio)
        formData.append('image', archivo)
        try {
            const resp = await clienteAxios.put('/products', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log('Guardado >>> ', resp)
            Swal.fire(
                'Product Saved!',
                resp.data.message,
                'success'
              )
              setTimeout(() => {navigate('/productos', {replace:true})}, 3000);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! " + error,
                // footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    }

    return ( 
        <Fragment>
                <h2>Nuevo Producto</h2>

                <form 
                    action="/productos" 
                    method="POST"
                    onSubmit={agregarProducto}>
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input  type="text" 
                                placeholder="Nombre Producto" 
                                name="nombre" 
                                onChange={leerInformacionProducto}/>
                    </div>

                    <div className="campo">
                        <label>Precio:</label>
                        <input type="number" 
                                name="precio" 
                                min="0.00" 
                                step="0.01" 
                                placeholder="Precio" 
                                onChange={leerInformacionProducto}/>
                    </div>
                
                    <div className="campo">
                        <label>Imagen:</label>
                        <input type="file"  
                                name="imagen" 
                                onChange={leerArchivo}/>
                    </div>

                    <div className="enviar">
                            <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                    </div>
                </form>
        </Fragment>
     );
}
 
export default NuevoProducto;