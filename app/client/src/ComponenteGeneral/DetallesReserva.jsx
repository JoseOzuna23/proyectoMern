import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Home from './Home';


const DetallesReserva = () => {
    const [listareserva, setListareserva] = useState([]);
    const [usuarioN, setUsuarioN] = useState('');
    const { id } = useParams()
    const [loading, setLoading] = useState(true);

    const obtenerTokenUsuario = () => {
        const token = localStorage.getItem('usuario');
        if (token) {
            return JSON.parse(token);
        } else {
            console.log('No se encontró el token en el localStorage');
            return null;
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

    const eliminarReserva = (_id) => {
        
        Swal.fire({
            title: '¿Estás seguro/a?',
            text: '¿Quieres eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8000/api/eliminarreserva/${_id}`)
                    .then((res) => {
                        Swal.fire(
                            'Eliminado!',
                            'Si quiere hacer otra reserva vaya a la página principal.',
                            'success'
                        ).then(() => {
                            const nuevaListaReserva = listareserva.filter(
                                (reserva) => reserva._id !== _id
                            );
                            setListareserva(nuevaListaReserva);
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'error');
            }
        });
    };


    useEffect(() => {
        const tokenUsuario = obtenerTokenUsuario();
        if (tokenUsuario) {
            setUsuarioN(tokenUsuario.nombres);

            axios.get('http://localhost:8000/api/obtenerreserva')

                .then((res) => {
                    console.log(res)
                    // Filtrar las reservas por usuario actual
                    console.log(res.data)
                    const reservasUsuario = res.data.filter((reserva) => reserva.usuarioN === tokenUsuario.nombres);
                    setListareserva(reservasUsuario)
                    setLoading(false);
                }).catch((error) => {
                    console.log(error)
                    setLoading(false);
                });
        }

    }, []);



    return (
        <>
        <Home/>
            <button className='btn border border-3 text-info bg-white mt-4 boton border-info'> <Link to={`/`} className='d-block  text-decoration-none  ' > Pagina Principal </Link></button>
            <div class="row p-4 mx-auto  ">
                {
                    listareserva.map((reserva) => (
                        <div className="col-md-6 p-5" key={reserva.id}>
                            <div className='card rounded'>
                                <span>
                                    <h2 className='card-header bg-info '> Lugar de Reserva: <span className=''>{reserva.nombre} </span> </h2>
                                </span>
                                <div className='card-body'>
                                    <span>
                                        <p className='card-text'> Usuario: {reserva.usuarioN}</p>
                                    </span>
                                    <span className=''>
                                        <p className='card-title '>Fecha Reservada:  {formatFecha(reserva.fecha)}</p>
                                    </span>
                                    <span className='' >
                                        <p className='card-text '> Cantidad de Reserva:   {reserva.cantidadReserva}</p>
                                    </span>
                                    <button className="btn btn-danger" onClick={() => eliminarReserva(reserva._id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>

                    ))

                }
            </div>

        </>

    )
}

export default DetallesReserva
