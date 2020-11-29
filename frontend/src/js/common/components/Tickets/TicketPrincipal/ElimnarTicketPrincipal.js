import React, { Component } from "react";
import Eliminar from "./EliminarTicket";
class crearEliminacion extends Component {
    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer(id);
        }
    };

    actualizarFusion = (data) => {
        const { editar } = this.props;
        editar(data.id, data);
    };

    render() {
        const {
            match,
            crearFusion,

            location,
            registrarFusion,
        } = this.props;
        const funcionEnvio = match.params.id
            ? this.actualizarFusion
            : crearFusion;

        return (
            <div className="d-flex flex-column w-100">
                <Eliminar
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                    registrarFusion={registrarFusion}
                />
            </div>
        );
    }
}

export default crearEliminacion;
