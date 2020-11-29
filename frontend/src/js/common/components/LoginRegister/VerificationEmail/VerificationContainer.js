import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/verificationEmail/verificationEmail";
import Verification from "./Verification";

const ms2p = (state) => {
    return {
        ...state.verificacionEmail,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Verification);
