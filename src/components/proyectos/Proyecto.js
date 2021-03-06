import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //obtener funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} = tareasContext;

    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //fijar un proyecto actual
        obtenerTareas(id); //filtrar las tareas cuando se de click
    }


    return ( 
        <li>
            <button 
                type="button"
                className="btn-proyectos"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;