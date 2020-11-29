import { connect } from "react-redux";
import { actions } from "../../../redux/modules/resetPass/resetpass";
import resetPass from "./ResetPass";

const ms2p = (state) => {
    const me = state.login.me;
    console.log("AQUI EN RESET", me);
    return {
        ...state.resetPass,
        me,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(resetPass);
