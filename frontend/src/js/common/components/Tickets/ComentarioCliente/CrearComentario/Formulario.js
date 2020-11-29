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
const f_handleSubmit = (e, fn, data) => {
    e.preventDefault();

    console.log("holaa soy handleSubmit ", e);
    console.log("este es el datosss", data);
    // const { handleSubmit } = props;
    const saludo = "roldan te amo";
    fn(e, saludo);
};

const ComentarioForm = (props) => {
    const { handleSubmit, crearComentario } = props;
    console.log("mis props soy comentario", props);

    return (
        // <div className="d-flex flex-column w-100 ">
        <form
        // onSubmit={(e) => {
        //     f_handleSubmit(e, handleSubmit, "1d");
        // }}
        >
            <div className="mb-4 card card-small ">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                        <label
                            className="font-weight-bold "
                            style={{ color: "#003C71" }}
                        >
                            RESPONDER
                        </label>
                        <Field component={renderTextArea} name="contenido" />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn-secundario2"
                        name="comentario"
                        onClick={() => {
                            crearComentario(false);
                        }}
                    >
                        Agregar Nota
                    </button>{" "}
                    <button
                        type="button"
                        className="btn-primario2 mx-2 "
                        name="responder"
                        onClick={() => {
                            crearComentario(true);
                        }}
                    >
                        Responder
                    </button>
                </div>
            </div>
        </form>
        // </div>
    );
};

export default reduxForm({
    form: "comentariosForm", // a unique identifier for this form
})(ComentarioForm);
