import { connect } from "react-redux";
import { actions } from "../../../redux/modules/roles/roles";

import object from "./CrearRol";

const ms2p = (state) => {
    return {
        ...state.roles,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(object);
