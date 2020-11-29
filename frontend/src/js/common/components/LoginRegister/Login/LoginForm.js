import React from "react";
import { Field, reduxForm } from "redux-form";
import { validate, validators } from "validate-redux-form";
import { renderField } from "../../Utils/renderField";

const LoginForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form
            name="loginForm"
            className="form-validate mb-lg mt-4"
            onSubmit={handleSubmit}
        >
            <div className="form-group has-feedback my-4">
                <label className="txt-14 text-white" htmlFor="email">
                    Email:
                </label>
                <Field
                    name="email"
                    label="Usuario"
                    component={renderField}
                    type="text"
                    className="form-control "
                />
            </div>
            <div className="form-group has-feedback my-4 mb-5">
                <label className="txt-14 text-white" htmlFor="password">
                    Contraseña:
                </label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="buttons-box mt-4">
                <button
                    type="submit"
                    className="btn-primario1 m-1 align-self-center"
                >
                    Ingresar
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "login", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            email: validators.exists()("Este campo es requerido"),
            password: validators.exists()("Este campo es requerido"),
        });
    },
})(LoginForm);
