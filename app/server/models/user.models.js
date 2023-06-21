const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({

    nombres: {
        type: String,
        required: [true, "Por favor ingrese tu nombre"]

    },
    apellidos: {
        type: String,
        required: [true, "Por favor ingrese tu apellido"]

    },
    direccion: {
        type: String,
        required: [true, "Por favor la direccion"]

    },
    telefono: {
        type: String,
        required: [true, "Por favor la direccion"]

    },
    correo: {
        type: String,
        required: [true, "Por favor ingrese tu correo"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Correo no valido"
        }

    },
    password: {
        type: String,
        required: [true, 'Se requiere Contraseña']

    },
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Contraseñas deben coincidir')
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })

});


const User = model('User', UserSchema);

module.exports = User;