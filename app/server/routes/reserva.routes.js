
const ControladorReserva = require('../controllers/reserva.controllers')
const { authenticate } = require('../config/jwt.config')


module.exports = (app) =>{
    app.post('/api/crearreserva',  ControladorReserva.crearReserva)
    app.get('/api/mostrarreserva', authenticate, ControladorReserva.obtenerReserva)
    app.get('/api/obtenerreserva', ControladorReserva.obtenerDetalleReserva)
    app.delete('/api/eliminarreserva/:id', ControladorReserva.eliminarReserva)
       
     
}