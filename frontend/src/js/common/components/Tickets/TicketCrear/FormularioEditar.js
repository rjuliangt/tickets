import React from "react";
import { Field, reduxForm } from "redux-form";
import FormularioPro from "../../Proyecto/Formulario";
import CreateModal from "../../Utils/renderField/createModal";
import Modal from "../../Utils/Modal/ReactModal";
import { api } from "../../../../utility/api";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import {
    renderField,
    renderFilePicker,
    SelectField,
    AsyncSelectField,
    renderNumber,
    renderSwitch,
} from "../../Utils/renderField/renderField";

import createSelect from "../../Utils/renderField/createSelectMulti";

import QuillEditor from "../Quill/QuillEditor";
// const proyectos = [
//     { label: "CMR", value: 0 },
//     { label: "CMR FULL", value: 1 },
//     { label: "TV 4K ", value: 2 },
//     { label: "SPOTIFY FULL", value: 3 },
//     { label: "NETFLIX", value: 4 },
//     { label: "otros", value: 5 },
// ];
const getProyecto = (search) => {
    let roles = [];
    return api
        .get("proyecto/proyectosClientes", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    roles.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log(roles);
            return roles;
        })
        .catch(() => {
            return [];
        });
};
const state = {
    roles: [],
};

const Obtenidos = () => {
    console.log("desdeObtenidos", state.roles);
    return state.roles;
};

import { getPropiedades, getAgente } from "../DatosSelect";

const TicketForm = (props) => {
    console.log("que trae handleSubmit", handleSubmit);
    const { handleSubmit, actualizar, ver } = props;
    const {
        showForm,
        show_form,
        isMulti,
        registrarProyecto,
        getProyectos,
        proyectos,
        funcionEnvio,
        registrarQuill,
    } = props;
    console.log("proyectos: ", proyectos);
    console.log("Editar sus props", props);
    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                    <h3 className="m-0">
                        {/* {me.first_name} {me.last_name} */}
                        Ticket Formulario Editar
                    </h3>
                    {/* antes del merge Luis */}
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <div className="form-group has-feedback ">
                            <label htmlFor="idUsuarioCliente">Cliente</label>
                            <Field
                                name="idUsuarioCliente"
                                placeholder="Cliente"
                                component={AsyncSelectField}
                                loadOptions={(e) =>
                                    getPropiedades(e, "usuario/cliente")
                                }
                                onChange={(e) => {
                                    getProyectos(e.value);
                                    let idSeleccionado = e.value;
                                    console.log("hola estoy dentro", e.value);
                                }}
                                className="form-control"
                                disabled={ver}
                            />
                        </div>

                        <div className="form-group has-feedback ">
                            <label htmlFor="asunto">Asunto</label>
                            <Field
                                name="asunto"
                                placeholder="Asunto"
                                component={renderField}
                                type="text"
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                        <div className="form-group has-feedback ">
                            {/* <label htmlFor="asunto">Descripcion</label> */}
                            {/* <QuillEditor
                                name="descripcion"
                                placeholder="Descripcion"
                                // component={QuillEditor}
                                className="form-control"
                                disabled={ver}
                                onSubmit={registrarQuill}
                            /> */}
                            {/* <Field name="descripcion" component={QuillEditor} /> */}
                            {/* <Field
                                name="descripcion"
                                placeholder="descripcion"
                                component={renderField}
                                type="text"
                                className="form-control"
                                disabled={ver}
                            /> */}
                        </div>
                        {/* <div className="form-group has-feedback ">
                            <label htmlFor="cicloVida">Ciclo de Vida</label>
                            <Field
                                name="cicloVida"
                                placeholder="Ciclo de Vida"
                                component={renderField}
                                type="text"
                                className="form-control"
                                disabled={ver}
                            />
                        </div> */}
                        <fieldset>
                            <Field
                                name="aprobado"
                                label="Aprobado"
                                value="default"
                                component={renderSwitch}
                                disabled={ver}
                            />
                        </fieldset>

                        <div className="form-group has-feedback ">
                            <label htmlFor="idTipo">Tipo</label>
                            <Field
                                name="idTipo"
                                placeholder="Tipo"
                                component={AsyncSelectField}
                                loadOptions={(e) =>
                                    getPropiedades(e, "ticket/tipos")
                                }
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        {ver ? (
                            <div className="form-group has-feedback">
                                <label htmlFor="creado">
                                    Fecha de Creación{" "}
                                </label>
                                <Field
                                    name="creado"
                                    placeholder="creado"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    {!ver && (
                        <button type="submit" className="btn-primario2">
                            {actualizar
                                ? "Actualizar Ticket"
                                : "Registrar Ticket"}
                        </button>
                    )}
                    <a className="btn-secundario2 ml-2" href="/#/cards">
                        Cancelar
                    </a>
                </div>
                <br></br>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "ticketForm", // a unique identifier for this form
})(TicketForm);
