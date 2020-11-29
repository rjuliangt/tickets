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
const getProyectos = (idSeleccionado) => {
    state.roles = [];
    return api
        .post("proyecto/proyectosCliente", { id: idSeleccionado })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    state.roles.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log("Cargando proyectos", state.roles);
            return state.roles;
        })
        .catch(() => {
            return [];
        });
};

const Obtenidos = () => {
    console.log("desdeObtenidos", state.roles);
    return state.roles;
};

import { getPropiedades, getAgente } from "../DatosSelect";

const TicketForm = (props) => {
    const { handleSubmit, actualizar, ver, idTicket } = props;
    const {
        showForm,
        show_form,
        isMulti,
        registrarProyecto,
        registrarQuill,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                    <h3 className="m-0">
                        {/* {me.first_name} {me.last_name} */}
                        Crear Ticket
                    </h3>
                    {/* antes del merge Luis */}
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column flex-1 mx-3">
                        {/* <div className="form-group has-feedback ">
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
                        </div> */}

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
                            <label htmlFor="asunto">Descripcion</label>
                            {/* <QuillEditor
                                name="descripcion"
                                placeholder="Descripcion"
                                // component={QuillEditor}
                                className="form-control"
                                disabled={ver}
                                onSubmit={registrarQuill}
                            /> */}
                            <Field name="descripcion" component={QuillEditor} />
                            {/* <Field
                                name="descripcion"
                                placeholder="descripcion"
                                component={renderField}
                                type="text"
                                className="form-control"
                                disabled={ver}
                            /> */}
                        </div>

                        <fieldset>
                            <Field
                             
                                name="aprobado"
                                label="Aprobado"
                                value="default"
                                component={renderSwitch}
                                disabled="true"
                            />

                        
                        </fieldset>
                        <p></p>



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
                        {/* <fieldset>
                            <Field
                                name="aprobado"
                                label="Aprobado"
                                value="default"
                                component={renderSwitch}
                                disabled={ver}
                            />
                        </fieldset> */}

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
                    {actualizar ? null : (
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="idEstado">Estado</label>
                                <Field
                                    name="idEstado"
                                    placeholder="Estado"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/estados")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="idPrioridad">Prioridad</label>
                                <Field
                                    name="idPrioridad"
                                    placeholder="Prioridad"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/prioridades")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="idGrupo">Area</label>
                                <Field
                                    name="idGrupo"
                                    placeholder="Area"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "categoria")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Etiquetas</label>
                                <Field
                                    name="idEtiquetas"
                                    placeholder="Empresa"
                                    component={createSelect}
                                    isMulti={false}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/etiquetas")
                                    }
                                    className="form-control"
                                    // value={valorPro} X
                                    // onChange={registrarEmpresa} X
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="idProyecto">Proyecto</label>

                                <Field
                                    name="idProyecto"
                                    placeholder="idProyecto"
                                    component={CreateModal}
                                    isMulti={false}
                                    loadOptions={getProyecto}
                                    // initialValues={{
                                    //     tickets: this.state.roles,
                                    // }}
                                    // options={Obtenidos}
                                    // onChange={(e) => {
                                    //     loadOptions = { Obtenidos };
                                    //     // console.log("hola estoy dentro", e.value);
                                    // }}
                                    className="form-control"
                                    disabled={ver}
                                    showForm={showForm}
                                    show_form={show_form}
                                >
                                    <Modal showModal={show_form}>
                                        <FormularioPro
                                            isNested
                                            showForm={showForm}
                                            onSubmit={props.registrarProyecto}
                                        />
                                        {/* <span>Hola otra vez</span> */}
                                    </Modal>
                                </Field>
                            </div>
                            <div className="form-group has-feedback ">
                                <label htmlFor="idUsuarioAsignado">
                                    Asignado
                                </label>
                                <Field
                                    name="idUsuarioAsignado"
                                    placeholder="Asignado"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "usuario/programador")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback ">
                                <label htmlFor="idUsuarioResuelto">
                                    Resuelto
                                </label>
                                <Field
                                    name="idUsuarioResuelto"
                                    placeholder="Asignado"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "usuario/programador")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                        </div>
                    )}
                    {ver ? (
                        <div className="form-group has-feedback">
                            <label htmlFor="creado">Fecha de Creación </label>
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
                <div className="p-0 pt-3  flex-md-row d-flex mb-2 justify-content-center">
                    {!ver && (
                        <button type="submit" className="btn-primario1 ml-3">
                            {actualizar
                                ? "Actualizar Ticket"
                                : "Registrar Ticket"}
                        </button>
                    )}
                    <a className="btn-secundario1 "
                        href={
                            idTicket
                                ? `/#/ticketCliente/${idTicket}/ver`
                                : `/#/ticketCliente`
                        }> 
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
