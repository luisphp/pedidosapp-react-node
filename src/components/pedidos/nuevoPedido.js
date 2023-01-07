import axios from 'axios';
import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';


    function NuevoPedido(props){

    const {id} = useParams();

    //State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);
    

    useEffect( () => {
        // Obener el Cliente 
        const consultarAPI = async () => {
            const result = await clienteAxios.get(`/clients/${id}`)
            console.log('Resultado queryClient > ', result)
            
            guardarCliente(result.data.result[0])
        }

        consultarAPI()

        // actualizarTotal()
        
    }, []);

    // useEffect(() => {
    //     actualizarTotal()
    // }, [productos])

    const buscarProducto = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        clienteAxios.post(`/productos/busqueda/${busqueda}`)
        .then(res => {

            if(res.data.length > 0){
                let productoResultado = res.data[0]
                productoResultado.producto = res.data[0]._id
                productoResultado.cantidad = 0
                
                console.log('Resultado de busqueda > ', res.data)
                console.log('productoResultado > ', productoResultado)

                // Ponerlo en el state
                guardarProductos([...productos, productoResultado])
                
            }else{
                console.log('Sin resultados')
                Swal.fire({
                    type: 'error',
                    title: 'Sin Resultados',
                    text: '-'
                })
            }
        })
        .catch(error => {
            console.log('No se pudo buscar > ', error)
        })
    }

    // Almacena la busqueda en el State
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }

    const actualizarTotal = () => {
        if(productos.length === 0){
            guardarTotal(0)
            return;
        }

        // recorrer todos los productos y sus cantidad y precios
        let nuevoTotal = 0
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.price))

        guardarTotal(nuevoTotal)

    }

    const restarCantidad = index => {
        console.log("uno menos ", index)
        const todosProductos = [...productos]

        // validar si esta en 0 no puede ir mas alla
        if(todosProductos[index].cantidad === 0) return;

        // decremento
        todosProductos[index].cantidad --;

        // almacenarlo en el state
        guardarProductos(todosProductos)

        // guardarTotal( todosProductos[index].cantidad * todosProductos[index].price)
        actualizarTotal()
    }

    const aumentarCantidad = index => {
        console.log("uno mas ", index)
        const todosProductos = [...productos]

        // validar si esta en 0 no puede ir mas alla
        // if(todosProductos[index].cantidad === 0) return;

        // aumentar
        todosProductos[index].cantidad ++;

        // almacenarlo en el state
        guardarProductos(todosProductos)

        actualizarTotal()

        // guardarTotal( todosProductos[index].cantidad * todosProductos[index].price)
    }

    return (
        <div className="caja-contenido col-9">
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p> {cliente.name} {cliente.lastname}</p>
                <p> {cliente.email}</p>
                <p> {cliente.phone}</p>
            </div>
            

            {/* <form action="/productos" method="POST">
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input type="text" placeholder="Nombre Productos" name="productos"></input>
                </div> */}

                <FormBuscarProducto
                    buscarProducto = {buscarProducto}
                    leerDatosBusqueda = {leerDatosBusqueda}

                    ></FormBuscarProducto>

                <ul className="resumen">
                    {productos.map( (producto, index) => (
                            <FormCantidadProducto producto = {producto} 
                            key={producto._id} 
                            restarCantidad = {restarCantidad}
                            aumentarCantidad = {aumentarCantidad}
                            index = {index}
                            ></FormCantidadProducto>
                        )    
                    )}
                    
                </ul>
                    
                <p className='total'> Total: {total}</p>

                {total > 0 ? (
                    <form
                    
                    >
                        <input type="submit"
                            className='btn btn-verde btn-block'
                            value="Realizar pedido"/>
                    </form>
                ) : null}

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"></input>
                </div>
        </div>
    )
}

export default NuevoPedido;