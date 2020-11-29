import { connect } from "react-redux";
import { actions } from "../../../../../redux/modules/comentarios/comentarios";
import Listado from "./Listado";

const ms2p = (state) => {
    const me = state.login.me;
    return {
        ...state.comentarios,
        me,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
