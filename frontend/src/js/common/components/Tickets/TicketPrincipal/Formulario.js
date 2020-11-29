import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
    renderField,
    AsyncSelectField,
    SelectField,
    renderSwitch,
    renderFieldRadio,
} from "../../Utils/renderField/renderField";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
const validate = (values) => {
    const errors = {};

    if (values.principal == undefined || values.principal == null) {
        errors.tickets = { _error: "Debe seleccionar un elemento" };
    }

    return errors;
};
const renderTickets = ({ fields, meta: { error, submitFailed } }) => (
    <table className="table table-sm">
        <thead>
            <tr>
                <th>Asunto</th>
                <th>Ticket principal</th>
            </tr>
        </thead>
        <tbody>
            {fields.map((member, index) => {
                console.log("Dato Modal ", fields.get(index) )
                console.log("Dato Modal ", fields.get(index).label )
                console.log("Dato Modal ", fields.get(index).value )
               return( <tr key={index}>
                    <td>{fields.get(index).label}</td>
                    <td>
                        <Field
                            name="principal"
                            type="radio"
                            component={renderFieldRadio}
                            label={fields.get(index).value}
                            value={fields.get(index).value.toString()}
                        />
                    </td>
                </tr>)
            })}

            {submitFailed && error && (
                <tr>
                    <td colSpan={2}>{error}</td>
                </tr>
            )}
        </tbody>
    </table>
);

const Fusion = ({ datos, handleSubmit, options }) => {
    console.log("desde Fusion:", datos);
    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <div className="mb-1 ">
                    <div className="border-bottom card-header">
                        <h3 className="txt-22-n color-003">
                            {/* {me.first_name} {me.last_name} */}
                            FUSIONAR TICKETS
                        </h3>
                    </div>
                    {/* <div className="p-0 pt-3 d-flex flex-column flex-md-row w-100"> */}
                    <div className="form-group has-feedback flex-1 mx-3">
                        <div
                            style={{
                                textDecoration: "none",
                                color: "#5a6169",
                            }}
                        >
                            <div
                            // className="pl-3 p-2 bd-highlight d-flex  flex-column  justify-content-center w 100"
                            // style={{ border: "solid 2px green" }}
                            >
                                <label>Selecciona el Ticket Principal </label>
                                {/* <Field
                                    name="idTicket"
                                    placeholder="Tickets"
                                    component={SelectField}
                                    // component={renderSelectField}
                                    // loadOptions={(e) =>
                                    //     getPropiedades(e, "categoria", true)
                                    // }
                                    className="form-control"
                                    // onChange={filtrar}
                                    options={datos}
                                    // onChange={(e) => {
                                    //     console.log("hola estoy dentro", e);
                                    // }}
                                /> */}
                                <FieldArray
                                    name="tickets"
                                    component={renderTickets}
                                />
                                {/* {options && options.length > 0 && (
                                    <React.Fragment>
                                        {options.map((option, index) => (
                                            <Field
                                                component="input"
                                                type="radio"
                                                name={"tickets"}
                                                key={index}
                                                label={option.label}
                                                value={option.value.toString()}
                                                checked={true}
                                            />
                                        ))}
                                    </React.Fragment>
                                )} */}
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                    <div className="d-flex justify-content-center">
                        <button
                            type={"submit"}
                            // onClick={crearFusion}
                            className="btn-primario2 mt-3"
                        >
                            Fusionar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "Fusion", // a unique identifier for this form
})(Fusion);
