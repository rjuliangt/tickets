import { handleActions } from "redux-actions";
import { api } from "api";
import moment from "moment";
import { initialize as initializeForm } from "redux-form";
import  _  from 'lodash';

const REPORTE_CONTROL_SOPORTE = "REPORTE_CONTROL_SOPORTE";
const ACTUALIZAR_FECHA_INICIAL_CS = "ACTUALIZAR_FECHA_INICIAL_CS";
const ACTUALIZAR_FECHA_FINAL_CS = "ACTUALIZAR_FECHA_FINAL_CS";
const BUSCAR_POR_PROGRAMADOR_DISEÑADOR = "BUSCAR_POR_PROGRAMADOR_DISEÑADOR";
const BUSCAR_POR_EMPRESA_CS = "BUSCAR_POR_EMPRESA_CS";
const SET_PROGRAMADOR_DISEÑADOR = "SET_PROGRAMADOR_DISEÑADOR";

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();

const setBuscar = (search) => ({
    type: BUSCAR_POR_PROGRAMADOR_DISEÑADOR,
    search,
});
const setBuscarPorEmpresa = (empresa) => ({
    type: BUSCAR_POR_EMPRESA_CS,
    empresa,
});

const seleccionUsuario = (value) => (dispatch, getStore) => {
    console.log( "value en redux", value );
    dispatch(setBuscar(value));
    dispatch(getProgramadorDiseñador());
    dispatch(getReporteControlSoporte());
};

const getReporteControlSoporte = () => (dispatch, getStore) => {
    const estado = getStore().reporteControlSoporte;
    const fecha_inicial = moment(estado.fecha_inicial).format("DD/MM/YYYY");
    const fecha_final = moment(estado.fecha_final).format("DD/MM/YYYY");
    const parametros = {
        fecha_inicial,
        fecha_final,
    };
    parametros.search = estado.search;
    parametros.empresa = estado.empresa;
    api.get("reporteria/reporteControlSoporte", parametros)
        .then((response) => {
            dispatch({
                type: REPORTE_CONTROL_SOPORTE,
                dataReporteControlSoporte: response,
            });
        })
        .catch(() => {})
        .finally(() => {});
};

const getProgramadorDiseñador = () => (dispatch, getStore) => {
    // const formData = estado.form.reporteForm.values;
    const estado = getStore().reporteControlSoporte;
    const estadoForm = _.cloneDeep(getStore().form.reporteForm.values);
    
    console.log( 'estado delformulario ', estadoForm )
    const first_name = estadoForm.first_name
    const parametros = {search:estado.search};

    api.get("reporteria/datosProgramadorDiseñador", parametros)
        .then((response) => {
            // response[ 0 ].first_name = response[ 0 ].first_name + ' ' + response[ 0 ].last_name
            response[0].first_name= first_name
            console.log( "Programador/Diseñador: ", response )
            
            dispatch(initializeForm("reporteForm", response[0]));
        })
        .catch(() => {})
        .finally(() => {});
};


const setInitialDate = (value) => (dispatch) => {
    dispatch({ type: "ACTUALIZAR_FECHA_INICIAL_CS", fecha_inicial: value });
    dispatch(getReporteControlSoporte());
};

const setFinalDate = (value) => (dispatch) => {
    dispatch({ type: "ACTUALIZAR_FECHA_FINAL_CS", fecha_final: value });
    dispatch(getReporteControlSoporte());
};

const searchChange = (search) => (dispatch) => {
    dispatch(setBuscar(search));
    dispatch(getReporteControlSoporte());
};
const searchEmpresaChange = (empresa) => (dispatch) => {
    dispatch(setBuscarPorEmpresa(empresa));
    dispatch(getReporteControlSoporte());
};

export const reducers = {
    [REPORTE_CONTROL_SOPORTE]: (state, { dataReporteControlSoporte }) => {
        return {
            ...state,
            dataReporteControlSoporte,
        };
    },

    [ACTUALIZAR_FECHA_INICIAL_CS]: (state, { fecha_inicial }) => {
        return {
            ...state,
            fecha_inicial,
        };
    },

    [ACTUALIZAR_FECHA_FINAL_CS]: (state, { fecha_final }) => {
        return {
            ...state,
            fecha_final,
        };
    },

    [BUSCAR_POR_PROGRAMADOR_DISEÑADOR]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },

    [BUSCAR_POR_EMPRESA_CS]: (state, { empresa }) => {
        return {
            ...state,
            empresa,
        };
    },

    [SET_PROGRAMADOR_DISEÑADOR]: (state, { empresa }) => {
        return {
            ...state,
            empresa,
        };
    },
};

export const actions = {
    setInitialDate,
    setFinalDate,
    getReporteControlSoporte,
    searchChange,
    searchEmpresaChange,
    seleccionUsuario,
};

export const initialState = {
    dataReporteControlSoporte: null,
    fecha_inicial: new Date(y, m, 1),
    fecha_final: new Date(y, m + 1, 0),
    search: "",
    empresa: "",
};

export default handleActions(reducers, initialState);
