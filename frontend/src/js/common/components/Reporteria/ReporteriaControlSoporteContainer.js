import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/reporte/reporteControlSoporte'
import ReporteControlSoporte from './ReporteControlSoporte';


const ms2p = (state) => {
    return {
        ...state.reporteControlSoporte,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ReporteControlSoporte);