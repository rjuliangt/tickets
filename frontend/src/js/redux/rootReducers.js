import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import login from "./modules/cuenta/login";
import register from "./modules/cuenta/register";
import profile from "./modules/cuenta/profile";
import usuarios from "./modules/usuarios/usuarios";
import notificaciones from "./modules/notificaciones/notificaciones";
import usuariosList from "./modules/usuarios/usuariosList";
import roles from "./modules/roles/roles";
import empresa from "./modules/empresa/empresa";
import verificacionEmail from "./modules/verificationEmail/verificationEmail";

import usuariosPersonal from "./modules/usuarios/usuariosPersonal";
import perfil from "./modules/profile/profile";
import categoria from "./modules/categorias/categorias";
import reset from "./modules/resetPass/resetpass";
import proyecto from "./modules/proyecto/proyecto";
import puesto from "./modules/puestos/puesto";

// _____________ticket______
import ticket from "./modules/ticket/ticket";

import comentarios from "./modules/comentarios/comentarios";

import etiquetas from "./modules/ticket/propiedades/etiquetas/etiquetas";
import tipos from "./modules/ticket/propiedades/tipos/tipos";
import estados from "./modules/ticket/propiedades/estados/estados";
import prioridades from "./modules/ticket/propiedades/prioridades/prioridades";
import modal from "./modules/modal/modal";

// Reportes

import reporte from './modules/reporte/reporte'
import dashboard from './modules/dashboard/dashboard'
import reporteProgramador from './modules/reporte/reporteProgramador';
import reporteControlSoporte from './modules/reporte/reporteControlSoporte';
import actividades from './modules/reporte/reporteControlActividades';
import permiso from './modules/permiso/permiso';
import ticketCliente from './modules/ticket/ticketCliente'

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    usuariosList,
    roles,
    empresa,
    verificacionEmail,
    usuariosPersonal,
    perfil,
    categoria,
    reset,
    proyecto,
    puesto,
    //- - - - - ticket - - -

    ticket,
    comentarios,
    etiquetas,
    tipos,
    estados,
    prioridades,
    modal,
    reporte,
    dashboard,
    reporteProgramador,
    reporteControlSoporte,
    actividades,
    // ----Permisos-----
    permiso,
    ticketCliente,
});
