import { handleActions } from "redux-actions";
import { api } from "api";
import moment from 'moment' 

const SEMANAL= "SEMANAL";
const RESUMENSEMANAL= "RESUMENSEMANAL";
const RESUELTOSEMANAL = 'RESUELTOSEMANAL';
const ACTUALIZARFECHAINICIAL = "ACTUALIZARFECHAINICIAL"
const ACTUALIZARFECHAFINAL = "ACTUALIZARFECHAFINAL"
const RESUMENGENERAL= "RESUMENGENERAL";
const date = new Date();
const y= date.getFullYear()
const m = date.getMonth()


const getReporteSemanal = () => ( dispatch, getStore ) => {
    const estado = getStore().reporte;
    const fecha_inicial = moment( estado.fecha_inicial ).format("DD/MM/YYYY");
    const fecha_final = moment( estado.fecha_final ).format("DD/MM/YYYY");
    const parametros = {
        fecha_inicial,    
        fecha_final,    
    }

    api.get('reporteria/reporteSemanal', parametros)
    .then((response) => {
        dispatch({type:SEMANAL, dataReporteSemanal:response});
    })
    .catch(() => {
      
    })
    .finally(() => {

    });

}


const getResumenSemanal = () => ( dispatch, getStore ) => {
    const estado = getStore().reporte;
    const fecha_inicial = moment( estado.fecha_inicial ).format("DD/MM/YYYY");
    const fecha_final = moment( estado.fecha_final ).format("DD/MM/YYYY");
    const parametros = {
        fecha_inicial,    
        fecha_final,    
    }
    api.get('reporteria/resumenSemanal/', parametros)
    .then((response) => {
        dispatch({type:RESUMENSEMANAL, dataResumenSemanal:response});
    })
    .catch(() => {
    
    })
    .finally(() => {
       
    });

}

const getResueltosSemanal = () => ( dispatch, getStore ) => {
    const estado = getStore().reporte;
    const fecha_inicial = moment( estado.fecha_inicial ).format("DD/MM/YYYY");
    const fecha_final = moment( estado.fecha_final ).format("DD/MM/YYYY");
    const parametros = {
        fecha_inicial,    
        fecha_final,    
    }
    api.get('reporteria/resumenSemanalResueltos/', parametros)
    .then((response) => {
        dispatch({type:RESUELTOSEMANAL, dataResueltoSemanal:response});
    })
    .catch(() => {
    
    })
    .finally(() => {
       
    });
}

const setInitialDate =(value) =>(dispatch, getStore)  =>{
    dispatch( { type: 'ACTUALIZARFECHAINICIAL', fecha_inicial: value } )
    dispatch(getReporteSemanal())
    dispatch(getResueltosSemanal())
    dispatch(getResumenSemanal())
}

const setFinalDate =(value) =>(dispatch, getStore)  =>{
    dispatch( { type: 'ACTUALIZARFECHAFINAL', fecha_final: value } )
    dispatch( getReporteSemanal() )
    dispatch(getResueltosSemanal())
    dispatch(getResumenSemanal())
}

const getResumenGeneral = () => ( dispatch, getStore ) => {
    // const parametros = {}
    api.get('reporteria/reporteGeneral/', /*parametros*/)
    .then((response) => {
        dispatch({type:RESUMENGENERAL, dataGeneral:response});
    })
    .catch(() => {
    
    })
    .finally(() => {
       
    });
}




export const reducers = {
    [SEMANAL]: (state, { dataReporteSemanal }) => {
        return {
            ...state,
            dataReporteSemanal,
        };
    },
    [RESUMENSEMANAL]: (state, { dataResumenSemanal }) => {
        return {
            ...state,
            dataResumenSemanal,
        };
    },

    [RESUELTOSEMANAL]: (state, { dataResueltoSemanal }) => {
        return {
            ...state,
            dataResueltoSemanal,
        };
    },
    
    [ACTUALIZARFECHAINICIAL]: (state, { fecha_inicial }) => {
        return {
            ...state,
            fecha_inicial,
        };
    },
    
    [ACTUALIZARFECHAFINAL]: (state, { fecha_final }) => {
        return {
            ...state,
            fecha_final,
        };
    },

    [RESUMENGENERAL]: (state, { dataGeneral }) => {
        return {
            ...state,
            dataGeneral,
        };
    },
    
};

   
export const actions = {
    getReporteSemanal,
    getResumenSemanal,
    getResueltosSemanal,
    setInitialDate,
    setFinalDate,
    getResumenGeneral,
};

export const initialState = {
    dataReporteSemanal:null,
    dataResumenSemanal:null,
    dataResueltoSemanal: null,
    fecha_inicial: new Date(y,m,1),
    fecha_final: new Date( y, m + 1, 0 ),
};

export default handleActions(reducers, initialState);

