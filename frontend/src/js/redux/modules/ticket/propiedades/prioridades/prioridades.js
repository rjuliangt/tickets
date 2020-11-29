import { handleActions } from "redux-actions";
import { createReducerModificado } from "../baseReducerPropiedades";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducerModificado(
    "prioridades", //identificador dentro del store.
    "ticket/prioridades", //endpoint donde realizará las peticiones.
    "prioridadesForm", //Nombre del formulario.
    "/ticket_prioridades" //url del componente en el frontend.
);

export default handleActions(reducers, initialState);
