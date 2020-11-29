import React, { Component } from "react";
// import { Field } from "redux-form";

import { initialize as initializeForm } from "redux-form";

import { Field, reduxForm } from "redux-form";
import {
    SelectField,
    AsyncSelectField,
    CreatableSelectField,
} from "../../Utils/renderField/renderField";
import { getPropiedades, getAgente } from "../DatosSelect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {
    faSearch,faFilter
  
} from "@fortawesome/free-solid-svg-icons";

class Inputs extends Component {
    componentWillMount = () => {
        console.log("dentro de componentWillMount");
    };
    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false };
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    render() {
        const {
            data,
            loader,
            onPageChange,
            onSortChange,
            searchChange,
            filtrar,
            filtrarCliente,
            SetResetearBuscadorCliente,
            resetearBuscadorCliente,
            handleSubmit,
        } = this.props;

        return (
            // <form action="" onSubmit={handleSubmit}>
            <div
                className="mb-2 card "
                style={{
                    border: "2px solid #E5E5E5",
                    borderRadius: 5,
                    boxShadow: "none",
                }}
            >
                <div className="border-top p-0 px-3 pt-3 txt-11">
                    <div className="mb-3 col-12">
                        <div className="row">
                           
                                <div  className="col-12 mb-4"
                                    onClick={ this.toggle }
                                    style={this.state.dropdownOpen?{cursor:'zoom-out'}:{cursor:'zoom-in'}}
                                        // to="/"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i>
                                                <FontAwesomeIcon
                                                    icon={faFilter}
                                                    className="icono "
                                                />
                                            </i>
                                            &nbsp;&nbsp;&nbsp;
                                        </div>
                                        <span className="m-0 txt-16-n color-003" >
                                            Filtros &nbsp;&nbsp;&nbsp;▼</span>
                                </div>
                          
                            <Collapse 
                            
                            isOpen={ this.state.dropdownOpen }>
                                <div className="mb-3 col-12">
                                <div className="row">
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="async_select_field"
                                >
                                    Buscar
                                </label>
                                <input
                                    type="text"
                                    className="form-control txt-11 "
                                    onChange={(e) => {
                                        SetResetearBuscadorCliente(e.target.value);
                                    }}
                                    placeholder="Buscar por nombre de ticket"
                                    value={resetearBuscadorCliente}
                                />
                            </div>

                            {/* =================================================================== */}
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idUsuarioCliente"
                                >
                                    Cliente
                                </label>
                                <Field
                                    name="idUsuarioCliente"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "usuario/cliente",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>

                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="aprobado"
                                >
                                    Aprobados
                                </label>

                                <Field
                                    name="aprobado"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "ticket/aprobados/aprobados",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            
                            </div>



                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idUsuarioAsignado"
                                >
                                    Asignado a:
                                </label>
                                <Field
                                    name="idUsuarioAsignado"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "usuario/programador",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idUsuarioResuelto"
                                >
                                    Resuelto por:
                                </label>
                                <Field
                                    name="idUsuarioResuelto"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "usuario/programador",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>

                            {/* * * * * * * * * ** Area=Grupos/En Base de datos Categoriras* * * ** * * * */}
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="async_select_field"
                                >
                                    &Aacute;rea
                                </label>
                                <Field
                                    name="idGrupo"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "categoria", true)
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                    defaultOptions
                                    // onChange={(e) => {
                                    //     console.log("hola estoy dentro", e);
                                    // }}
                                />
                            </div>
                            {/* * * * * * * * * * * * * ** *  * ** * * * * * ** * */}

                            {/* =================================================================== */}
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="async_select_field"
                                >
                                    Prioridad
                                </label>

                                <Field
                                    name="idPrioridad"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "ticket/prioridades",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idEstado"
                                >
                                    Estados
                                </label>
                                <Field
                                    name="idEstado"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "ticket/estados",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idTipo"
                                >
                                    Tipo
                                </label>
                                <Field
                                    name="idTipo"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/tipos", true)
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idEtiquetas"
                                >
                                    Etiqueta
                                </label>
                                <Field
                                    name="idEtiquetas"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "ticket/etiquetas",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idProyecto"
                                >
                                    Proyecto
                                </label>
                                <Field
                                    name="idProyecto"
                                    placeholder="Todos"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(
                                            e,
                                            "proyecto",
                                            true
                                        )
                                    }
                                    className="form-control"
                                    onChange={filtrarCliente}
                                />
                            </div>
                            </div>
                            </div>
                            </Collapse>
                        </div> 
                        {/* Final del filrtros */}
                        
                    </div>
                </div>
            </div>
            // </form>
        );
    }
}

export default reduxForm({
    form: "formularioFiltro", // a unique identifier for this form
})(Inputs);