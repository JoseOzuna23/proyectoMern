const Reserva = require ('../models/reserva.models')
const Turismo = require('../models/turismo.models')


const crearReserva = (req, res)=>{
    Reserva.create(req.body)
    .then((resultado)=>{
        console.log(req.body)
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
    })
}
const obtenerReserva = async  (req, res)=>{    
    
    try{        
        const resultado = await Reserva.find(req.body);
        const miTurismo = await Turismo.findOne(resultado.Turismo);
        var aux = [{reserva : resultado, turismo : miTurismo}]
        res.json(aux)   
            

    } catch(error) {
        console.log(error)
    }

}
const obtenerDetalleReserva = (req, res)=>{
    Reserva.find(req.body)
    .then((resultado)=>{
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
    })

}
const eliminarReserva = (req, res)=>{
    Reserva.deleteOne({_id: req.params.id})
    .then((resultado)=>{
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = {
    crearReserva,  
    obtenerReserva,
    obtenerDetalleReserva,
    eliminarReserva
   
   
}
