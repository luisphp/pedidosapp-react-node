// imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import { Fragment } from 'react';
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

function App(){
   return (
      <Router>
         <Fragment>
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
                     </Routes>
                  </main>                
            </div>
         </Fragment>
      </Router>
   )
}

export default App;
