import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer los valores
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    //usuario autenticado, registrado o sea duplicado
    useEffect(() => {
        
        if(autenticado) {
            props.history.push("/proyectos");
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    //state para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    });

    const {nombre, email, password, confirmar} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario hace click en iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //validar campos vacios
        if(nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === "") {
            mostrarAlerta("All fields are required", "alerta-error");
            return;
        }

        //password min 6caracteres
        if(password.length < 6) {
            mostrarAlerta("Password must be at least 6 characters", "alerta-error");
            return;
        }

        //2passwords sean iguales
        if(password !== confirmar) {
            mostrarAlerta("Passwords must match", "alerta-error");
            return;
        }

        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });

    }


    return ( 
        <div>
            <div className="form-usuario">
                
                <div className="contenedor-form sombra-dark">
                    <h1>Create New Account</h1>

                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="nombre">Name</label>
                            <input 
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Your Name"
                                value={nombre}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Your Password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="confirmar">Confirm Password</label>
                            <input 
                                type="password"
                                id="confirmar"
                                name="confirmar"
                                placeholder="Confirm your Password"
                                value={confirmar}
                                onChange={onChange}
                            />
                        </div>

                        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

                        <div className="campo-form">
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Sign Up"
                            />
                        </div>
                    </form>

                    <Link to={"/"} className="enlace-cuenta">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
        
     );
}
 
export default NuevaCuenta;