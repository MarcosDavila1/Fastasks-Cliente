import React, {useContext, Fragment} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    //obtener el state de proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //obtener las tareas
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext;

    //si no hay proyecto seleccionado
    if(!proyecto) {
        return <h2>Select or Create a New Project</h2>
    }

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
        

    return ( 
        <Fragment>
            <h2>Project: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?
                        (<li className="tarea"><p>There are no tasks, create one to see it here</p></li>)
                    :
                        <TransitionGroup>
                            {(tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea 
                                
                                tarea={tarea}
                                />
                            </CSSTransition>
                            )))}
                        </TransitionGroup>
                }
            </ul>
            
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >Delete Project &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;