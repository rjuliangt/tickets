import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/ticket/ticketCliente";
import Listado from "./ListadoTicketCards";

const ms2p = (state) => {
    const me = state.login.me;
    return {
        ...state.ticketCliente,
        // ...state.modal,
        me,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
