import React, { Component } from "react";
import Formulario from "./Formulario";

class Crear extends Component {
    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer(id);
        }
        console.log('props 1 ',this.props)
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        const { contenido } = data;
        const dataEditado = { contenido };
        editar(data.id, dataEditado);
    };

    render() {
        const { match, crear, location, idticket, loader } = this.props;
        console.log('props 2',this.props)
        const funcionEnvio = match.params.id ? this.actualizarFormulario : null; //this.f_crearComentario;
        return (
            <div className="d-flex flex-column w-100">
                <Formulario
                    // onSubmit={funcionEnvio}
                    onSubmit={funcionEnvio}
                    // actualizar={match.params.id ? true : false}
                    // actualizar={false}
                    actualizar={match.params.id ? true : false}
                    idTicket={idticket}
                    loader={loader}
                    // ver={location.pathname.includes("ver")}
                    // ver={false}
                />
            </div>
        );
    }
}

export default Crear;
