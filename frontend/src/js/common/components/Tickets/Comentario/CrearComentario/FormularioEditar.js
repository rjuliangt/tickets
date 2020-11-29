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
import QuillEditor from "../../Quill/QuillEditor";

const ComentarioForm = (props) => {
    const { handleSubmit, actualizar, idTicket } = props;
    console.log("mis props soy comentario", props);

    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <br></br>
                <div className="mb-4 card card-small p-4">
                    <div>
                        <h3 className="m-0 txt-22-n color-003">Actualizando</h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <Field
                                component={renderTextArea}
                                name="contenido"
                            />
                        </div>
                    </div>
                    <br />
                    <br />

                    <div className=" d-flex justify-content-center">
                        <a
                            className="btn-secundario2 mr-2"
                            href={
                                idTicket
                                    ? `/#/ticket/${idTicket}/ver`
                                    : `/#/cards`
                            }
                        >
                            Cancelar
                        </a>
                        <button type="submit" className="btn-primario2">
                            {actualizar ? "Actualizar " : "Registrar "}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "comentariosForm2", // a unique identifier for this form
})(ComentarioForm);
