import { handleActions } from "redux-actions";
import { createReducerModificado } from "../baseReducerPropiedades";
import { api } from "api";
import { initialize as initializeForm } from "redux-form";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducerModificado(
    "etiquetas", //identificador dentro del store.
    "ticket/etiquetas", //endpoint donde realizará las peticiones.
    "etiquetasForm", //Nombre del formulario.
    "/ticket_etiquetas" //url del componente en el frontend.
);

export default handleActions(reducers, initialState);

export const crearEtiqueta = (data) => (dispatch, getStore) => {
    const parametro = { nombre: data };

    api.post("ticket/etiquetas", parametro)
        .then((response) => {
            response.value = response.id;
            response.label = response.nombre;

            const datos = getStore().form.ticketForm.values;
            datos.idEtiquetas.push(response);

            const multiSelect = datos.idEtiquetas;

            delete datos["idEtiquetas"];
            dispatch(initializeForm("ticketForm", datos));

            datos.idEtiquetas = multiSelect;
            dispatch(initializeForm("ticketForm", datos));
        })
        .catch(() => {})
        .finally(() => {});
};
