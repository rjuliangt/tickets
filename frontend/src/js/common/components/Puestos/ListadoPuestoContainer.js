import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/puestos/puesto'
import ListadoPuesto from './ListadoPuesto';


const ms2p = (state) => {
    return {
        ...state.puesto,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListadoPuesto);