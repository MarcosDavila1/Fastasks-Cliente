import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea} = tareasContext;

    //effect que detecta si hay tarea seleccionda
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ""
            })
        }
    }, [tareaseleccionada])

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ""
    });

    //extraer el nombre del proyecto
    const {nombre} = tarea;

    //si no hay proyecto seleccionado
    if(!proyecto) {
        return null;
    }

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === "") {
            validarTarea();
            return;
        }

        //si es edicion o una nueva tarea
        if(tareaseleccionada === null) {
            //agregar nueva tarea al state tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar tarea
            actualizarTarea(tarea);
        }        

        //obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre: ""
        })
    }

    return ( 
        <div id="dkf" className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submitt btn-block"
                        value={tareaseleccionada ? "Edit Task" : "Create Task"}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">The task name is required</p> : null}
        </div>
     );
}
 
export default FormTarea;