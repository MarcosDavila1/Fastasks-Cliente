import React, {Fragment, useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //state proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ""
    });

    const {nombre} = proyecto;

    //lee contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //cuando usuario envia proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //validar proyecto
        if(nombre === "") {
            mostrarError();
            return;
        }

        //agregar state
        agregarProyecto(proyecto);

        //reiniciar el form
        guardarProyecto({
            nombre: ""
        })
    }


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >New Project</button>

            {formulario 
                ? (<form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Project Name"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Create Project"
                        />
                    </form>)

                : null

            }

            {errorformulario ? <p className="mensaje error">A project name is required</p> : null}

        </Fragment>
     );
}
 
export default NuevoProyecto;