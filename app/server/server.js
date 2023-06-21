//conFiguracion
const express = require('express')
const app = express();
const cors = require('cors');
const PORT = 8000;

// requerir archivo de configuracion
const cookieParser = require('cookie-parser');
require('./config/config.mongoose')
require('dotenv').config()


//milddleware (ayuda para hacer consulta de tipo post)
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))

// importar las rutas de nuestro servido back end (sirv para facilitar al usuario elegir si desea eliminar o editar )
const Rutas = require('./routes/turismo.routes');
require('./routes/user.routes')(app);
require('./routes/reserva.routes')(app);

Rutas(app)
app.listen(PORT, () => {
    console.log(`servidor corriendo${PORT}`)
})