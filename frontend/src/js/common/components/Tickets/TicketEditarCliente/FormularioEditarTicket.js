import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
// import { Markup } from "interweave";
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

import QuillEditor from "../Quill/QuillEditor";
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
    const { handleSubmit, actualizar, ver, crearEtiqueta } = props;
    // const [etiquet, setetiquet] = useState({})

    // console.log(props);
    return (
        <form onSubmit={handleSubmit}>
            <div className="ml-2 mb-4  ">
                {/* <div className="p-0 pt-3 d-flex flex-column flex-md-row"> */}
                <div className="d-flex flex-column flex-1 mx-3">
                    {/* <div className="d-flex flex-column flex-1 mx-3"> */}
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
                            component={renderField}
                            className="form-control"
                            disabled={ver}
                        /> */}
                        <Field
                            name="descripcion"
                            component={QuillEditor}
                            // placeholder="descripcion"
                            // component={renderField}
                            // type="text"
                            // className="form-control"
                            // disabled={ver}
                        />
                    </div>
                </div>

                <div className="botones text-right">
                    <button type="submit" className="btn btn-sm text-right ">
                        Editar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "ticketForm", // a unique identifier for this form
})(TicketForm);
