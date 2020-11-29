import React, { useState, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
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
    renderNumber,
    renderSwitch,
    AsyncSelectField,
} from "../../Utils/renderField/renderField";

import createSelect from "../../Utils/renderField/createSelectMulti";

import { getPropiedades, getAgente } from "../DatosSelect";
// const proyectos = [
//     { label: "CMR", value: 6 },
//     { label: "CMR FULL", value: 1 },
//     { label: "TV 4K ", value: 2 },
//     { label: "SPOTIFY FULL", value: 3 },
//     { label: "NETFLIX", value: 4 },
//     { label: "otros", value: 5 },
// ];

const TicketForm = (props) => {
    const {
        handleSubmit,
        actualizar,
        ver,
        crearEtiqueta,
        esModal,
        cerrarModal,
        clientex,
        proyectox,
        proyectos,
        getProyectos,
        prioridadNombre,
        prioridadColor,
    } = props;
    // const [etiquet, setetiquet] = useState({})

    console.log("cliente proyectosX ", proyectox);
    return (
        <form onSubmit={handleSubmit}>
            <div className="ml-2 ">
                {!esModal && (
                    <div>
                        <div
                            className="card-header mb-2"
                            style={{
                                border: "2px solid #E5E5E5",
                                borderRadius: 5,
                            }}
                        >
                            <h6 className="m-0 txt-12-n mb-0">
                                Cliente:{"  "}
                                <span className="txt-12">
                                    {!clientex ? "No Definido" : clientex}
                                </span>
                            </h6>
                            <h6 className="m-0 txt-12-n mb-0">
                                Proyecto:{"  "}
                                <span className="txt-12">
                                    {!proyectox ? "No Definido" : proyectox}
                                </span>
                            </h6>
                        </div>
                        <div
                            className="card-header"
                            style={{
                                backgroundColor: !prioridadColor
                                    ? "white"
                                    : prioridadColor,
                            }}
                        >
                            <h6 className="m-0 txt-14-n mb-0">
                                Prioridad:{" "}
                                {!prioridadNombre
                                    ? "No Definido"
                                    : prioridadNombre}
                            </h6>
                        </div>
                    </div>
                )}
                <div
                    className="d-flex flex-column flex-1 txt-11 mt-2 card-header"
                    style={{
                        border: "2px solid #E5E5E5",
                        borderRadius: 5,
                    }}
                >
                    {!esModal ? (
                        <Fragment>
                            {/* <fieldset className="txt-12-n color-057 mb-3">
                                <Field
                                    name="aprobado"
                                    label="Autorizado"
                                    value="default"
                                    component={renderSwitch}
                                    disabled={ver}
                                />
                            </fieldset> */}

                            <div className="form-group has-feedback ">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idTipo"
                                >
                                    Tipo
                                </label>
                                <Field
                                    name="idTipo"
                                    placeholder="Tipo"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/tipos")
                                    }
                                    className="form-control "
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback ">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idEstado"
                                >
                                    Estado
                                </label>
                                <Field
                                    name="idEstado"
                                    placeholder="Estado"
                                    component={AsyncSelectField}
                                    isMulti
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/estados")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idPrioridad"
                                >
                                    Prioridad
                                </label>
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
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idGrupo"
                                >
                                    Area
                                </label>
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
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idProyecto"
                                >
                                    Proyecto
                                </label>
                                <Field
                                    name="idProyecto"
                                    placeholder="idProyecto"
                                    component={SelectField}
                                    isMulti={false}
                                    options={proyectos}
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label className="txt-12-n color-057">
                                    Etiquetas
                                </label>
                                <Field
                                    name="idEtiquetas"
                                    placeholder="Empresa"
                                    component={createSelect}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/etiquetas")
                                    }
                                    className="form-control"
                                    // onChange={saludar}
                                    onCreateOption={crearEtiqueta}
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idUsuarioCliente"
                                >
                                    Cliente
                                </label>
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
                                        console.log(
                                            "hola estoy dentro",
                                            e.value
                                        );
                                    }}
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback ">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idUsuarioAsignado"
                                >
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
                        </Fragment>
                    ) : (
                        <div
                            className="form-group has-feedback  align-self-center"
                            style={{ width: 250 }}
                        >
                            <label
                                className="txt-12-n color-057"
                                htmlFor="idUsuarioResuelto"
                            >
                                Resuelto por:
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
                    )}
                    {!esModal ? (
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn-primario2 m-2">
                                Actualizar
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn-primario2 mb-0 mt-4"
                            >
                                Actualizar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "ticketForm", // a unique identifier for this form
})(TicketForm);
