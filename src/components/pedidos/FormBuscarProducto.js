import React, { Fragment } from 'react';

function FormBuscarProducto(props){

    return(
        // Html goes here
        <Fragment>
            <form   
                    action="/productos" 
                    method="POST"
                    onSubmit={props.buscarProducto}
                    >
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Productos" 
                        name="productos"
                        onChange={props.leerDatosBusqueda}></input>
                </div>

                <input type="submit"
                        className='btn btn-azul btn-block' value="Buscar"></input>
            </form>
        </Fragment>
    )
}

export default FormBuscarProducto;