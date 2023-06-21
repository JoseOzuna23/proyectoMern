const mongoose = require ('mongoose')

mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/turismo',{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
.then(()=>console.log('Conexion Exitosa a la base de datos'))
.catch((error=> console.log('Problema en la conexion de la base de datos', error)));