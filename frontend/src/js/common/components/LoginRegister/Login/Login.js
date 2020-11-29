import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./login.css";
import LoadMask from "Utils/LoadMask/LoadMask";
import logo from "../../img/logo-login.png"; 

class Login extends Component {
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
            // <div className="blue-gradient-bg ">
            //     <div className="login-wrapper">
            //         <div className="card2 card-login col-lg-3 col-md-4 col-11 loginAzul">

            <div className="d-sm-flex blue-gradient-bg">
                <div className="flex-1 d-flex justify-content-sm-center align-items-end login-logo">
                    <img src={ logo } alt="logo-Cian" class="img-fluid">
                    </img>
                </div>
                <div className="flex-1  d-flex justify-content-sm-center align-items-center ">
                    <div className="loginAzul p-4 flex-fill py-3">
                        <h5 className="txt-22-n text-white ">Bienvenido</h5>
                        <LoadMask loading={loader} light>
                            <LoginForm onSubmit={onSubmit} />
                            <span>
                                <div className="buttons-box mt-3">
                                    <a
                                        className="btn-secundario1 align-self-center"
                                        href="/#/registro"
                                    >
                                        Registrarse
                                    </a>
                                </div>
                            </span>
                        </LoadMask>
                    </div>
                </div>
            </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Login;
