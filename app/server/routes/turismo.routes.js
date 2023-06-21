const { authenticate } = require('../config/jwt.config')
const ControladorTurismo = require('../controllers/turismo.controllers')


module.exports = (app) =>{
    app.get('/api/obtenerturismo', ControladorTurismo.obtenerTurismo)
    app.post('/api/crearturismo', ControladorTurismo.crearTurismo)
    app.get('/api/detalleuno/:id',  ControladorTurismo.obtenerDetalleTurismo)
    app.get('/api/detalle/:id',  authenticate, ControladorTurismo.obtenerDetalleTurismo)
    app.put('/api/actualizarturismo/:id',  ControladorTurismo.actualizar)
   
    
    
    

    
    
}