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
    renderTextArea,
} from "../../../Utils/renderField";

const ComentarioForm = (props) => {
    const { handleSubmit, actualizar } = props;
    console.log("mis props soy comentario", props);

    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                            <label>Comentarios</label>
                            <Field
                                component={renderTextArea}
                                name="contenido"
                            />
                        </div>
                    </div>
                    <br />
                    <br />

                    <button type="submit" className="btn btn-primary btn-sm">
                        {actualizar ? "Actualizarss " : "Registrar "}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "comentariosForm", // a unique identifier for this form
})(ComentarioForm);
