import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/ticket/ticket";
import CrearTicket from "./CrearTicket";

const ms2p = (state) => {
    return {
        ...state.ticket,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearTicket);
