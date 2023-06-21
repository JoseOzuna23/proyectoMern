const mongoose = require('mongoose')
const ReservaSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: [true, "Por favor ingrese tu apellido"]
    },
    cantidad: {
        type: Number,
        required: [true, "Por favor ingrese el nombre"]
    },   
   
    nombre: {
        type:String,
        required: [true, "Por favor ingrese el apellido"]  
    },
    usuarioN: {
        type:String,
        required: [true, "No se cargo usuario"]     
    },
    cantidadReserva:{
        type:Number,
        required: [true, "No se cargo cantidad"] 

    }


}, { timestamps: true })

const Reserva = mongoose.model('Reserva', ReservaSchema)
module.exports = Reserva;