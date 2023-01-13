import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import  WordCloud  from './wordcloud2.js'; // Or the extension could be just `.js`
import clienteAxios from '../../config/axios';

function Pedidos() {

    useEffect(() => {
        // console.log('IsEnabled= ', WordCloud.isSupported)
        // WordCloud.stop();
        // WordCloud('legionario', 
        // {list : [['Amazon', 100,'wwww.amazon.com'],['Google', 180, 'www.google.com'],['Yahoo', 60, 'wwww.yahoo.com']], 
        // fontWeight: 'Bold', 
        // click: (e) => {
        //     console.log('Hello > ', e[2])
        //     window.open(e[2]);
        //     }
        // })
        // WordCloud.minFontSize()
    }, [])

    const [pedidos, guardarPedidos] = useState([])

    useEffect(()=>{
        clienteAxios.get('/pedidos')
        .then(result => {
            console.log('Pedidos encontrados: ', result)
            guardarPedidos(result.data.orders)
        })
        .catch(erro => {
            Swal.fire({
                type: 'error',
                title: 'No se ha hecho ningun pedido',
                text: '-'
            })
        })
    }, [])

    return ( 
        <Fragment>

            <h2>Pedidos</h2>
            {/* <div id="legionario" classNameName='legionarioStyle'></div> */}

Swal

            <ul className="listado-pedidos">
            {pedidos.map(p => 
                // <div>{p.Client._id}</div>
                <li className="pedido" key={p._id}>
                    <div className="info-pedido">
                        <p className="id">ID: {p._id}</p>
                        <p className="nombre">Cliente: {p.Client.name} {p.Client.lastname}</p>

                        <div className="articulos-pedido">
                            <p className="productos">Artículos Pedido: </p>
                            <ul>
                            {p.Order.map(o => 
                                <li key={p._id + o.producto._id}>
                                    <p>{o.producto.name}</p>
                                    <p>Precio: $ {o.producto.price}</p>
                                    <p>Cantidad: {o.cantidad}</p>
                                </li>
                            )}
                            </ul>
                        </div>
                        <p className="total">Total: $ {p.Total} </p>
                    </div>
                    <div className="acciones">
                        {/* <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Pedido
                        </a> */}

                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
                )}
            </ul>

        </Fragment>
     );
}
 
export default Pedidos;