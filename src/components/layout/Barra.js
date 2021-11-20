import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    //extraer la info de autenticacion
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, [])

    const darkMode = () => {
        const aside = document.getElementById("aside")
        const seccion = document.querySelector(".seccion-principal")
        const header = document.querySelector(".app-header")
        const dkf = document.getElementById("dkf")
        aside.classList.toggle("dark-mode");
        seccion.classList.toggle("dark-mode-seccion");
        header.classList.toggle("dark-mode-barra");
        
        if(dkf) {
            dkf.classList.toggle("dark-mode-form");
        } else {
            return;
        }
    }

    
    
    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hello, <span>{usuario.nombre}</span>!</p> : null}
            

            <nav className="nav-principal">
                <button
                    className="btn-darkm"
                    type="button"
                    onClick={darkMode}
                >Dark Mode</button>

                <button
                    className="btn btn-blankk cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Sign Out</button>
            </nav>
        </header>
     );
}
 
export default Barra;