import { connect } from "react-redux";
import { actions } from '../../../redux/modules/permiso/permiso'

import CrearPermiso from "./CrearPermiso";

const ms2p = (state) => {
    return {
        ...state.permiso,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearPermiso);