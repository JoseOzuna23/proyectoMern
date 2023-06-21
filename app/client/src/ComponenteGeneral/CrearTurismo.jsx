import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const CrearTurismo = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [fotos, setFotos] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [fecha, setFecha] = useState('')
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()

  

    const submitHander = (e) => {
        e.preventDefault()

        if (nombre === "")  {
            setErrores({ nombre: 'El nombre no puede estar vacío' });
            return;
        }
       
        if (descripcion === "") {
            setErrores({ descripcion: 'La descripcion no puede estar vacío ' });
            return;
        }
        if (direccion === "") {
            setErrores({ direccion: 'La direccion no puede estar vacío ' });
            return;
        }
        if (telefono === "") {
            setErrores({ telefono: 'El telefono no puede estar vacío ' });
            return;
        }
        if (correo === "") {
            setErrores({ correo: 'El correo no puede estar vacío ' });
            return;
        }
        if (fotos === "") {
            setErrores({ fotos: 'El campo foto no puede estar vacío ' });
            return;
        }
        if (cantidad === "") {
            setErrores({ cantidad: 'Debe de ingresar la cantidad ' });
            return;
        }
        if (fecha === "") {
            setErrores({ fecha: 'Debe de ingresar la fecha ' });
            return;
        }

        axios.post('http://localhost:8000/api/crearturismo', {
            nombre,
            descripcion,
            direccion,
            telefono,
            correo,
            fotos,
            cantidad,
            fecha
        }).then((res) => {
            console.log(res);
             navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            <h1> Crear Lugares</h1>
            <div className='col-6 mx-auto'>


                <form onSubmit={submitHander}>
                    <label htmlFor="" className='form-label' >Nombre</label>
                    <input type="text" className='form-control' onChange={(e) => setNombre(e.target.value)} />
                   
                    {errores.nombre && (<p className="text-danger ">{errores.nombre}</p>)}

                    <label htmlFor="" className='form-label' > Descripcion</label>
                    <input type="text" className='form-control' onChange={(e) => setDescripcion(e.target.value)} />
                    {errores.descripcion && (<p className="text-danger ">{errores.descripcion}</p>)}

                    <label htmlFor="" className='form-label' > Direccion</label>
                    <input type="text" className='form-control' onChange={(e) => setDireccion(e.target.value)} />
                    {errores.direccion && (<p className="text-danger ">{errores.direccion}</p>)}

                    <label htmlFor="" className='form-label' > Telefono</label>
                    <input type="text" className='form-control' onChange={(e) => setTelefono(e.target.value)} />
                    {errores.telefono && (<p className="text-danger ">{errores.telefono}</p>)}

                    <label htmlFor="" className='form-label' > Correo</label>
                    <input type="text" className='form-control' onChange={(e) => setCorreo(e.target.value)} />
                    {errores.correo && (<p className="text-danger ">{errores.correo}</p>)}

                    <label htmlFor="" className='form-label'> Fotos</label>
                    <input type="text" className='form-control' onChange={(e) => setFotos(e.target.value)} />
                    {errores.fotos && (<p className="text-danger ">{errores.fotos}</p>)}

                    <label htmlFor="" className='form-label'> Cantidad Disponible</label>
                    <input type="number" className='form-control' onChange={(e) => setCantidad(e.target.value)} />
                    {errores.cantidad && (<p className="text-danger ">{errores.cantidad}</p>)}

                    <label htmlFor="" className='form-label'> Fecha Disponible</label>
                    <input type="date" className='form-control' onChange={(e) => setFecha(e.target.value)} />
                    {errores.fecha && (<p className="text-danger ">{errores.fecha}</p>)}

                    <button className='btn btn-info mt-3 p-3'> Crear</button>

                </form>

            </div>

        </div>
    )
}

export default CrearTurismo






