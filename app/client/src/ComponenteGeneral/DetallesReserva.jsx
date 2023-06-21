import React, { useEffect, useState } from 'react'
import axios from 'axios'



const DetallesReserva = () => {
    const [listareserva, setListareserva] = useState([]);
    const [usuarioN, setUsuarioN] = useState('');

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
                }).catch((error) => {
                    console.log(error)
                });
        }

    }, []);



    return (
        <>

            <div class="row p-5 mx-auto  ">

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
