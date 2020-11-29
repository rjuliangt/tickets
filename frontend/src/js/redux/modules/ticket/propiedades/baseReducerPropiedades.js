import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { createReducer } from "../../baseReducer/baseReducer";

const SHOW_MODAL_TIPOS = "SHOW_MODAL_TIPOS";
const showModalTipos = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_TIPOS, show_modal_tipos: show });
};

const SHOW_MODAL_ESTADOS = "SHOW_MODAL_ESTADOS";
const showModalEstados = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_ESTADOS, show_modal_estados: show });
};

const SHOW_MODAL_PRIORIDADES = "SHOW_MODAL_PRIORIDADES";
const showModalPrioridades = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_PRIORIDADES, show_modal_prioridades: show });
};

const SHOW_MODAL_ETIQUETAS = "SHOW_MODAL_ETIQUETAS";
const showModalEtiquetas = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_ETIQUETAS, show_modal_etiquetas: show });
};

export const createReducerModificado = (
    storeId,
    endpoint,
    formName = undefined,
    resourceList = undefined
) => {
    // ------------------------------------
    // BaseReducer
    // ------------------------------------
    const baseReducer = createReducer(
        storeId, //identificador dentro del store.
        endpoint, //endpoint donde realizará las peticiones.
        formName, //Nombre del formulario.
        resourceList //url del componente en el frontend.
    );

    // ------------------------------------
    // Constants
    // ------------------------------------

    const constants = {
        LOADER: `${storeId.toUpperCase()}_LOADER`,
        DATA: `${storeId.toUpperCase()}_DATA`,
        PAGE: `${storeId.toUpperCase()}_PAGE`,
    };

    // -----------------------------------
    // Pure Actions
    // -----------------------------------

    const setLoader = (loader) => ({
        type: constants.LOADER,
        loader,
    });

    const setData = (data) => ({
        type: constants.DATA,
        data,
    });

    const setPage = (page) => ({
        type: constants.PAGE,
        page,
    });

    // -----------------------------------
    // Actions
    // -----------------------------------

    const listar = (page = 1) => (dispatch, getStore) => {
        const resource = getStore()[storeId];
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        dispatch(setLoader(true));
        api.get(endpoint, params)
            .then((response) => {
                dispatch(initializeForm(formName, null));
                dispatch(setData(response));
                dispatch(setPage(page));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

    const crear = (data) => (dispatch) => {
        dispatch(setLoader(true));
        console.log("hola metiendo datos desde el nuevo", data);
        api.post(endpoint, data)
            .then(() => {
                dispatch(listar());
                NotificationManager.success(
                    "Registro creado Interno",
                    "Éxito",
                    3000
                );

                // if (!!resourceList) dispatch(push(resourceList));
            })
            .catch(() => {
                NotificationManager.error(
                    "Error en la creación Interno",
                    "ERROR"
                );
            })
            .finally(() => {
                dispatch(setLoader(false));

                dispatch(showModalTipos(false));
                dispatch(showModalEstados(false));
                dispatch(showModalPrioridades(false));
                dispatch(showModalEtiquetas(false));
            });
    };

    const editar = (id, data) => (dispatch) => {
        dispatch(setLoader(true));
        api.put(`${endpoint}/${id}`, data)
            .then(() => {
                NotificationManager.success(
                    "Registro actualizado",
                    "Éxito",
                    3000
                );
                dispatch(listar());
                // if (!!resourceList) dispatch(push(resourceList));
            })
            .catch(() => {
                NotificationManager.error("Error en la edición", "ERROR", 0);
            })
            .finally(() => {
                dispatch(setLoader(false));

                dispatch(showModalTipos(false));
                dispatch(showModalEstados(false));
                dispatch(showModalPrioridades(false));
                dispatch(showModalEtiquetas(false));
            });
    };

    const { leer, eliminar, searchChange, onSortChange } = baseReducer.actions;

    const actions = {
        listar,
        leer,
        crear,
        editar,
        eliminar,
        searchChange,
        onSortChange,
        showModalTipos,
        showModalEstados,
        showModalPrioridades,
        showModalEtiquetas,
    };

    // const initialState = baseReducer.initialState;
    // const reducers = baseReducer.reducers;

    const reducers = {
        [SHOW_MODAL_ETIQUETAS]: (state, { show_modal_etiquetas }) => {
            return {
                ...state,
                show_modal_etiquetas,
            };
        },
        [SHOW_MODAL_PRIORIDADES]: (state, { show_modal_prioridades }) => {
            return {
                ...state,
                show_modal_prioridades,
            };
        },
        [SHOW_MODAL_TIPOS]: (state, { show_modal_tipos }) => {
            return {
                ...state,
                show_modal_tipos,
            };
        },
        [SHOW_MODAL_ESTADOS]: (state, { show_modal_estados }) => {
            return {
                ...state,
                show_modal_estados,
            };
        },
        ...baseReducer.reducers,
    };

    const initialState = {
        show_modal_etiquetas: false,
        show_modal_prioridades: false,
        show_modal_tipos: false,
        show_modal_estados: false,
        ...baseReducer.initialState,
    };

    return { reducers, initialState, actions };
};
