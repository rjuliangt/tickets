import { connect } from "react-redux";
import { actions } from "../../../../../redux/modules/comentarios/comentarios";

import object from "./Crear";

const ms2p = (state) => {
    return {
        ...state.comentarios,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(object);
