import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField, renderNumber } from "../Utils/renderField";
import { phone } from "../../../utility/validation";

const CategoriaForm = (props) => {
    const { handleSubmit, actualizar, ver } = props;

    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <br></br>
                <div
                    className="mb-4 card card-small p-4"
                    style={{
                        maxWidth: 500,
                    }}
                >
                    <div>
                        <h3 className="m-0 txt-22-n color-003">
                            {actualizar ? "Actualizar" : "Crear"} &Aacute;rea
                        </h3>
                    </div>
                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Nombre</label>
                            <Field
                                component={renderField}
                                name="nombre"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        <a className="btn-secundario2 mr-2" href="/#/categoria">
                            Cancelar
                        </a>
                        {!ver && (
                            <button type="submit" className="btn-primario2">
                                {actualizar ? "Actualizar" : "Registrar"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "CategoriaForm", // a unique identifier for this form
})(CategoriaForm);
