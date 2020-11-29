import { connect } from "react-redux";
import { actions } from "../../../../redux/modules/cuenta/profile";
import Profile from "./Profile";
import Profile2 from "./ProfileForm2";
const ms2p = (state) => {
    return {
        ...state.login,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Profile);
