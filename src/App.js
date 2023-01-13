// imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import { Fragment, useContext } from 'react';
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

import Pedidos from './components/pedidos/pedidos';
import NuevoPedido from './components/pedidos/nuevoPedido';


import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

import Productos from './components/productos/productos';
import EditarProducto from './components/productos/EditarProducto';
import NuevoProducto from './components/productos/NuevoProducto';

import Login from './components/auth/Login'

// Importar el context CRMContext para poder acceder al token que se genero en el backend y se guardo en el localStorage en el componente de login
import {CRMContext, CRMProvider} from './context/CRMContext'


function App(){

   // Utilizar el context en el componente
   const [auth, guardarAuth] = useContext(CRMContext)

   return (
      <Router>
         <Fragment>
            <CRMProvider value={[auth, guardarAuth]}>
               <Header/>
               <div className="grid contenedor contenido-principal">
                  <Navegacion />
                     <main className="caja-contenido col-9">
                        {/* TODO: Routing a los diferentes componentes */}
                        <Routes>
                           <Route exact path="/" element={<Clientes/>} />
                           <Route exact path="/pedidos" element={<Pedidos/>} />
                           <Route exact path="/clientes/nuevo" element={<NuevoCliente/>} />
                           <Route exact path="/clientes/editar/:id" element={<EditarCliente/>} />
                           <Route exact path="/productos" element={<Productos/>} />
                           <Route exact path="/productos/nuevo" element={<NuevoProducto/>} />
                           <Route exact path="/productos/editar/:id" element={<EditarProducto/>} />
                           <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido/>} />
                           <Route exact path="/login" element={<Login/>} />
                        </Routes>
                     </main>                
               </div>
            </CRMProvider>
         </Fragment>
      </Router>
   )
}

export default App;
