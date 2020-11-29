import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./ResetForm";
import LoadMask from "../Utils/LoadMask/LoadMask";

class ResetPass extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader, me } = this.props;

        return (
            <div className="">
                <br />
                <div className="login-wrapper">
                    <div className="card card-login">
                        <h5 className="txt-16-n color-003 pv">
                            CAMBIA TU CONTRASEÑA
                        </h5>
                        <LoadMask loading={loader} light>
                            <Form onSubmit={onSubmit} me={me} />
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPass;
