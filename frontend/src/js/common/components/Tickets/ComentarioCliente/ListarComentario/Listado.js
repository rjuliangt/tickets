import React, { Component } from "react";
// import Selects from "./Selects";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActionsTicket";
// import Cards from "./Cards";

import LoadMask from "../../../Utils/LoadMask/LoadMask";
import Comentarios from "./Comentario";
class Ticket extends Component {
    componentWillMount = () => {
        this.props.filtrarPorTicket(this.props.idActual);
    };

    render() {
        const {
            data,
            loader,
            onPageChange,
            onSortChange,
            searchChange,
            filtrar,
            resetearBuscador,
            SetResetearBuscador,
            listar,
            leer,

            me,
        } = this.props;
        const datos = data;

        console.log("datooos es igual a ", typeof datos);
        const idUsuario = me.id;
        return (
            // <form action="">
            <React.Fragment>
                <LoadMask loading={false} light>
                    {Array.isArray(datos) &&
                        datos.map((proyecto) => (
                            <Comentarios
                                key={proyecto.id}
                                datos={proyecto}
                                leer={leer}
                                idUsuario={idUsuario}
                            />
                        ))}
                </LoadMask>
            </React.Fragment>
        );
    }
}

export default Ticket;
