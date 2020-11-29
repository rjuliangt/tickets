import { handleActions } from "redux-actions";
import { createReducerModificado } from "../baseReducerPropiedades";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducerModificado(
    "tipos", //identificador dentro del store.
    "ticket/tipos", //endpoint donde realizará las peticiones.
    "tiposForm", //Nombre del formulario.
    "/ticket_tipos" //url del componente en el frontend.
);

export default handleActions(reducers, initialState);
