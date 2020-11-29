import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField, renderNumber } from "../Utils/renderField";

const UsuarioForm = (props) => {
    const { handleSubmit, actualizar, ver } = props;
    console.log("VER ->", ver);
    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <Field component={renderField} name="nombre" disabled={ver} />
            <br />
            <br />
            <label>Dirección</label>
            <Field component={renderField} name="apellido" disabled={ver} />
            <br />
            <br />
            <label>Teléfono</label>
            <Field component={renderField} name="telefono" disabled={ver} />
            <br />
            <br />
            <label>Aprobado</label>
            <Field component={renderField} name="activo" disabled={ver} />
            <br />
            <br />
            {!ver && (
                <button type="submit" className="btn btn-primary btn-sm">
                    {actualizar ? "Actualizar Usuario" : "Registrar Usuario"}
                </button>
            )}
            <a className="btn btn-secondary btn-sm ml-2" href="/#/Usuario">
                Cancelar
            </a>
        </form>
    );
};

export default reduxForm({
    form: "Usuario", // a unique identifier for this form
})(UsuarioForm);
