const mongoose = require('mongoose')
const TurismoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre"]
      
    },
    descripcion: {
        type: String,
        required: [true, "Por favor agregue su descripcion"],
      
    },
    direccion: {
        type: String,
        required: [true, "Por favor ingrese la direccion"]

    },
    telefono: {
        type: String,
        required: [true, "Por favor el numero de telefono"]

    },
    correo: {
        type: String,
        required: [true, "Por favor agregue su correo"],
    },
    fotos: {
        type: String,
        required: [true, "Por favor agregue su contraseña"],
    },
    cantidad:{        
        type:Number,
        required: [true, "Por favor ingrese la cantidad"]
    },
        
    fecha:{
        type:Date,
        required: [true, "Por favor ingrese la fecha"]
    }

}, { timestamps: true })

const Turismo = mongoose.model('Turismo',TurismoSchema)
module.exports = Turismo;