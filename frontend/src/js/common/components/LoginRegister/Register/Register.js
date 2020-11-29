import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoadMask from "../../Utils/LoadMask/LoadMask";

class Registro extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />;
        }
        return (
            <div className="d-flex blue-gradient-bg">
                <div className="flex-1"></div>
                <div className="flex-1  d-flex justify-content-center align-items-center">
                    <div className="loginAzul p-4 flex-fill py-3">
                        <h5 className="txt-22-n text-white mb-3">Registro Nuevo</h5>
                        <LoadMask loading={loader} light>
                            <RegisterForm onSubmit={onSubmit} />
                            <span>
                                ¿Ya tienes cuenta?&nbsp;
                                <Link
                                    to="/login"
                                    className=" color-FFC txt-12-n"
                                >
                                    Ingresa aquí
                                </Link>
                            </span>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registro;
