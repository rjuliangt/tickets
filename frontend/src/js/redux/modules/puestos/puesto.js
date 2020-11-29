import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "puesto", //identificador dentro del store.
    "puesto", //endpoint donde realizará las peticiones.
    "PuestoForm", //Nombre del formulario.
    "/puesto", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);