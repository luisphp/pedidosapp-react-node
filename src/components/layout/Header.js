import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Header = () => {

    const [auth, guardarAuth] = useContext(CRMContext)
    let navigate = useNavigate()

    const cerrarSesion = () => {
        guardarAuth({
            auth: false,
            token: ''
        })
        
        // redireccionamos
        navigate('/login', {replace:true});
        
        // limpiamos el localStorage
        localStorage.setItem('token', '')
    }

    return(
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>
                    { auth.auth ? ( 
                        <button type="button" 
                        className="btn btn-rojo"
                        onClick={cerrarSesion}>
    
                            <i className="far fa-times-circle"> </i> Log Out 
                        </button>) : ''
                    }
                </div>
            </div>
        </header>
    )

}

    


export default Header;