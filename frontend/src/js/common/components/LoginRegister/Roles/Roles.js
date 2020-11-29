import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import RolesForm from "./RolesForm";
import LoadMask from "../../Utils/LoadMask/LoadMask";

class Roles extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader } = this.props;
        return <RolesForm onSubmit={onSubmit} />;
    }
}

export default Roles;
