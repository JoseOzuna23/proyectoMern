import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert
import Home from './Home';

// Obtén el valor del token del localStorage se obtiene fuera del componente para que no renderiza
const obtenerTokenUsuario = () => {
    const token = localStorage.getItem('usuario');
    if (token) {
        return JSON.parse(token);
    } else {
        console.log('No se encontró el token en el localStorage');
        return null;
    }
};
//formato de fecha
const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const year = date.getFullYear();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return formattedDate;
};
const PaginaReserva = () => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [cantidadReserva, setCantidadReserva] = useState('')

    const [fecha, setFecha] = useState('')
    const [usuarioN, setUsuarioN] = useState({})

    const [turismo, setTurismo] = useState({})
    const [errores, setErrores] = useState({})

    
    const { id } = useParams()
    const navigate = useNavigate()

    const submitHander = (e) => {
        e.preventDefault();
        if (cantidadReserva > (turismo.cantidad)) {
            // console.log("La cantidad ingresada es mayor a la cantidad disponible");

            Swal.fire({
                title: 'Error',
                text: 'La cantidad ingresada es mayor a la cantidad disponible',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (cantidadReserva === "") {
            setErrores({ cantidadReserva: 'La cantidad de reserva  no puede estar vacío ' });
            return;
        }
        axios.post('http://localhost:8000/api/crearreserva', {
            cantidad,
            fecha,
            nombre,
            usuarioN,
            cantidadReserva
        }).then((res) => {
            console.log(res);

            Swal.fire({ // Muestra la alerta de SweetAlert
                title: 'Reserva creada',
                text: '¡La reserva se ha creado exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar'

            }).then(() => {
                navigate('/detallereserva'); // Redirige a otra pantalla
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    // actualiza para mostrar los datos que viene con el id del lugar
    useEffect(() => {

        axios.get(`http://localhost:8000/api/detalle/${id}`, { withCredentials: true })

            .then((res) => {
                console.log(res)
                setTurismo(res.data)
                setNombre(res.data.nombre);
                setCantidad(res.data.cantidad);
            }).catch((error) => {
                console.log(error)

            })
        // por aqui obtenemos la funcion del guardar token guardamos en la variable y lo renderizamos
        const tokenUsuario = obtenerTokenUsuario();
        if (tokenUsuario) {

            setUsuarioN(tokenUsuario.nombres);
        }

    }, [id]);

    const cantidadActual = async () => {
        try {
            const nuevaCantidadTurismo = turismo.cantidad - cantidadReserva;

            const response = await axios.put(`http://localhost:8000/api/actualizarturismo/${id}`, {
                cantidad: nuevaCantidadTurismo
            });

            // Verificar si la respuesta del servidor contiene la cantidad actualizada
            if (response.data && response.data.cantidad) {
                // Actualizar el estado local con la nueva cantidad
                setTurismo((turismoAnterior) => ({
                    ...turismoAnterior,
                    cantidad: response.data.cantidad
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };



    const currentDate = new Date().toISOString().split('T')[0];
    useEffect(() => {
        setFecha(currentDate);
    }, []);

    return (
        <>
        <Home/>
        <div className='col-4 mx-auto'>
            <form onSubmit={submitHander}>
                <label htmlFor="" className='form-label ' >Nombre</label>
                <input type="text" className='form-control' value={turismo.nombre ? turismo.nombre : ''} onChange={(e) => setNombre(e.target.value)} readOnly />

                <label htmlFor="" className='form-label' >Usuario</label>
                <input type="text" className='form-control' value={usuarioN} onChange={(e) => setUsuarioN({ nombres: e.target.value })} readOnly />

                <label htmlFor="" className='form-label' >Fecha Disponible</label>
                <input type="date" className='form-control' value={fecha || currentDate} onChange={(e) => setFecha(e.target.value)} readOnly />

                <label htmlFor="" className='form-label' >Cantidad Disponible</label>
                <input type="number" className='form-control' value={turismo.cantidad} onChange={(e) => setCantidad(e.target.value)} readOnly />

                <label htmlFor="" className='form-label ' > Ingrese la cantidad de lugares</label>
                <input type="number" className='form-control cortar' value={cantidadReserva} onChange={(e) => setCantidadReserva(e.target.value)} />
                {errores.cantidadReserva && (<p className="text-danger ">{errores.cantidadReserva}</p>)}

                <span className='d-flex justify-content-center'>
                    <button className='btn btn-danger mt-4 me-5' onClick={cantidadActual}> Crear</button>
                    <button className='btn btn-info mt-4 boton'> <Link to={`/`} className='d-block  text-decoration-none text-white ' > Cancelar </Link></button>

                </span>

            </form>

        </div>

        </>
    )
}

export default PaginaReserva
