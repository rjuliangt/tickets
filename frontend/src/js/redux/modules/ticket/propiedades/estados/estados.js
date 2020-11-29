import { handleActions } from "redux-actions";
import { createReducerModificado } from "../baseReducerPropiedades";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducerModificado(
    "estados", //identificador dentro del store.
    "ticket/estados", //endpoint donde realizará las peticiones.
    "estadosForm", //Nombre del formulario.
    "/ticket_estados" //url del componente en el frontend.
);

export default handleActions(reducers, initialState);
