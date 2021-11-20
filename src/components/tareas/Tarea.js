import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    const [proyectoActual] = proyecto;


    //funcion eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id)
    }

    //funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //editar tarea cuando hacemos click
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }


    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                    ? 
                        (<button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Complete</button>)
                    :
                        (<button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incomplete</button>)
                    }
            </div>

            <div className="acciones">
                    <button
                        type="button"
                        className="btn btn-primario"
                        onClick={() => seleccionarTarea(tarea)}
                    >Edit</button>

                    <button
                        type="button"
                        className="btn btn-secundario"
                        onClick={() => tareaEliminar(tarea._id)}
                    >Delete</button>
            </div>
        </li>
     );
}
 
export default Tarea;