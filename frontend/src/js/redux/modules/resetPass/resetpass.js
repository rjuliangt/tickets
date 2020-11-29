import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LOADER = "REGISTER_LOADER";

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = (loader) => ({
    type: LOADER,
    loader,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    data["email"] = getStore().login.me.email;
    dispatch(setLoader(true));

    api.post("user/reset_pass", data)
        .then((e) => {
            // dispatch(push("/login"));
            NotificationManager.success(
                "Contraseña Cambiada Exitosamente",
                "Éxito",
                3000
            );

            api.post("/user/logout")
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
            localStorage.removeItem("token");
        })
        .catch((e) => {
            NotificationManager.error(
                "Credenciales incorrectas, vuelva a intentar",
                "ERROR",
                0
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const actions = {
    onSubmit,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
