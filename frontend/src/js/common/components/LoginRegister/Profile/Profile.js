import React, { Component } from "react";
import ProfileForm2 from "./ProfileForm2";

class Profile extends Component {
    componentWillMount = () => {
        const { match, editar } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            editar(id);
        }
    };
    render() {
        // const { me } = this.props;
        console.log("props: ", this.props);
        const { match, registrarUser, actualizarUser, location } = this.props;
        const funcionEnvio = match.params.id ? actualizarUser : registrarUser;
        const {
            showForm,
            show_form,
            registrarProyecto,
            registrarUserDesdeTicket,
            MostrarOcultarModal,
            registrarEmpresa,
        } = this.props;
        console.log("contendedor:", show_form);
        return (
            <div className="d-flex flex-column w-100">
                <ProfileForm2
                    // onSubmit={this.update}
                    // me={me}
                    // setAvatar={this.setAvatar}
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                    showForm={showForm}
                    show_form={show_form}
                    registrarProyecto={registrarProyecto}
                    registrarUserDesdeTicket={registrarUserDesdeTicket}
                    MostrarOcultarModal = {MostrarOcultarModal}
                />
            </div>
        );
    }
}

export default Profile;
