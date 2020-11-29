import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/ticket/ticket";
import crearEliminacion from "./ElimnarTicketPrincipal";

const ms2p = (state) => {
    return {
        ...state.ticket,
    };
};

const md2ps = { ...actions };

export default connect(ms2p, md2ps)(crearEliminacion);