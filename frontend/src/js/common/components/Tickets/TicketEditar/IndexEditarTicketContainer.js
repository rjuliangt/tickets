import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/ticket/ticket";
import { actions as actionsComentarios } from "../../../../redux/modules/comentarios/comentarios";

import { actionsModal } from "../../../../redux/modules/modal/modal";

import CrearTicket from "./IndexEditarTicket";
const crearComentario = actionsComentarios.crearComentario;

const ms2p = (state) => {
    return {
        ...state.ticket,
        ...state.form.ticketForm,
        ...state.modal,
    };
};

const md2p = { ...actions, crearComentario, ...actionsModal };

export default connect(ms2p, md2p)(CrearTicket);
