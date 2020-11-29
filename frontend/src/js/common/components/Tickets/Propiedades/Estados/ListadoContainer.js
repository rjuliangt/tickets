import { connect } from "react-redux";
import { actions } from "../../../../../redux/modules/ticket/propiedades/estados/estados";
import Listado from "./Listado";

const ms2p = (state) => {
    return {
        ...state.estados,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
