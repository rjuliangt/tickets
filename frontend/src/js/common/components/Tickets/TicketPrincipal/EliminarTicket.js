import React from "react";
import { reduxForm, FieldArray } from "redux-form";


const renderTickets = ({ fields, meta: { error, submitFailed } }) => (
    <table className="table table-sm">
        <thead>
            <tr>
                <th>No. Ticket </th>
                <th>Asunto</th>
            </tr>
        </thead>
        <tbody>
            {fields.map((member, index) => {
                console.log("Dato Modal eliminar", fields.get(index) )
                console.log("Dato Modal eliminar label", fields.get(index).label )
                console.log("Dato Modal eliminar value", fields.get(index).value )
               return( <tr key={index}>
                    <td>{fields.get(index).value}</td>
                    <td>
                        <tr>
                        {fields.get(index).label}
                        </tr>
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

const EliminarTicket = ({ datos, handleSubmit, options }) => {
    console.log("desde eliminar:", datos);
    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <div className="mb-1 ">
                    <div className="border-bottom card-header">
                        <h3 className="txt-22-n color-003">
                            Desea Eliminar Tickets?
                        </h3>
                    </div>
                    <div className="form-group has-feedback flex-1 mx-3">
                        <div
                            style={{
                                textDecoration: "none",
                                color: "#5a6169",
                            }}
                        >
                            <div>
                                <label>Tickets Seleccionados para Eliminar </label>

                                <FieldArray
                                    name="tickets"
                                    component={renderTickets}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type={"submit"}
                            className="btn-primario2 mt-3"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "Eliminarticket", // a unique identifier for this form
})(EliminarTicket);
