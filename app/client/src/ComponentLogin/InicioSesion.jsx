import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../vistas/estilo.css'


const InicioSesion = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState(null);
    const [errores, setErrores] = useState({})
    const [errors, setErrors] = useState({})




    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if (correo === "") {
            setErrores({ correo: 'El correo no puede estar vacío' });
            return;
        }
        if (password === "") {
            setErrores({ password: 'La contraseña  no puede estar vacío ' });
            return;
        }
        axios.post('http://localhost:8000/api/user/login', {
            correo, password
        }, { withCredentials: true })
            .then((res) => {
                console.log(res)

                // Obtener el token de acceso de la respuesta del servidor
                const accessToken = res.data.user;
                // Almacenar el token de acceso en Session Storage
                localStorage.setItem('islogued', true);

                // Almacenar los datos del usuario en la variable de estado
                const accessToken2 = JSON.stringify(res.data.user);
                localStorage.setItem('usuario', accessToken2);
                // Obtener el nombre de usuario
                const nombreUsuario = res.data.user.nombres;

                // Mostrar la alerta SweetAlert2
                Swal.fire({
                    title: 'Inicio de sesión exitoso',
                    text: `¡Bienvenido, ${nombreUsuario}!`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                    

                }).then(() => {
                    navigate('/'); // Redirige a otra pantalla
                });
            }).catch((error) => {
                console.log(error)
                setErrors(error.response.data.msg);

            })

    }
    return (



        <div className='d-flex justify-content-center mt-5'>

            <div className=' bg-info col-3 p-3'>
                <h3 className='text-white'>Iniciar Sesion </h3>
                <form className=' mx-auto bg-secondary p-3 shandow' onSubmit={submitHandler}>
                    <label htmlFor="" className='form-label mt-3 '> Email: </label>
                    <input type="text" className='form-control border-0 imput' onChange={(e) => setCorreo(e.target.value)} />
                    <p> {errors.correo ? <span className='text-danger'> {errors.correo.message}</span> : null}</p>
                    {errores.correo && (<p className="text-danger ">{errores.correo}</p>)}

                    <label htmlFor="" className='form-label mt-3'> Contraseña: </label>
                    <input type="password" className='form-control border-0' onChange={(e) => setPassword(e.target.value)} />
                    {errores.password && (<p className="text-danger ">{errores.password}</p>)}
                    <span>
                        <button className='btn btn-info mt-4 boton mx-4 text-white'>Ingresar</button>
                        <button className='btn btn-info mt-4 boton'> <Link to={`/`} className='d-block  text-decoration-none text-white ' > Cancelar </Link></button>

                    </span>

                 
                </form>


            </div>
        </div>
    )
}

export default InicioSesion
