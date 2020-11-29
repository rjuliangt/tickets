import { connect } from "react-redux";
import { actions } from "../../../redux/modules/puestos/puesto";

import CrearPuesto from "./CrearPuesto";

const ms2p = (state) => {
    return {
        ...state.puesto,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearPuesto);