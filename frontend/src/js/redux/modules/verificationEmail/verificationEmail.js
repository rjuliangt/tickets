import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA = "SET_DATA";
const SET_LOADER = "SET_LOADER";
const SET_REGISTRO = "SET_REGISTRO";

export const verificarToken = (dato) => (dispatch, getStore) => {
    // const estado = getStore();
    // console.log("estado: ", estado);
    // const token = `{"token": "${dato}"}`;
    // console.log("FormData: ", token);

    api.post("user/verification", { token: dato })
        .then((response) => {
            console.log("apii genial", response);
            NotificationManager.success("Email verificado", "Éxito", 4000);
            dispatch(push("/login"));
        })
        .catch((error) => {
            console.log("apii error", error);
            NotificationManager.error("Al verficar tu corrreo", "ERROR", 4000);
            dispatch(push("/login"));
        })
        .finally(() => {});
};

export const actions = {
    verificarToken,
};

export const reducers = {};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
