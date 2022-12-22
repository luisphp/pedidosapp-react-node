import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function EditarProducto(props) {

    //Obtener el id del producto (De los props)
    const { id } = useParams();
    let navigate = useNavigate();

    const [archivo, guardarArchivo] = useState('');
    
    const [producto, guardarProducto] = useState({
        name: '',
        price: '',
        image: ''
    })

    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto, 
            [e.target.name] : e.target.value
        })
        console.log('Update Product >>> ', producto)
    }
    
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0])
    }


    //consultar la api para traer el producto a editar
    const consultarAPI = async () => {
        const productResult = await clienteAxios.get(`/products/${id}`)
        guardarProducto(productResult.data.result[0])
        console.log('>>> ', productResult)
    }

    //editar el producto en la base de datos
    const editarProducto = async e => {
        e.preventDefault()

        //crear un form data 
        const formData = new FormData();
        formData.append('name', producto.name)
        formData.append('price', producto.price)
        if(archivo) formData.append('image', archivo)
        
        try {
            const resp = await clienteAxios.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log('Guardado >>> ', resp)
            Swal.fire(
                'Product Updated!',
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

    // useEffect ---> para cuando el componente carga
    useEffect(() => {
        consultarAPI()
    }, [])

    //Extraer los valores del state
    const {name, price, image} = producto

    return (
        <Fragment>
            <h2>Editar Producto</h2>

            <form 
                onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Producto"
                        name="name"
                        defaultValue={name}
                        onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number"
                        name="price"
                        min="0.00"
                        step="0.01"
                        placeholder="Precio"
                        defaultValue={price}
                        onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {image ? (
                        <img src= {'http://localhost:4000/uploads/'+image} alt={name} width="280"></img>
                    ) : null}
                    <input type="file"
                        name="imagen"
                        onChange={leerArchivo} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Producto" />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarProducto;