import React, { Component } from "react";
import Selects from "./Selects";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../Utils/Grid";
import { standardActions } from "../../Utils/Grid/StandardActionsTicket";
import Cards from "./Cards";
import Modal from "../../Utils/Modal/ReactModal";
import CreateModal from "../../Utils/renderField/createModal";
import LoadMask from "../../Utils/LoadMask/LoadMask";
// import Fusion from "../TicketPrincipal/CrearTicketPrincipal";
import Fusion from "../TicketPrincipal/Formulario";
import EliminarTicket from "../TicketPrincipal/EliminarTicket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./cards.css"

class Ticket extends Component {
    componentWillMount = () => {
        this.props.listar();
        this.props.getResumen();
        this.props.getResumenPrioridad();
    };
    handleInputChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        // const name = target.name;
        console.log("desde check", value);
        // this.setState({
        //   [name]: value
        // });
    };
    state = {
        seleccionados: [],
    };
    actualizarSeleccion = (e, asunto, id) => {
        console.log("id Unico", id);
        // console.log("valor de e ", e.target.checked);
        // console.log("Datos Ticket", e.target.value)
        console.log("Asunto ", asunto)

        if (e.target.checked) {
            const seleccion = { value: id, label: asunto };
            this.setState({
                seleccionados: [...this.state.seleccionados, seleccion],
            });
        } else {
            const selecciones = this.state.seleccionados;
            const seleccion = selecciones.filter((itemId) => {
                return itemId.value !== id;
            });

            this.setState({ seleccionados: seleccion });
        }

        console.log("array de tickets", this.state.seleccionados);
    };

    eliminar_ticket = () =>{
        const { eliminarTickets } = this.props
        eliminarTickets()
        this.setState({seleccionados:[]});
    } 
    fusionar_ticket = () =>{
        const { crearFusion } = this.props
        crearFusion()
        this.setState({seleccionados:[]});
    } 

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
            me,
            valores,
            handleInputChange,
            showForm,
            show_form,
            showFormDelete,
            crearFusion,
            state,
            show_form_delete,
            eliminarTickets,
            page,
            dataResumen,
            dataResumenPrioridad,
        } = this.props;
        const datos = data.results;
        const datos_resumen = dataResumen;
        // console.log('PARA RESUMEN DE DATOS ',datosResumen);
        
        let ticketsResueltos = 0;
        let ticketNoResueltos = 0;
        console.log('Nuevo ',valores);
        console.log('Datos ',datos);
        console.log("valor del Form", showForm);
        console.log("valor del Form2", show_form);
        console.log("Contador De Datos"  )
        return (
            // <form action="">
            <div className="d-flex flex-column w-100 px-3">
                <Modal
                    showModal={show_form}
                    showForm={() => {
                        showForm(false);
                    }}
                >
                    <div>
                        <Fusion
                            onSubmit={this.fusionar_ticket}
                            datos={this.state.seleccionados}
                            initialValues={{
                                tickets: this.state.seleccionados,
                            }}
                            options={this.state.seleccionados}
                        />
                    </div>
                </Modal>
                <Modal
                    showModal={show_form_delete}
                    showForm={() => {
                        showFormDelete(false);
                        // showForm(false);
                    }}
                >
                    <div>
                        <EliminarTicket
                            onSubmit={this.eliminar_ticket}
                            // onSumbit={()=>{
                            //     eliminarTickets();
                            //     this.setState({seleccionados:[]});
                            // }}
                            datos={this.state.seleccionados}
                            initialValues={{
                                tickets: this.state.seleccionados,
                            }}
                            options={this.state.seleccionados}
                        />
                    </div>
                </Modal>

                <div className="page-header pl-1 pt-3 no-gutters row">
                    <div className="text-sm-left text-center text-md-left mb-sm-0 col-12 col-sm-4">
                        <div
                            style={{
                                border: "1px solid #B3B8BC",
                                borderRadius:
                                    "0.8640833497047424px 22px 22px 0.8640833497047424px",
                                width: 100,
                                height: 25,
                                lineHeight: "23px",
                                textAlign: "center",
                                letterSpacing: "-0.36px",
                            }}
                            className="txt-12"
                        >
                            Mis tickets
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="mb-4 px-1 col-lg-8">
                        <div className="p-0  pt-3 ml-3">
                                <div className="d-flex flex-row w-100 mb-1 ">
                                    <h3 className="txt-22-n color-003 mr-4">
                                    MIS TICKETS
                                    </h3>
                                    <a
                                        className="btn-primario2 mr-3"
                                        href="/#/ticket/create"
                                    >
                                        Crear Ticket &nbsp;
                                        <FontAwesomeIcon
                                            icon={faTag}
                                            className=" cl-white "
                                        />
                                    </a>
                                    <a
                                        className="btn-secundario2 mr-3"
                                        onClick={ () => showForm( true ) }
                                        style={ {
                                            cursor: "pointer"
                                        }}
                                    >
                                        Fusionar &nbsp;
                                        <FontAwesomeIcon
                                            icon={faLink}
                                            className="cl-blue"
                                        />
                                    </a>
                                    <a
                                        className=" btn-secundario2 mr-3"
                                        onClick={ () => showFormDelete( true ) }
                                        style={ {
                                            cursor: "pointer"
                                        }}
                                    >
                                        Eliminar &nbsp;
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="cl-white"
                                        />
                                    </a>
                                </div>
                            { datos_resumen !== null? 
                                <div className="d-flex flex-row bd-highlight">
                                    <div className="d-flex align-items-center">
                                    <p className="p-2 bd-highlight card-resumen">

                                    Resueltos: <bold className="text-dark" >{datos_resumen.Results.cerrados}</bold>,  No Resueltos:  <bold className="text-dark" >{ datos_resumen.Results.nocerrados} </bold>
                                    Total:  <bold className="text-dark" > { datos_resumen.Results.nocerrados+datos_resumen.Results.cerrados} </bold>
                                    </p>
                                        
                                    </div>
                                    <div className="d-flex ml-2 align-items-center">
                                        { dataResumenPrioridad ? (
                                            <p className="p-2 ml-2 bd-highlight card-resumen row">
                                                Prioridades:&nbsp;&nbsp;{ dataResumenPrioridad.Results.prioridad.map( ( dato ) => (
                                                <React.Fragment>
                                                    <div style={ {
                                                        backgroundColor: dato.color,
                                                        width: 15,
                                                        height: 15,
                                                        padding: 0,
                                                        borderRadius: 5,
                                                    } }
                                                        className='col-sm ml-2'
                                                    >
                                                    </div>
                                                    <strong className="text-bold ml-1 font-weight-bold">{ dato.valor }</strong>
                                                </React.Fragment>
                                            ) ) }
                                            </p>
                                        ) : null }
                                    </div>
                                </div>
                                : null } 
                            { datos_resumen !== null? 
                                <div className="d-flex flex-column w-100">
                                    <LoadMask loading={loader} light>
                                        {datos.map((proyecto) => (
                                            <Cards
                                                key={proyecto.asunto}
                                                datos={proyecto}
                                                actualizarSeleccion={
                                                    this.actualizarSeleccion
                                                }
                                            >   
                                            </Cards>
                                        ))}

                                        <div className="tablaTicket">
                                            <Grid
                                                data={data}
                                                loading={loader}
                                                onPageChange={listar}
                                                page={page}
                                                onSortChange={onSortChange}
                                            >
                                                <TableHeaderColumn
                                                    isKey
                                                    dataField="asunto"
                                                    dataSort
                                                >
                                                    Asunto
                                                </TableHeaderColumn>
                                            </Grid>
                                        </div>
                                    </LoadMask>
                                </div>
                            : null } 
                        </div>
                    </div>
                    <div className="pl-2 mb-2 px-1 col-lg-4 ">
                    {(dataResumenPrioridad && dataResumenPrioridad.Results.total_tickets>0) && 
                        <Selects
                            filtrar={filtrar}
                            searchChange={searchChange}
                            resetearBuscador={resetearBuscador}
                            SetResetearBuscador={SetResetearBuscador}
                        />
                            }
                    </div>
                </div>
            </div>
        );
    }
}

export default Ticket;
