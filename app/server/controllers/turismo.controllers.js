const Turismo = require('../models/turismo.models')



const obtenerTurismo = (req, res) => {
    Turismo.find(req.body)
        .then((resultado) => {
            res.json(resultado)
        }).catch((error) => {
            console.log(error)
        })
}

const crearTurismo = (req, res) => {
    Turismo.create(req.body)
        .then((resultado) => {
            console.log(req.body)
            res.json(resultado)
        }).catch((error) => {
            console.log(error)
        })
}
const obtenerDetalleTurismo = (req, res) => {
    Turismo.findById(req.params.id)
        .then((resultado) => {
            console.log(resultado)
            res.json(resultado)
        }).catch((error) => {
            console.log(error)
        })
}
const actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        // Buscar el turismo en la base de datos por su ID
        const turismo = await Turismo.findById(id);
        // Actualizar la cantidad del turismo
        turismo.cantidad = cantidad;

        // Guardar los cambios en la base de datos
        await turismo.save();

        res.status(200).json({ success: true, message: 'Cantidad de turismo actualizada correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al actualizar la cantidad de turismo.' });
    }
};
const editarReserva = (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;
    console.log('ID de reserva:', id);

    console.log('Cantidad recibida:', cantidad);

    Turismo.findOneAndUpdate(
        { _id: id },
        { cantidad: cantidad }, // Asegúrate de pasar el valor correcto de cantidad
        { new: true },
    )
        .then((reservaActualizada) => {
            res.json(reservaActualizada);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        });
};


module.exports = {
    obtenerTurismo,
    crearTurismo,
    obtenerDetalleTurismo,
    actualizar,
    editarReserva


}
