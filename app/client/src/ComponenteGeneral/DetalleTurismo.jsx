import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../vistas/estilo.css'
import Home from './Home'


const DetalleTurismo = () => {

    const [lista, setLista] = useState([]);
    const getItem = () => {

        const autenti = localStorage.getItem("islogued");
        console.log(localStorage?.getItem("islogued"))
        if (autenti) {
            return true;
        } else {
            return false;
        }
    }
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


    useEffect(() => {

        axios.get('http://localhost:8000/api/obtenerturismo', { withCredentials: true })

            .then((res) => {
                console.log(res)
                setLista(res.data)
            }).catch((error) => {
                console.log(error)
            });

    }, []);

    return (
        
        <>
        <Home/>
       
            <div class="row p-5  mx-auto  ">
            
                {
                    lista.map((turismo) => (
                        <div className="col-md-6 p-5" key={turismo.id}>
                            <div className='card  rounded'>
                                <img className='card-img-top hover-zoom' src={turismo.fotos} alt="Card image cap" />
                                <div className='card-body'>
                                    <span>
                                        <h2 className='card-title'> Lugar: {turismo.nombre}</h2>
                                    </span>
                                    <span>
                                        <p className='card-text'> Detalles: {turismo.descripcion}</p>
                                    </span>
                                    <span  className='d-flex textotitulo' > 
                                        <p className='card-text '> Direccion: </p> <p className='datos'> {turismo.direccion}</p>
                                    </span>
                                    <span className='d-flex textotitulo'>
                                    <p className='card-title '>Fecha Disponible:  </p> <p className='datos'>{formatFecha(turismo.fecha)}</p>  
                                    </span>
                                    <span className='d-flex justify-content-around'>
                                    <Link to={`/detalleuno/${turismo._id}`} className='card-text texto text-decoration-underline'> Ver más detalles </Link>
                                    {getItem() ?
                                        <button id='boton-autenticado ' className='btn btn-info texto '>  <Link to={`/detalle/${turismo._id}`} className='d-block me text-white'> Reservar </Link> </button> : ""
                                    }
                                    </span>
                                    
                                    
                                </div>
                            </div>
                        </div>

                    ))

                }
            </div>

        </>
    )
}

export default DetalleTurismo
