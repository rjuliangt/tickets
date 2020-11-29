import { connect } from "react-redux";
import { actions } from "../../../redux/modules/usuarios/usuariosList";
import Listado from "./Listado";

const ms2p = (state) => {
    return {
        ...state.usuariosList,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
