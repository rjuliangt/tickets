import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/usuarios/usuariosPersonal";

import Profile from "./Profile";

const ms2p = (state) => {
    return {
        // ...state.perfil,
        // ...state.perfil,
        ...state.usuariosPersonal,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Profile);
