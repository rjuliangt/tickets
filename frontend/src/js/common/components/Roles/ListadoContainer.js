import { connect } from "react-redux";
import { actions } from "../../../redux/modules/roles/roles";
import Listado from "./ListadoRol";

const ms2p = (state) => {
    return {
        ...state.roles,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
