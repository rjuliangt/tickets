import React, { Component } from "react";
import { Link } from "react-router-dom";
// import './acciones.css';
import Swal from "sweetalert2";

class Acciones extends Component {
    constructor(props) {
        super(props);
    }

    eliminar = (id) => {
        return () => {
            Swal.fire({
                title: "¿Eliminar?",
                text: "¡No podrá revertir esta acción!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "¡Sí, eliminar!",
                cancelButtonText: "No, cancelar",
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    this.props.eliminar(id);
                }
            });
        };
    };

    modificarInterno = (id) => {
        return () => {
            this.props.modificarInterno(id);
        };
    };

    render() {
        const {
            id,
            ver,
            editar,
            editar2,
            eliminar,
            profile,
            modificarInterno,
        } = this.props;

        return (
            <div className="d-flex justify-content-center">
                {ver !== undefined && (
                    <Link to={`${ver}/${id}/`} className="px-2">
                        <i className="material-icons">remove_red_eye</i>
                    </Link>
                )}
                {editar !== undefined && (
                    <Link
                        className="text-warning"
                        to={`${editar}/${id}/editar`}
                    >
                        <i className="material-icons">edit</i>
                    </Link>
                )}
                {profile !== undefined && (
                    <Link className="text-success" to={`${profile}/${id}`}>
                        <i className="material-icons">dvr</i>
                    </Link>
                )}
                {eliminar !== undefined && (
                    <a
                        className="px-2"
                        style={{ cursor: "pointer", color: "#c4183c" }}
                        onClick={this.eliminar(id)}
                    >
                        <i className="material-icons">delete</i>
                    </a>
                )}
                {modificarInterno !== undefined && (
                    <a
                        className="px-2"
                        style={{
                            cursor: "pointer",
                            color: "#FFC817",
                            fontSize: 25,
                        }}
                        onClick={this.modificarInterno(id)}
                    >
                        <i className="material-icons">edit</i>
                    </a>
                )}
                {/* {profile !== undefined && (
                    <Link
                        className="text-success"
                        to={`${profile}/${id}`}
                        // to={`${profile}/`}
                    >
                        <i className="material-icons">receipt_long</i>
                    </Link>
                )} */}
            </div>
        );
    }
}
Acciones.propTypes = {};

export function standardActions(acciones) {
    return (cell, row) => {
        return <Acciones id={cell} {...acciones} />;
    };
}
