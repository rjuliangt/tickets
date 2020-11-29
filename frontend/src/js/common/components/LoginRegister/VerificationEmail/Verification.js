import React, { Component } from "react";

class VerificationEmail extends Component {
    componentWillMount = () => {
        const { match } = this.props;
        const token = match.params.token;
        // console.log(token);
        // console.log(this.props);
        this.props.verificarToken(token);
    };

    render() {
        return null;
    }
}
export default VerificationEmail;
