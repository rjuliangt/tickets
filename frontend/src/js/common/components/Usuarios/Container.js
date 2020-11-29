import { connect } from "react-redux";
//cambiar para usar el de profile
import { actions } from "../../../redux/modules/usuarios/usuariosPersonal";
import crearUsuario from "../LoginRegister/Profile/ProfileForm2";

const ms2p = (state) => {
    return {
        ...state.usuariosPersonal,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(crearUsuario);
