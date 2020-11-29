import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "categoria", //identificador dentro del store.
    "categoria", //endpoint donde realizará las peticiones.
    "CategoriaForm", //Nombre del formulario.
    "/categoria" //url del componente en el frontend.
);

export default handleActions(reducers, initialState);
