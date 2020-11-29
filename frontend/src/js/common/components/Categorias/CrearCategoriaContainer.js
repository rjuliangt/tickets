import { connect } from "react-redux";
import { actions } from "../../../redux/modules/categorias/categorias";

import Crear from "./CrearCategoria";

const ms2p = (state) => {
    return {
        ...state.categoria,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Crear);
