import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import {
    Login,
    Profile,
    Profile2,
    Registro,
} from "./common/components/LoginRegister";
import Demo from "./common/components/Demo/Demo";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedUser from "./ProtectedUser";
import Examples from "./common/components/Examples/Basic";
import NotFound from "./common/components/layout/NotFound/NotFound";

import "../assets/fonts/fonts.css";

require("../../node_modules/font-awesome/css/font-awesome.css");
require("../../node_modules/bootstrap/dist/css/bootstrap.css");
import "bootstrap/dist/css/bootstrap.min.css";
import Grids from "./common/components/Examples/Grids";
import Notificaciones from "./common/components/Examples/Notificaciones";
import ExampleTabs from "./common/components/Examples/Tabs/Tabs";
import Usuarios from "./common/components/Usuarios/ListadoContainer";
import UsuariosCrear from "./common/components/Usuarios/Container";
// import ActivoAviso from './common/components/Activo/Activo'
import VerificationEmail from "./common/components/LoginRegister/VerificationEmail/VerificationContainer";
import ResetPass from "./common/components/resetPass/ResetPassContainer";
import ResetPassCliente from "./common/components/resetPass/ResetPassContainer";
import CrearEmpresa from "./common/components/Empresa/CrearEmpresaContainer";
import Empresas from "./common/components/Empresa/ListadoContainer";

import CrearCategoria from "./common/components/Categorias/CrearCategoriaContainer";
import Categoria from "./common/components/Categorias/ListadoContainer";

import CrearTicket from "./common/components/Tickets/TicketCrear/CrearTicketContainer";
import EditarTicket from "./common/components/Tickets/TicketCrear/FormularioEditar";
// import EditarTicketCliente from "./common/components/Tickets/TicketCrearCliente/FormularioEditar";
import CrearTicketCliente from "./common/components/Tickets/TicketCrearCliente/CrearTicketContainer";
import Tickets from "./common/components/Tickets/ListadoContainer";
import TicketsCards from "./common/components/Tickets/TicketCard/ListadoCardsContainer";
import TicketsCards2 from "./common/components/Tickets/TicketCard/ListadoCardsContainer";
import TicketsCardsCliente from "./common/components/Tickets/TicketCardCliente/ListadoCardsContainer";
import CrearTicketCopy from "./common/components/Tickets/TicketEditar/IndexEditarTicketContainer";
import CrearTicketCopyCliente from "./common/components/Tickets/TicketEditarCliente/IndexEditarTicketContainer";
import CrearTicketEditar from "./common/components/Tickets/TicketEditarCliente/IndexEditarTicketContainer";
// import EditarTicketPersonal from "./common/components/Tickets/TicketEditarPersonal/IndexEditarTicketContainer";

import CrearRol from "./common/components/Roles/CrearRolContainer";
import Rol from "./common/components/Roles/ListadoContainer";

import Proyectos from "./common/components/Proyecto/ListadoContainer";
import CrearProyecto from "./common/components/Proyecto/CrearProyectoContainer";

//_____ propiedades ticket---
import TicketPropiedades from "./common/components/Tickets/Propiedades/index";
import EditarComentario from "./common/components/Tickets/Comentario/CrearComentario/CrearContainer";
import EditarComentarioCliente from "./common/components/Tickets/ComentarioCliente/CrearComentario/CrearContainer";

//_____ reporteria ticket---
import Reporteria from "./common/components/Reporteria/ReporteriaContainer";
import ReporteriaPorProgramador from "./common/components/Reporteria/ReporteProgramadorContainer";
import ReporteriaGeneral from "./common/components/Reporteria/ReporteGeneralContainer";
import ReporteriaControlSoporte from "./common/components/Reporteria/ReporteriaControlSoporteContainer";
import ReporteriaControlActividades from "./common/components/Reporteria/ReporteActividadesContainer";

// __________Dashboard____________
import Dashboard from "./common/components/Dashboard/dashboardContainer";

// __________ Puesto _____________

import CrearPuesto from "./common/components/Puestos/PuestosContainer";
import Puestos from "./common/components/Puestos/ListadoPuestoContainer";

// __________ Puesto _____________
import CrearPermiso from "./common/components/Permiso/PermisoFormularioContainer";
import Permiso from "./common/components/Permiso/PermisoContainer";



require("../style/index.css");

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route
                    exact
                    path="/verification/:token"
                    component={VerificationEmail}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                {/* -------------------------Rutas del cliente---------------------------- */}

                <ProtectedUser
                    exact
                    path="/dashboardCliente"
                    component={Demo}
                />
                <ProtectedUser
                    exact
                    path="/ticketsCliente"
                    component={TicketsCardsCliente}
                />
                <ProtectedUser
                    exact
                    path="/ticketCliente/:id/editar"
                    component={CrearTicketCliente}
                />
                <ProtectedUser
                    exact
                    path="/ticketCliente/create"
                    component={CrearTicketCliente}
                />
                <ProtectedUser
                    exact
                    path="/ticketCliente/:id/ver"
                    component={CrearTicketCopyCliente}
                />
                <ProtectedUser
                    exact
                    path="/comentarioCliente/:id/editar"
                    component={EditarComentarioCliente}
                />
                <ProtectedUser
                    exact
                    path="/resetpassCliente"
                    component={ResetPass}
                />
                {/* <ProtectedUser
                    exact
                    path="/ticketCliente/:id/editar"
                    component={EditarTicketCliente}
                /> */}
                {/* ------------------------- FIN de Rutas del cliente---------------------------- */}

                <ProtectedRoute exact path="/registro2" component={Registro} />
                {/* <Route exact path="/aviso" component={ActivoAviso} /> */}
                {/* <ProtectedRoute exact path="/aviso" component={ActivoAviso} /> */}
                <ProtectedRoute exact path="/usuarios" component={Usuarios} />
                <ProtectedRoute
                    exact
                    path="/usuarios/create"
                    component={Profile2}
                />

                <ProtectedRoute
                    exact
                    path="/usuario/ver/:id"
                    component={Profile2}
                />
                
                <ProtectedRoute
                    exact
                    path="/add-profile/:id/editar"
                    component={Profile2}
                />
                {/* ++++++++++ Reset Pass ++++++++++ */}
                <ProtectedRoute exact path="/resetpass" component={ResetPass} />
                {/* ++++++++++ Ticket ++++++++++ */}
                <ProtectedRoute exact path="/ticket" component={Tickets} />
                <ProtectedRoute exact path="/cards" component={TicketsCards} />
                <ProtectedRoute
                    exact
                    path="/ticket/:id/ver"
                    component={CrearTicketCopy}
                />
                
                <ProtectedRoute
                    exact
                    path="/ticket/:id/editar"
                    component={CrearTicket}
                />
                <ProtectedRoute
                    exact
                    path="/ticket/create"
                    component={CrearTicket}
                />
                {/* ++++++++++ empresas ++++++++++ */}
                <ProtectedRoute exact path="/empresa" component={Empresas} />
                <ProtectedRoute
                    exact
                    path="/empresa/:id/ver"
                    component={CrearEmpresa}
                />
                <ProtectedRoute
                    exact
                    path="/empresa/:id/editar"
                    component={CrearEmpresa}
                />
                <ProtectedRoute
                    exact
                    path="/empresa/create"
                    component={CrearEmpresa}
                />
                {/* ++++++++++ Permiso ++++++++++ */}
                <ProtectedRoute exact path="/permiso" component={Permiso} />
                <ProtectedRoute
                    exact
                    path="/permiso/:id/ver"
                    component={CrearPermiso}
                />
                <ProtectedRoute
                    exact
                    path="/permiso/:id/editar"
                    component={CrearPermiso}
                />
                <ProtectedRoute
                    exact
                    path="/permiso/create"
                    component={CrearPermiso}
                />
                {/* +++++++++++ puestos +++++++++++++++++++*/ }
                <ProtectedRoute exact path="/puesto" component={Puestos} />
                <ProtectedRoute
                    exact
                    path="/puesto/:id/ver"
                    component={CrearPuesto}
                />
                
                <ProtectedRoute
                    exact
                    path="/puesto/:id/editar"
                    component={CrearPuesto}
                />
                <ProtectedRoute
                    exact
                    path="/puesto/create"
                    component={CrearPuesto}
                />
                
                
                {/* ++++++++++ categorias ++++++++++  */}
                <ProtectedRoute exact path="/categoria" component={Categoria} />
                <ProtectedRoute
                    exact
                    path="/categoria/:id/ver"
                    component={CrearCategoria}
                />
                <ProtectedRoute
                    exact
                    path="/categoria/:id/editar"
                    component={CrearCategoria}
                />
                <ProtectedRoute
                    exact
                    path="/categoria/create"
                    component={CrearCategoria}
                />
                {/* ---PROYECTOS-- */}
                <ProtectedRoute exact path="/proyecto" component={Proyectos} />
                <ProtectedRoute
                    exact
                    path="/proyecto/:id/ver"
                    component={CrearProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:id/editar"
                    component={CrearProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/create"
                    component={CrearProyecto}
                />
                {/* Roles */}
                <ProtectedRoute exact path="/roles" component={Rol} />
                <ProtectedRoute
                    exact
                    path="/roles/:id/ver"
                    component={CrearRol}
                />
                <ProtectedRoute
                    exact
                    path="/roles/:id/editar"
                    component={CrearRol}
                />
                <ProtectedRoute
                    exact
                    path="/roles/create"
                    component={CrearRol}
                />
                {/* __________________PROPIEDADES TICKET_____ */}

                <ProtectedRoute
                    exact
                    path="/ticket_propiedades"
                    component={TicketPropiedades}
                />
                <ProtectedRoute
                    exact
                    path="/comentario/:id/editar"
                    component={EditarComentario}
                />
                {/* __________________REPORTERIA DE TICKET__________  */ }
                
                <ProtectedRoute path="/reporteria/ticket/semanal" component={Reporteria} />
                <ProtectedRoute path="/reporteria/ticket/programador" component={ReporteriaPorProgramador} />
                <ProtectedRoute path="/reporteria/ticket/general" component={ReporteriaGeneral} />
                <ProtectedRoute path="/reporteria/ticket/soporte" component={ReporteriaControlSoporte} />
                <ProtectedRoute path="/reporteria/ticket/actividades" component={ReporteriaControlActividades} />

                {/* = = = = = = = = = = = = = == = = = == = = =  */}
                {/* <ProtectedUser exact path="/" component={TicketsPersonal} /> */}
                {/* <ProtectedUser
                    exact
                    path="/ticketPersonal/:id/editar"
                    component={EditarTicketPersonal}
                /> */}

                {/* -------------------------------DASHBOARD---------------------------- */}
                <ProtectedRoute exact path="/" component={Dashboard} />

                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute
                    exact
                    path="/user-profile"
                    component={Profile}
                />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute
                    exact
                    path="/notifications"
                    component={Notificaciones}
                />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                {/* <Route exact path="/roles" component={Roles} /> */}
                <Route component={ NotFound } />
                
                
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
