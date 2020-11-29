import { handleActions } from "redux-actions";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA = "SET_DATA";
const SET_LOADER = "SET_LOADER";
const SET_REGISTRO = "SET_REGISTRO";
const SEARCH_USERS = "SEARCH_USERS";
const PAGE = "VIEW_PAGE";
// ------------------------------------
// Constants
// ------------------------------------
const setLoader = (loader) => ({
    type: SET_LOADER,
    loader,
});

const setSearch = (search) => ({
    type: SEARCH_USERS,
    search,
} );

const setPage = (page) => ({
    type: PAGE,
    page,
} );

export const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore().usuariosList;
    const params = { page };
    params.search = resource.search;
    dispatch({ type: SET_LOADER, loader: true });
    api.get("user", params)
        .then((response) => {
            console.log(response);
            dispatch( { type: SET_DATA, data: response } );
            dispatch(setPage(page));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch({ type: SET_LOADER, loader: false });
        });
};

const eliminar = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`user/${id}`)
        .then(() => {
            dispatch(listar());
            NotificationManager.success("Registro eliminado", "Éxito", 3000);
        })
        .catch(() => {
            NotificationManager.success(
                "Error en la transacción",
                "Éxito",
                3000
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const searchChange = (search) => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

export const actions = {
    listar,
    searchChange,
    eliminar,
};

export const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [SET_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [PAGE]: (state, { page }) => {
            return {
                ...state,
                page,
            };
    },
    [SET_REGISTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [SEARCH_USERS]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
    page:1,
    data: {},
    registro: null,
    search: "",
};

export default handleActions(reducers, initialState);
