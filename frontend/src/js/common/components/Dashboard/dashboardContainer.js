import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/dashboard/dashboard'
import Dashboard from './FormularioDash';


const ms2p = (state) => {
    return {
        ...state.dashboard,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Dashboard);