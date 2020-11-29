import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { NotificationManager } from "react-notifications";

export const createReducer = (
    storeId,
    endpoint,
    formName = undefined,
    resourceList = undefined
) => {
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
        console.log("hola metiendo datos", data);
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
            });
    };

    const actions = {
        listar,
        leer,
        crear,
        editar,
        eliminar,
        searchChange,
        onSortChange,
    };

    // -----------------------------------
    // Reducers
    // -----------------------------------

    // const reducers = {
    //     [constants.LOADER]: (state, { loader }) => {
    //         return {
    //             ...state,
    //             loader,
    //         };
    //     },
    //     [constants.DATA]: (state, { data }) => {
    //         return {
    //             ...state,
    //             data,
    //         };
    //     },
    //     [constants.PAGE]: (state, { page }) => {
    //         return {
    //             ...state,
    //             page,
    //         };
    //     },

    // };

    // const initialState = {
    //     loader: false,
    //     data: {
    //         results: [],
    //         count: 0,
    //     },
    //     item: {},
    //     page: 1,
    //     ordering: "",
    //     search: "",
    // };

    // return { reducers, initialState, actions };
};
