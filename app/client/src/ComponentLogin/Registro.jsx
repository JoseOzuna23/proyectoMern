import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Registro = () => {

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errores, setErrores] = useState({})

    
    

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrores({ confirmPassword:'Las contraseñas no coinciden'});
            return;
          }
        
          
        if (nombres === "")  {
            setErrores({ nombres: 'El nombre no puede estar vacío' });
            return;
        }
       
        if (apellidos === "") {
            setErrores({ apellidos: 'El apellido  no puede estar vacío ' });
            return;
        }
        if (direccion === "") {
            setErrores({ direccion: 'La direccion  no puede estar vacío ' });
            return;
        }
        if (telefono === "") {
            setErrores({ telefono: 'El telefono  no puede estar vacío ' });
            return;
        }
        if (correo === "") {
            setErrores({ correo: 'El correo  no puede estar vacío ' });
            return;
        }
        if (password === "") {
            setErrores({ password: 'La contraseña no puede estar vacia ' });
            return;
        }
        
        axios.post('http://localhost:8000/api/user/register', {
            nombres, apellidos, direccion, telefono, correo, password, confirmPassword,
        },{withCredentials:true})
            .then((res) => {                
                console.log(res)
                Swal.fire({
                    title: 'Se ha registrado exitosamente',                    
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                    

                }).then(() => {
                    navigate('/'); // Redirige a otra pantalla
                });
                
            }).catch((error) => {
                console.log(error)
            })
            
    }
    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='bg-info p-3 col-4'>

                <h3 className='text-white'> Registro de Usuario</h3>

                <form className=' bg-secondary mx-auto p-3 shandow' onSubmit={submitHandler}  >
                    <label htmlFor="" className='form-label mt-2' > Nombres: </label>
                    <input type="text" className='form-control border-0 ' onChange={(e) => setNombres(e.target.value)} />
                    {errores.nombres && (<p className="text-danger ">{errores.nombres}</p>)}
                    <label htmlFor="" className='form-label mt-2' > Apellidos: </label>
                    <input type="text" className='form-control border-0' onChange={(e) => setApellidos(e.target.value)} />
                    {errores.apellidos && (<p className="text-danger ">{errores.apellidos}</p>)}
                    <label htmlFor="" className='form-label mt-2'> Direccion: </label>
                    <input type="text" className='form-control border-0' onChange={(e) => setDireccion(e.target.value)} />
                    {errores.direccion && (<p className="text-danger ">{errores.direccion}</p>)}
                    <label htmlFor="" className='form-label mt-2'>Telefono: </label>
                    <input type="text" className='form-control border-0' onChange={(e) => setTelefono(e.target.value)} />
                    {errores.telefono && (<p className="text-danger ">{errores.telefono}</p>)}
                    <label htmlFor="" className='form-label mt-2'> Email: </label>
                    <input type="text" className='form-control border-0' onChange={(e) => setCorreo(e.target.value)} />
                    {errores.correo && (<p className="text-danger ">{errores.correo}</p>)}
                    <label htmlFor="" className='form-label mt-2'> Contraseña: </label>
                    <input type="password" className='form-control border-0' onChange={(e) => setPassword(e.target.value)} />
                    {errores.password && (<p className="text-danger ">{errores.password}</p>)}
                    <label htmlFor="" className='form-label mt-2'> Confirmar Contraseña </label>
                    <input type='password' className='form-control border-0' onChange={(e) => setConfirmPassword(e.target.value)}/>
                    {errores.confirmPassword && (<p className="text-danger ">{errores.confirmPassword}</p>)}
                    <span>
                    <button className='btn btn-info mt-4 boton mx-4 text-white'>Registrar</button>
                    <button className='btn btn-info mt-4 boton'> <Link to={`/`} className='d-block  text-decoration-none text-white ' > Cancelar </Link></button>

                    </span>
                </form>

            </div>
        </div>
    )
}

export default Registro
