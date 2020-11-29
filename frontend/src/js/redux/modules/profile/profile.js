import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA = "SET_DATA";
const SET_LOADER = "SET_LOADER";
const SET_REGISTRO = "SET_REGISTRO";

export const listar = () => (dispatch, getStore) => {
    dispatch({ type: SET_LOADER, loader: true });
    api.get("user")
        .then((response) => {
            dispatch({ type: SET_DATA, data: response });
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch({ type: SET_LOADER, loader: false });
        });
};

export const editar = (id) => (dispatch, getStore) => {
    dispatch({ type: SET_LOADER, loader: true });
    api.get(`user/${id}`)
        .then((response) => {
            // let scrum_master = null
            // if ( response.scrum_master ) {
            //     scrum_master = {value:response.scrum_master.id, label:response.scrum_master.first_name}
            // }
            // response.scrum_master = scrum_master
            console.log( "response editar : ", response );
            dispatch(initializeForm("profile2", response));
            dispatch({ type: SET_REGISTRO, registro: response });
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch({ type: SET_LOADER, loader: false });
        });
};

export const registrarProfile = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.profile2.values;
    if (
        formData.password === null ||
        formData.password === undefined ||
        formData.password === ""
    )
        formData.password = "Temporal";

    console.log("estado: ", estado);
    console.log("FormData: ", formData);

    api.post("user", formData)
        .then((response) => {
            NotificationManager.success(
                "Profile registrada correctamente",
                "Éxito",
                3000
            );
            dispatch(push("/user"));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {});
};

export const actualizarProfile = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.profile2.values;
    delete formData.profile;
    console.log("estado: ", estado);
    console.log("FormDataActualizar: ", formData);

    api.put(`user/${formData.id}`, formData)
        .then((response) => {
            NotificationManager.success(
                "Profile actualizada correctamente",
                "Éxito",
                3000
            );
            dispatch(push("/usuarios"));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {});
};

export const actions = {
    registrarProfile,
    actualizarProfile,
    listar,
    editar,
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

    [SET_REGISTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},

    data: [],
    registro: null,
};

export default handleActions(reducers, initialState);
