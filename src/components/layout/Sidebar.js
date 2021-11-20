import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';

const Sidebar = () => {
    return ( 
        <aside id="aside">
            <h1>FAST<span>tasks</span></h1>

            <NuevoProyecto />

            <div className="proyectos">
                <h2>Your Projects</h2>

                <ListadoProyectos />
            </div>
        </aside>
     );
}
 
export default Sidebar;