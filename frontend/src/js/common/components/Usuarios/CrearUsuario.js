import React, { Component } from "react";
import Formulario from "./Formulario";

const enviarFormulario = () => {
    console.log("Enviando el formulario");
};

class CrearUsuario extends Component {
    componentWillMount = () => {
        const { match, editar } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            editar(id);
        }
    };

    render() {
        console.log("props: ", this.props);
        const {
            match,
            registrarUsuario,
            actualizarUsuario,
            location,
        } = this.props;
        const funcionEnvio = match.params.id
            ? actualizarUsuario
            : registrarUsuario;

        return (
            <div className="d-flex flex-column w-100">
                <h3>Crear Usuario</h3>
                <Formulario
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                />
            </div>
        );
    }
}

export default CrearUsuario;
