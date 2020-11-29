import React, { Component } from "react";
import Formulario from "./Formulario";

class CrearRol extends Component {
    componentWillMount = () => {
        const { match, getPermisos, getPermisosCreate } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            // console.log(id)
            getPermisos(id);
        }
        if (!match.params.id) {
            getPermisosCreate();
        }
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        // getPermisos(data.id, data);
        editar(data.id, data);
    };

    render() {
        const { match, crear, location, todosLosPermisos } = this.props;
        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crear;

        return (
            <div className="d-flex flex-column w-100">
                <Formulario
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={ location.pathname.includes( "ver" ) }
                    todosLosPermisos={todosLosPermisos}
                />
            </div>
        );
    }
}

export default CrearRol;
