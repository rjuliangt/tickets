import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/reporte/reporte'
import ReporteriaGeneral from './ReporteGeneral';


const ms2p = (state) => {
    return {
        ...state.reporte,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ReporteriaGeneral);