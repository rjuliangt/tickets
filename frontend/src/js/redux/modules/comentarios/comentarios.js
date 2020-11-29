import { initialize as initializeForm } from "redux-form";
import { api } from "api";

import { handleActions } from "redux-actions";
import { createReducerComentario } from "./baseReducerComentario";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducerComentario(
    "comentarios", //identificador dentro del store.
    "ticket/comentarios", //endpoint donde realizará las peticiones.
    "comentariosForm", //Nombre del formulario.
    "/comentarios" //url del componente en el frontend.
);

export default handleActions(reducers, initialState);

// export const crearComentario = (data) => (dispatch, getStore) => {
//     // const parametro = { nombre: data };
//     // console.log("creando comentario", data);
//     api.post("ticket/comentarios", data)
//         .then((response) => {
//             // response.value = response.id;
//             // response.label = response.nombre;

//             // const datos = getStore().form.ticketForm.values;
//             // datos.idEtiquetas.push(response);

//             // const multiSelect = datos.idEtiquetas;

//             // delete datos["idEtiquetas"];
//             // dispatch(initializeForm("ticketForm", datos));

//             // datos.idEtiquetas = multiSelect;
//             dispatch(actions.listar());
//             dispatch(initializeForm("comentariosForm", null));
//             console.log("todo genial Comentario");
//         })
//         .catch(() => {
//             console.log("todo mal Comentario");
//         })
//         .finally(() => {});
// };

// import { handleActions } from "redux-actions";
// import { createReducer } from "./baseReducer";

// import { initialize as initializeForm } from "redux-form";
// import { api } from "api";
// // ------------------------------------
// // Constants
// // ------------------------------------

// export const { reducers, initialState, actions } = createReducer(
//     "comentarios", //identificador dentro del store.
//     "ticket/comentarios", //endpoint donde realizará las peticiones.
//     "comentariosForm", //Nombre del formulario.
//     "/comentarios" //url del componente en el frontend.
// );

// export default handleActions(reducers, initialState);
