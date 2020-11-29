import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField, renderNumber } from "../../Utils/renderField";

const RegisterForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form
            name="loginForm"
            className="form-validate mb-lg"
            onSubmit={handleSubmit}
        >
            <div className="form-group has-feedback">
                <label className="txt-14 text-white" htmlFor="first_name">
                    Nombre
                </label>
                <Field
                    name="first_name"
                    label="Nombre"
                    component={renderField}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-14 text-white" htmlFor="last_name">
                    Apellido
                </label>
                <Field
                    name="last_name"
                    label="Apellido"
                    component={renderField}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-14 text-white" htmlFor="phone">
                    Telefono
                </label>
                <Field
                    name="phone"
                    label="Telefono"
                    component={renderField}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-14 text-white" htmlFor="email">
                    Email
                </label>
                <Field
                    name="email"
                    label="Usuario"
                    component={renderField}
                    type="email"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-14 text-white" htmlFor="password">
                    Contraseña
                </label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-14 text-white" htmlFor="confirmPassword">
                    Confirmar Contraseña
                </label>
                <Field
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="buttons-box">
                <button
                    type="submit"
                    className="btn-primario1 m-1 align-self-center my-2"
                >
                    Registrarse
                </button>
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) =>
    validatorFromFunction((value) => {
        return pass === confirm;
    });

export default reduxForm({
    form: "register", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
                validators.exists()("Este campo es requerido"),
                matchPassword(data.password, data.confirmPassword)()(
                    "Las contraseñas no coinciden"
                )
            ),
            // username: validators.exists()('Este campo es requerido'),
            phone: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            first_name: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
            password: validators.exists()("Este campo es requerido"),
        });
    },
})(RegisterForm);
