import { connect } from "react-redux";
import { actions } from "../../../redux/modules/categorias/categorias";
import Listado from "./ListadoCategoria";

const ms2p = (state) => {
    return {
        ...state.categoria,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
