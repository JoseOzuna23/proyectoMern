import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../vistas/estilo.css'
import Home from './Home'


const Reserva = () => {
    const [turismo, setTurismo] = useState({})
    const { id } = useParams()

    const navigate = useNavigate()
    const getItem = () => {

        const autenti = localStorage.getItem("islogued");
        console.log(localStorage?.getItem("islogued"))
        if (autenti) {
            return true;
        } else {
            return false;
        }
    }
    

    useEffect(() => {

        axios.get(`http://localhost:8000/api/detalleuno/${id}`, { withCredentials: true })

            .then((res) => {
                console.log(res)
                setTurismo(res.data)

            }).catch((error) => {
                console.log(error)
            })


    }, [id]);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                // Cierre de sesión exitoso
                console.log('Sesión cerrada');
                localStorage.removeItem("islogued");
                localStorage.removeItem("usuario");
                navigate('/')

            } else {
                // Error al cerrar sesión
                console.log('Error al cerrar sesión');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    // Función para formatear la fecha
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
        const year = date.getFullYear();

        // Concatenar los componentes de la fecha en el formato deseado
        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

        return formattedDate;
    };
    return (
        <>
        <Home/>
        <div className='row p-5  '>
            <div className='border col-10 border-3 p-5 mx-auto'>
                <span className='d-flex justify-content-between '>
                <button className='btn border border-3  border-info text-info bg-white mt-4 boton'> <Link to={`/`} className='d-block  text-decoration-none  ' > Pagina Principal </Link></button>
                    <span className=''>
                     {getItem() ?
                    <button id='boton-autenticado ' className='btn btn-info mt-4 boton '>  <Link to={`/detalle/${turismo._id}`} className='d-block me text-white'> Reservar </Link> </button>: ""
                    }
                    </span>
                    
                </span>
                <h3 className='mt-3'><span className='fw-bold' > Nombre del lugar: </span>{turismo.nombre}</h3>
                <span>
                    <img className='mt-3' src={turismo.fotos} alt="Logotipo de la empresa XYZ" />
                </span>
                <h1 className='mt-3'> Descripcion: </h1> <p className='mt-3 p-3 des'>{turismo.descripcion}</p>
                <span className='d-flex textotitulo'>
                    <p className='card-title '>Fecha Disponible:  </p> <p className='datos'>{formatFecha(turismo.fecha)}</p>
                </span>
                <span className='d-flex textotitulo' >
                    <p className='card-text '> Direccion: </p> <p className='datos'> {turismo.direccion}</p>
                </span>
                <span className='d-flex textotitulo' >
                    <p className='card-text '> Correo Electronico: </p> <p className='datos'> {turismo.correo}</p>
                </span>
                <span className='d-flex textotitulo' >
                    <p className='card-text '> Numero par contacto: </p> <p className='datos'> {turismo.telefono}</p>
                </span>
                <span className='d-flex textotitulo' >
                    <p className='card-text '> Cantidad Disponible para reservar: </p> <p className='datos'> {turismo.cantidad}</p>
                </span>
            </div>


        </div>
        </>
    )
}

export default Reserva
