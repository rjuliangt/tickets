import React, { Component } from "react";

const enviarFormulario = () => {
    console.log("Enviando el formulario");
};

class Activo extends Component {
    render() {
        console.log("props: ", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <h3>Hola Estas desactivado</h3>
            </div>
        );
    }
}

export default Activo;
