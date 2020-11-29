import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
class SideBarCliente extends Component {
    constructor(props) {
        super(props);
    }

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
                                <li style={{ textAlign: "center" }}>
                                    <span className="badge badge-warning ">
                                        Verifique su correo
                                    </span>
                                    {/* <p></p> */}
                                </li>
                            </Fragment>
                        )}

                        <li className="nav-item">
                            <NavLink
                                to="/dashboardCliente"
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
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/ticketsCliente"
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

                        {/* ++++++++++++++ */}
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

export default SideBarCliente;
