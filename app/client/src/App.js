import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CrearTurismo from './ComponenteGeneral/CrearTurismo';

import Registro from './ComponentLogin/Registro';
import InicioSesion from './ComponentLogin/InicioSesion';
import Home from './ComponenteGeneral/Home';
import Reserva from './ComponenteGeneral/Reserva';
import PaginaReserva from './ComponenteGeneral/PaginaReserva';
import DetallesReserva from './ComponenteGeneral/DetallesReserva';

function App() {
  return (
    <div className="App ">
     <BrowserRouter>
        <Routes >
          <Route path='/' element={<Home/>} />
          <Route path='/crear' element={<CrearTurismo/>} />          
          <Route path='/register' element={<Registro/>} /> 
          <Route path='/login' element={<InicioSesion/>} />        
          <Route path='/detalleuno/:id' element={<Reserva/>} />
          <Route path='/detalle/:id' element={<PaginaReserva/>} />
          <Route path='/reserva' element={<PaginaReserva/>} />
          <Route path='/detallereserva' element={<DetallesReserva/>} />
            

                    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
