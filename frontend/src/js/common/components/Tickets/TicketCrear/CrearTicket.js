import React, { Component } from "react";
import Formulario from "./Formulario";
import QuillEditor from "../Quill/QuillEditor";
class CrearTicket extends Component {
    componentWillMount = () => {
        const { match, leer, getDocumentosTickets } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer( id );
            // getDocumentosTickets(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        console.log("Hola desde CrearTocket");
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
            registrarUserDesdeTicket,
            getProyectos,
            registrarProyectoDesdeTickets,
            proyectos,
            show_form_usuarios,
            MostrarOcultarModal,
            setFiles,
            todosLosDocs,
            loader,
        } = this.props;
        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crear;

        return (
            <div className="d-flex flex-column w-100 px-3">
                {/* <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={true}
                    onFilesChange={true}
                    // onEditorChange={onEditorChange}
                    // onFilesChange={onFilesChange} */}
                {/* /> */}
                <Formulario
                    proyectos={ proyectos }
                    getProyectos={ getProyectos }
                    onSubmit={ funcionEnvio }
                    actualizar={ match.params.id ? true : false }
                    ver={ location.pathname.includes( "ver" ) }
                    showForm={ showForm }
                    show_form={ show_form }
                    registrarProyecto={ registrarProyecto }
                    registrarProyectoDesdeTickets={ registrarProyectoDesdeTickets }
                    registrarUserDesdeTicket = {registrarUserDesdeTicket}
                    show_form_usuarios = {show_form_usuarios}
                    MostrarOcultarModal = {MostrarOcultarModal}
                    idTicket={ match.params.id }
                    setFiles={ setFiles }
                    todosLosDocs={todosLosDocs}
                    setFiles={setFiles}
                    loader={loader}
                />
            </div>
        );
    }
}

export default CrearTicket;
