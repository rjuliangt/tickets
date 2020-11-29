import { handleActions } from "redux-actions";
import { api } from "api";
import moment from "moment";

const REPORTE_POR_PROGRAMADOR = "REPORTE_POR_PROGRAMADOR";
const ACTUALIZAR_FECHA_INICIAL = "ACTUALIZAR_FECHA_INICIAL";
const ACTUALIZAR_FECHA_FINAL = "ACTUALIZAR_FECHA_FINAL";
const BUSCAR_POR_PROGRAMADOR = "BUSCAR_POR_PROGRAMADOR";
const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();

const setBuscar = (search) => ({
    type: BUSCAR_POR_PROGRAMADOR,
    search,
});

const seleccionUsuario = (value) => (dispatch, getStore) => {
    console.log( "value en redux", value );
    dispatch( setBuscar( value ) );
    dispatch( getReporteProgramador() );
};

const getReporteProgramador = () => (dispatch, getStore) => {
    const estado = getStore().reporteProgramador;
    const fecha_inicial = moment(estado.fecha_inicial).format("DD/MM/YYYY");
    const fecha_final = moment(estado.fecha_final).format("DD/MM/YYYY");
    const parametros = {
        fecha_inicial,
        fecha_final,
    };
    parametros.search = estado.search;
    api.get("reporteria/reporteProgramador", parametros)
        .then((response) => {
            dispatch({
                type: REPORTE_POR_PROGRAMADOR,
                dataReportePorProgramador: response,
            });
        })
        .catch(() => {})
        .finally(() => {});
};

const setInitialDate = (value) => (dispatch) => {
    dispatch({ type: "ACTUALIZAR_FECHA_INICIAL", fecha_inicial: value });
    dispatch(getReporteProgramador());
};

const setFinalDate = (value) => (dispatch) => {
    dispatch({ type: "ACTUALIZAR_FECHA_FINAL", fecha_final: value });
    dispatch(getReporteProgramador());
};

const searchChange = (search) => (dispatch) => {
    dispatch(setBuscar(search));
    dispatch(getReporteProgramador());
};

export const reducers = {
    [REPORTE_POR_PROGRAMADOR]: (state, { dataReportePorProgramador }) => {
        return {
            ...state,
            dataReportePorProgramador,
        };
    },

    [ACTUALIZAR_FECHA_INICIAL]: (state, { fecha_inicial }) => {
        return {
            ...state,
            fecha_inicial,
        };
    },

    [ACTUALIZAR_FECHA_FINAL]: (state, { fecha_final }) => {
        return {
            ...state,
            fecha_final,
        };
    },

    [BUSCAR_POR_PROGRAMADOR]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
};

export const actions = {
    setInitialDate,
    setFinalDate,
    getReporteProgramador,
    searchChange,
    seleccionUsuario,
};

export const initialState = {
    dataReportePorProgramador: null,
    fecha_inicial: new Date(y, m, 1),
    fecha_final: new Date(y, m + 1, 0),
    search: "",
};

export default handleActions(reducers, initialState);
