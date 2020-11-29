import React, { Component } from "react";
import FormularioPropiedades from "./FormularioPropiedades";
import { Field,FieldArray, reduxForm} from "redux-form";
// import FormularioCuerpo from "./FormularioCuerpo";
import DonwloadField from "../../Utils/renderField/downloadField";
import LoadMask from "../../Utils/LoadMask/LoadMask";
// import Comentarios from "./Comentario";
import Comentarios from "../Comentario/ListarComentario/ListaddoContainer";
import FormularioComentario from "../Comentario/CrearComentario/Formulario";
// import FormularioComentario from "../Comentario/CrearComentario/CrearContainer";
import "./cards.css";
import moment from "moment";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { FullModal } from "../../Utils/Modal/FullModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class CrearTicket extends Component {
    componentWillMount = () => {
        const { match, leer, getProyecto } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            // getProyecto();
            leer(id);
        }
    };
    actualizarFormulario = (data) => {
        const { editar, showModal } = this.props;
        const estado = data.idEstado.label;
        if (estado.toUpperCase() == "CERRADO") {
            console.log("abrir el modal");
            showModal(true);
        } else {
            editar(data.id, data);
        }
    };
    actualizarFormularioModal = (data) => {
        const { editar, showModal } = this.props;
        console.log("Actualizo desde el modal");
        showModal(false);
        editar(data.id, data);
    };

    crearComentario = (comentario) => {
        const { match, crearComentario } = this.props;
        // console.log("aca estoy en crearComentario3 ", data);

        // console.log("aca estoy en crearComentario3 tkm ", saludar);

        // console.log("aca estoy en crearComentario3 bb ", b);
        console.log("aca estoy en crearComentario3  ", comentario);

        if (match.params.id) {
            const id = match.params.id;

            const data = {};
            data.idTicket = id;
            data.comentario = comentario;
            crearComentario(data);
        }
    };
    
    renderMisDocumentos = ({ fields, meta: { error, submitFailed } }) => (
    <ul style={{marginTop:'0px', width:'40%' }}>    
        {submitFailed && error && <span>{error}</span>}    
            {fields.map( ( member, index ) => (
                <li key={ index } style={ {listStyle: 'None'}} className="form-inline">
                    {/* <a download href="url_del_fichero">Anchor text</a> */}
                    <Field
                        name={fields.get(index).archivo}
                        label={fields.get(index).archivo}
                        component={ DonwloadField }
                        // download={ fields.get( index ).archivo }
                        href= {fields.get(index).archivo}
                        className='btn btn-success ml-2'
                    />
                </li>
            ) ) }
        </ul>
    )
    
    verdato = (a) => {
        let texto = "Null :(";
        try {
            if (a == "creado") {
                texto = formatDistanceToNow(new Date(this.props.initial[a]), {
                    locale: es,
                });
                texto =
                    texto +
                    ", " +
                    moment(this.props.initial[a]).format("L, h:mm a");
            } else if (a == "nombreCreado") {
                texto = this.props.initial.idUsuarioCliente.nombre;
            } else if (a == "descripcion") {
                texto = this.props.initial.descripcion.html_content;
            } else if (a == "proyectoTicket") {
                texto = this.props.initial.idProyecto.nombre;
            } else if (a == "prioridadTicketNombre") {
                texto = this.props.initial.idPrioridad.nombre;
            } else if (a == "prioridadTicketColor") {
                texto = this.props.initial.idPrioridad.color;
            } else if (a == "idCreado") {
                texto = this.props.initial.idUsuarioCliente.id;
            // } else if (a == "documentos") {
            //     texto = this.props.initial.documentos;
            } else {
                texto = this.props.initial[a];
            }
        } catch (error) {
            texto = "Sin dato";
        }
        return texto;
    };
    render() {
        const {
            match,
            crear,
            location,
            initial,
            crearEtiqueta,
            showModal,
            getProyectos,
            proyectos,
            show_modal,
            loader,
        } = this.props;
        let idActual = 0;
        if (match.params.id) {
            idActual = match.params.id;
        }
        console.log("Hola desde TicketEditar, IndexEditarTicket", proyectos);
        return (
            <LoadMask loading={loader} light>
            <div className="d-flex flex-column w-100 px-4 py-4">

                
                <div className="row">
                    <div className="mb-4 px-1 col-lg-8">
                        {/* +===== */}
                        <div className="mb-4 ">
                            <div className="d-flex align-items-center">
                                <h6
                                    className="flex-grow-1 color-FF4 txt-14-n"
                                    style={{
                                        backgroundColor: "#E5E5E5",
                                        borderRadius: 29,
                                        padding: "8px 18px 8px 18px",
                                        marginBottom: 0,
                                    }}
                                >
                                    #Ticket-{this.verdato("id")}: &nbsp;
                                    <span className="text-dark">
                                        {this.verdato("asunto")}
                                    </span>
                                </h6>
                                <a
                                    className="btn-secundario2 ml-2"
                                    href="/#/cards"
                                >
                                    Regresar
                                </a>
                            </div>

                            {/* ************************************************ */ }
                            { this.props.initial && this.props.initial.documentos.length>0? (
                            <div className="d-flex card mt-2">
                                <div className="form-group has-feedback">
                                    <label htmlFor='documentos' className='m-1 mx-3 txt-12-n text-dark'>Documentos</label>
                                    <FieldArray name="documentos" component={ this.renderMisDocumentos } /> 
                                </div>       
                                </div>
                            ): null}
                            {/* ************************************************ */}
                            <div className="cardTicketStyle px-3 py-2 my-2 ">
                                <div className="d-flex justify-content-between mt-2">
                                    <p className="mb-2 txt-12">
                                        <span className="text-dark txt-12-n">
                                            Cliente: &nbsp;&nbsp;
                                        </span>
                                        {this.verdato("nombreCreado")}

                                        <span className="txt-11">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Hace: {this.verdato("creado")}
                                        </span>
                                    </p>
                                    <div>
                                        <Link
                                            to={`/ticket/${this.verdato(
                                                "id"
                                            )}/editar`}
                                            style={{
                                                textDecoration: "none",
                                                color: "#FFC817",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPen}
                                                className="icono color-FFC"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                {/* 
                                <p className="txt-11">
                                    {this.verdato("descripcion")}
                                </p> */}
                                <div className="box-image"
                                    dangerouslySetInnerHTML={{
                                        __html: this.verdato("descripcion"),
                                    }}
                                />

                                {/* <FormularioEditarTicket
                                                    onSubmit={
                                                        this
                                                            .actualizarFormulario
                                                    }
                                                    crearEtiqueta={
                                                        crearEtiqueta
                                                    }
                                                /> */}
                            </div>
                        </div>

                        {/* *-*-*-*-*-*-*-*-*-*-*COMENTARIOS*-*-*-*-*-*-*-*-*-*-*-*-*- */}

                        <LoadMask loading={false}>
                            <Comentarios idActual={idActual} />
                        </LoadMask>

                        <FormularioComentario
                            // onSubmit={this.crearComentario}
                            crearComentario={this.crearComentario}
                        />
                        {/* <div className="box-image"
                                    dangerouslySetInnerHTML={{
                                        __html: this.verdato("descripcion"),
                                    }}
                                /> */}
                        </div>

                    {/* *-*-*-*-*-*-*-*-*-*-*PROPIEDADES*-*-*-*-*-*-*-*-*-*-*-*-*- */}
                    <div className="mb-2 px-1 col-lg-4">
                        <FormularioPropiedades
                            clientex={this.verdato("nombreCreado")}
                            proyectox={this.verdato("proyectoTicket")}
                            prioridadNombre={this.verdato(
                                "prioridadTicketNombre"
                            )}
                            getProyectos={getProyectos}
                            proyectos={proyectos}
                            prioridadColor={this.verdato(
                                "prioridadTicketColor"
                            )}
                            onSubmit={this.actualizarFormulario}
                            crearEtiqueta={crearEtiqueta}
                        />
                        {/* <FullModal
                            show_modal={show_modal}
                            showModal={showModal}
                        > */}
                        <FullModal
                            show_modal={show_modal}
                            showModal={showModal}
                        >
                            {/* <Formulario
                                onSubmit={funcionEnvio}
                                actualizar={this.state.btActualizar}
                                btGuardar={this.resetAGuardar}
                                showModal={showModal}
                            /> */}
                            <FormularioPropiedades
                                destroyOnUnmount={false}
                                onSubmit={this.actualizarFormularioModal}
                                crearEtiqueta={crearEtiqueta}
                                esModal={true}
                                cerrarModal={() => {
                                    showModal(false);
                                }}
                            />
                        </FullModal>
                    </div>
                    </div>
                    {/* </div> */}
                {/* // </form> */}
                </div>
            </LoadMask>
        );
    }
}

// export default CrearTicket;
export default reduxForm({
    form: "crearTicketForm", // a unique identifier for this form
})(CrearTicket);