import React, { Component } from "react";
import Formulario from "./Formulario";
import QuillEditor from "../Quill/QuillEditor";
class CrearTicket extends Component {
    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        editar(data.id, data);
    };

    render() {
        const {
            match,
            crear,
            location,
            showForm,
            show_form,
            registrarProyecto,
        } = this.props;
        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crear;

        return (
            <div className="d-flex flex-column w-100">
                {/* <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={true}
                    onFilesChange={true}
                    // onEditorChange={onEditorChange}
                    // onFilesChange={onFilesChange} */}
                {/* /> */}
                <Formulario
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                    showForm={showForm}
                    show_form={show_form}
                    registrarProyecto={registrarProyecto}
                    idTicket={ match.params.id }
                />
            </div>
        );
    }
}

export default CrearTicket;
