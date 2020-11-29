import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {
    faPen,
    faReply,
    faEnvelope,
    faHome,
    faBuilding,
    faUsers,
    faUserCircle,
    faAddressCard,
    faFolderOpen,
    faCog,
    faTag,
    faTimes,
    faFileChartPie,
    faFile,
    faCalendar,
    faListUl,
    faTh,
    faInfoCircle,
    faCheckCircle,
    faSitemap,
    faChartBar,
    faHandPaper,
    faCheckDouble,
    faCheckSquare,

} from "@fortawesome/free-solid-svg-icons";
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false };
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };
  
    render() {
        const { toggleOpen, navToggle, logOut, user } = this.props;
        const rol = 1;
        
        return (
            <aside
                className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${
                    toggleOpen ? "" : "open"
                }`}
            >
                <div className="main-navbar">
                    <nav className="align-items-stretch side-background-title flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a href="#" className="w-100 mr-0 navbar-brand">
                            <div className="d-table m-auto">
                                <img
                                    id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require("assets/img/logo.png")}
                                    alt="Logo"
                                />
                            </div>
                        </a>
                        <a
                            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}
                        >
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper side-background">
                    <ul className="nav--no-borders flex-column nav">
                        {user.is_verify ? null : (
                            <Fragment>
                                <li
                                    className="my-3"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    <span
                                        className="badge badge-warning  "
                                        style={{ fontSize: "11px" }}
                                    >
                                        Verifique su correo
                                    </span>
                                    {/* <p></p> */}
                                </li>
                            </Fragment>
                        )}
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                exact
                                className="nav-link"
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faHome}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                                    <div
                                    onClick={ this.toggle }
                                    style={{cursor:'pointer'}}
                                        // to="/"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i>
                                                <FontAwesomeIcon
                                                    icon={faChartBar}
                                                    className="icono "
                                                />
                                            </i>
                                            &nbsp;&nbsp;&nbsp;
                                        </div>
                                        <span>Reporteria &nbsp;&nbsp;&nbsp;▼</span>
                                    </div>
                                     <Collapse isOpen={ this.state.dropdownOpen }>
                                         {/* Navlinks de reporteria */}
                                          {/* ********************************************* */}
                                    <ul className="reporte_ul" >
                                        <li className="reporte_li" >
                                     <NavLink
                                        to="/reporteria/ticket/semanal"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    > •&nbsp;
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i >
                                                <FontAwesomeIcon
                                                    icon={faCalendar}
                                                    className="icono "
                                                />
                                            </i>
                                        </div>
                                        <span>Tabla tickets semanal</span>
                                    </NavLink>
                                    </li>

                                  
                                        <li className="reporte_li" >
                                     <NavLink
                                        to="/reporteria/ticket/programador"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    > •&nbsp;
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i >
                                                <FontAwesomeIcon
                                                    icon={faListUl}
                                                    className="icono "
                                                />
                                            </i>
                                        </div>
                                        <span>Reporte por programador</span>
                                    </NavLink>
                                    </li>

                                    <li className="reporte_li" >
                                     <NavLink
                                        to="/reporteria/ticket/general"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    > •&nbsp;
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i >
                                                <FontAwesomeIcon
                                                    icon={faTh}
                                                    className="icono "
                                                />
                                            </i>
                                        </div>
                                        <span>Reporte general</span>
                                    </NavLink>
                                    </li>

                                    <li className="reporte_li" >
                                     <NavLink
                                        to="/reporteria/ticket/soporte"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    > •&nbsp;
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i >
                                                <FontAwesomeIcon
                                                    icon={faInfoCircle}
                                                    className="icono "
                                                />
                                            </i>
                                        </div>
                                        <span>Control de soporte</span>
                                    </NavLink>
                                    </li>

                                    <li className="reporte_li" >
                                     <NavLink
                                        to="/reporteria/ticket/actividades"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    > •&nbsp;
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i >
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="icono "
                                                />
                                            </i>
                                        </div>
                                        <span>Control de actividad</span>
                                    </NavLink>
                                    </li>

                                    </ul>
                                  
                    
                                    
                                    </Collapse>
                         </li> 
                        <li className="nav-item">
                            <NavLink
                                to="/empresa"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faBuilding}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Empresas</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/puesto"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faSitemap}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Puesto</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/proyecto"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faFolderOpen}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Proyectos</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/usuarios"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faUserCircle}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Usuarios</span>
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink
                                to="/permiso"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faCheckDouble}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Permisos</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                                    <NavLink
                                        to="/cards"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i>
                                                <FontAwesomeIcon
                                                    icon={faTag}
                                                    className="icono "
                                                />
                                            </i>
                                            &nbsp;&nbsp;&nbsp;
                                        </div>
                                        <span>Tickets</span>
                                    </NavLink>
                                </li>


                        <li className="nav-item">
                            <NavLink
                                to="/categoria"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>&Aacute;reas</span>
                            </NavLink>
                        </li>
                        {/* ++++++++++++++ */}
                      
                        <li className="nav-item">
                            <NavLink
                                to="/roles"
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faAddressCard}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Roles</span>
                            </NavLink>
                        </li>
                        
                        {rol == 1 ? (
                            <Fragment>
                                {/* <li className="nav-item">
                                    <NavLink
                                        to="/tabs"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                vertical_split
                                            </i>
                                        </div>
                                        <span>Tabs</span>
                                    </NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink
                                        to="/ticket_propiedades"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i>
                                                <FontAwesomeIcon
                                                    icon={faCog}
                                                    className="icono "
                                                />
                                            </i>
                                            &nbsp;&nbsp;&nbsp;
                                        </div>
                                        <span>Propiedad de Ticket</span>
                                    </NavLink>
                                </li>
                            
                                {/* <li className="nav-item">
                                    <NavLink
                                        to="/ticket"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i>
                                                <FontAwesomeIcon
                                                    icon={faTag}
                                                    className="icono "
                                                />
                                            </i>
                                            &nbsp;&nbsp;&nbsp;
                                        </div>
                                        <span>Tickets</span>
                                    </NavLink>
                                </li> */}
                            </Fragment>
                        ) : (
                            <Fragment>
                                {/* <h2> aun no se a programado</h2> */}
                            </Fragment>
                        )}

                        {/* <li className="nav-item">
                            <Link
                                to="/login"
                                onClick={logOut}
                                className="nav-link"
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i>
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className="icono "
                                        />
                                    </i>
                                    &nbsp;&nbsp;&nbsp;
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </aside>
        );
    }
}

export default SideBar;
