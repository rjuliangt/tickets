import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import {
    renderField,
    renderNumber,
    renderSwitch,
} from "../../../Utils/renderField";

const Form = (props) => {
    const { handleSubmit, actualizar, ver, btGuardar } = props;

    return (
        <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
            <label className="txt-12-n color-057">Nombre</label>
            <Field component={renderField} name="nombre" disabled={ver} />

            <fieldset className="txt-12-n color-057 my-3">
                <Field
                    name="activo"
                    label="Activo"
                    value="default"
                    component={renderSwitch}
                    disabled={ver}
                    className="txt-12-n"
                />
            </fieldset>
            <br />
            <div className="d-flex justify-content-center">
                {!ver && (
                    <button type="submit" className="btn-primario2">
                        {actualizar ? "Actualizar" : "Registrar"}
                    </button>
                )}
            </div>
        </form>
    );
};

export default reduxForm({
    form: "tiposForm", // a unique identifier for this form
})(Form);
