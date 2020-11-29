import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/reporte/reporteProgramador'
import ReporteProgramador from './ReportePorProgramador';


const ms2p = (state) => {
    return {
        ...state.reporteProgramador,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ReporteProgramador);