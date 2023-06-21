import React from 'react'
import '../vistas/estilo.css'
import { Link } from 'react-router-dom';
import DetalleTurismo from './DetalleTurismo';
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
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

    const getItem = () => {

        const autenti = localStorage.getItem("islogued");
        console.log(localStorage?.getItem("islogued"))
        if (autenti) {
            return true;
        } else {
            return false;
        }
    }
    return (

        <div className='container-fluid bg-light vh-100 pt-3 ContainerPrincipal '>
            <header className='container bg-info headeHome d-flex justify-content-between '>
                <span className='text-white'>
                    LugaresTuristico
                </span>
                <span className=''>
                {getItem() ?
                    "": <button className='btn  btn-danger bg-secondary me-3 border-0 mx-2'>   <Link to={`/login`} className='d-block  text-decoration-none text-white ' >  Iniciar Sesion </Link></button>
                }
                {getItem() ?
                   "": <button className='btn btn-danger bg-secondary border-0 mx-2'>   <Link to={`/register`} className='d-block text-decoration-none text-white ' >  Registrarse </Link></button>
                } 
                    {getItem() ?
                    <button className='btn bg-secondary text-white ' onClick={handleLogout}> Cerrar Sesion</button>: ""
                    }
                </span>
            </header>
            <body className=''>
                <section>
                    <div>                     

                        <DetalleTurismo/>

                    </div>
                    <div>

                    </div>

                </section>
            </body>

        </div>
    )
}

export default Home
