import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActionsTicket";

// const Saludo = ({ nombre, apellido }) => {
//     return (
//         <h3>
//             Hola {nombre} {apellido}
//         </h3>
//     );
// };

class Ticket extends Component {
    componentWillMount = () => {
        this.props.listar();
    };

    render() {
        // console.log("ESTADO: ", this.props);
        const { data, loader, onPageChange, onSortChange } = this.props;
        // console.log("dato de cards", data);

        return (
            <div className="d-flex flex-column w-100">
                <h3>Ticket</h3>
                {/* <Saludo nombre="Pepito" apellido="Pérez" /> */}

                <a
                    className="btn btn-primary btn-sm w-25"
                    href="/#/ticket/create"
                >
                    Crear un Ticket
                </a>

                <Grid
                    data={data}
                    loading={loader}
                    onPageChange={onPageChange}
                    onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="asunto" dataSort>
                        Asunto
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="idCategoria" dataSort>
                        idCategoria
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="estado" dataSort>
                        estado
                    </TableHeaderColumn>
                    {/* <TableHeaderColumn
                        dataField="Fusion"
                        dataSort
                    ></TableHeaderColumn> */}
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "ticket",
                            ver: "ticket",
                            // eliminar: () => {},
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default Ticket;
