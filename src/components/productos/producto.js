import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Productos from "./productos";

function Producto({ producto, setRefresh }) {
    const { _id, name, price, image } = producto;

    // const setRefresh = useNavigate;

    //Eliminar producto
    const eliminarProducto = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                //enviar peticion a axios
                clienteAxios
                    .delete(`/products/${id}`)
                    .then((response) => {
                        console.log("Response delete producto : ", response);
                        if (response.data.message === "Producte Eliminado") {
                            Swal.fire("Deleted!", "Client has been deleted.", "success");
                            // navigate('/', {replace:true})
                            setRefresh(true);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong! " + response.data,
                                // footer: '<a href="">Why do I have this issue?</a>'
                            });
                        }
                    })
                    .catch((e) => {
                        console.log("Error al guardar el nuevoCliente : ", e);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong! " + e,
                            // footer: '<a href="">Why do I have this issue?</a>'
                        });
                    });
            }
        });
    };


    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">$ {price}.00</p>
                {image ? (
                    <img
                        src={`http://localhost:4000/uploads/${image}`}
                        alt="imagen"
                    ></img>
                ) : null}
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
}

export default Producto;
