import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../../Utils/Grid";
import { standardActions } from "../../../Utils/Grid/StandardActions";
import Formulario from "./Formulario";
import { initialize as initializeForm } from "redux-form";
import { FullModal } from "../../../Utils/Modal/FullModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
class Listado extends Component {
    constructor(props) {
        super(props);

        this.state = {
            btActualizar: false,
        };
    }
    componentWillMount = () => {
        this.props.listar();
    };

    editarFormulario = (id = 2) => {
        const { leer, showModalEtiquetas } = this.props;
        leer(id);
        this.setState({ ...this.state, btActualizar: true });
        console.log("cambiado el estado", this.state.btActualizar);
        showModalEtiquetas(true);
    };

    resetAGuardar = () => {
        this.setState({ ...this.state, btActualizar: false });
        const { leer, showModalEtiquetas } = this.props;
        leer("");
        console.log("reseteando a GUARDAR", this.state.btActualizar);
        showModalEtiquetas(false);
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        editar(data.id, data);
        this.resetAGuardar();
    };
    render() {
        console.log("ESTADO: ", this.props);
        const {
            data,
            loader,
            searchChange,
            onPageChange,
            onSortChange,
            eliminar,
            crear,
            leer,
            showModalEtiquetas,
            show_modal_etiquetas,
            listar,
            page,
        } = this.props;
        const funcionEnvio = this.state.btActualizar
            ? this.actualizarFormulario
            : crear;

        return (
            <div className="d-flex flex-column w-100">
                <FullModal
                    show_modal={show_modal_etiquetas}
                    showModal={this.resetAGuardar}
                >
                    <Formulario
                        onSubmit={funcionEnvio}
                        actualizar={this.state.btActualizar}
                        btGuardar={this.resetAGuardar}
                    />
                </FullModal>

                <div className="d-flex flex-wrap mb-2 ">
                    <h3 className="txt-16-n color-003 w-50">Etiquetas</h3>

                    <div className="d-flex flex-row justify-content-between align-items-center flex-fill ">
                        <button
                            className="btn-primario2 mr-3"
                            type="button"
                            onClick={() => {
                                showModalEtiquetas(true);
                            }}
                        >
                            Agregar
                        </button>
                        <div className="flex-fill d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => searchChange(e.target.value)}
                                placeholder="Buscar..."
                                style={{
                                    border: "2px solid #E5E5E5",
                                    borderRadius: "12px",
                                    paddingRight: "35px",
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icono color-4AC"
                                style={{
                                    marginLeft: -35,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Grid
                    data={data}
                    loading={loader}
                    onPageChange={listar}
                    onSortChange={onSortChange}
                    page={page}
                >
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            // ver: "ticket_tipos",
                            // editar: "ticket_tipos",
                            // modificarInterno: this.editarFormulario,
                            modificarInterno: this.editarFormulario,
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>

                    <TableHeaderColumn isKey dataField="nombre" dataSort>
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="activo"
                        dataFormat={(cell) => {
                            if (cell) {
                                return ( <div><i 

                                    style={{
                                        color: "#00a600 ",
                                    }}
                                    

                                     className="material-icons">done</i> <i>Activo</i> </div>);
                            } else {
                                return ( <div><i 
                                        className="material-icons red1"
                                        style={{
                                            color: "#cc0000",
                                        }}
                                        >block</i><i>Inactivo</i></div>);
                            }
                        }}
                        dataSort
                    >
                        Estado
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default Listado;
