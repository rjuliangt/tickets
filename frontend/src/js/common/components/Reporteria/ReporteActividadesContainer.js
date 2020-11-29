import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/reporte/reporteControlActividades'
import ReporteControlActividad from './ReporteControlActividad';


const ms2p = (state) => {
    return {
        ...state.reporteControlActividad,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ReporteControlActividad);