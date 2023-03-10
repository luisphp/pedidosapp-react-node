import React from 'react';

// interface ChildProps {
//     aumentarCantidad: Function,
//     restarCantidad : Function
//   }

// function FormCantidadProducto({producto}){
function FormCantidadProducto(props){

    const {producto, restarCantidad, aumentarCantidad, index, eliminarProducto} = props

    return(
        <li>
            {/* <div>
            <img
                src={`http://localhost:4000/uploads/${producto.image}`}
                alt="imagen"
            ></img>
            </div> */}
            <div className="texto-producto">
                <p className="nombre">{producto.name}</p>
                <p className="precio">$ {producto.price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus" onClick={ () => restarCantidad(index) }></i>
                    <p name="cantidad"    >{producto.cantidad}</p>
                    <i className="fas fa-plus" onClick={ () => aumentarCantidad(index) }></i>
                </div>
                <button type="button" className="btn btn-rojo" onClick={() => eliminarProducto(producto._id)}>
                    <i className="fas fa-minus-circle" ></i>
                        Eliminar Producto 
                </button>
            </div>
        </li>
    )
}

export default FormCantidadProducto;