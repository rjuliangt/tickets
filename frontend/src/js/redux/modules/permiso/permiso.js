import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "permiso", //identificador dentro del store.
    "permiso", //endpoint donde realizará las peticiones.
    "PuestoForm", //Nombre del formulario.
    "/permiso", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);