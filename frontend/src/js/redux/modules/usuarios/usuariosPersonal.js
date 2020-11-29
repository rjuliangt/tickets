import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import _ from "lodash";

const SET_DATA = "SET_DATA";
const SET_LOADER = "SET_LOADER";
const SET_REGISTRO = "SET_REGISTRO";
const SHOW_FORM = "SHOW_FORM";

// Este es el redux que se utiliza con profile2
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
    console.log("desde USuarioPersonal");
    api.get(`user/${id}`)
        .then((response) => {
            // response.idCategoria = { label: "Desarrollo", value: 2 };
            console.log("response editar DAta: ", response);
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

export const registrarUser = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.profile2.values;
    if (
        formData.password === null ||
        formData.password === undefined ||
        formData.password === ""
    )
        formData.password = "Temporal";
    // formData.idCategoria = formData.idCategoria.value;
    console.log("estado: ", estado);
    console.log("FormDataRegistrar: ", formData);

    api.post("user", formData)
        .then((response) => {
            NotificationManager.success(
                "Usaurio registrado correctamente",
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

export const actualizarUser = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.profile2.values;
    if (
        formData.password === null ||
        formData.password === undefined ||
        formData.password === ""
    )
    console.log("estado: ", estado);
    console.log("FormData Actualizar:", formData);
    console.log(formData.id)
    api.put(`user/${formData.id}`, formData)
        .then((response) => {
            NotificationManager.success(
                "Usuario actualizado correctamente",
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

const showForm = (show) => (dispatch) => {
    dispatch({ type: SHOW_FORM, show_form: show });
};

const registrarProyecto = () => (dispatch, getState) => {
    const formData = _.cloneDeep(getState().form.ProyectoForm.values);
    console.log("");
    // const proyectosArray = _.cloneDeep(getState().form.profile2.values.empresa);
    const Formulario = _.cloneDeep(getState().form.profile2.values);
    console.log("desde usuarios personal", Formulario);
    //!! verifica que no sea undefined
    const proyectosArray =
        !!Formulario && Formulario.proyecto ? Formulario.proyecto : [];

    console.log("proyectoArrays", proyectosArray);
    api.post("proyecto", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };
            proyectosArray.push(nuevo_elemento);
            console.log("proyectoArrays2", proyectosArray);
            dispatch(showForm(false));
            // let formValues = _.cloneDeep(getState().form.profile2.values);
            let formValues = Formulario;
            formValues = !!formValues ? formValues : {};
            formValues.proyecto = proyectosArray;
            dispatch(initializeForm("profile2", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};
const registrarEmpresa = () => (dispatch, getState) => {
    const formData = getState().form.EmpresaForm.values;
    api.post("empresa", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };
            dispatch(showForm(false));
            let formValues = getState().form.ProyectoForm.values;
            formValues = !!formValues ? formValues : {};
            formValues.empresa = nuevo_elemento;
            dispatch(initializeForm("ProyectoForm", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};

export const actions = {
    registrarUser,
    actualizarUser,
    listar,
    editar,
    showForm,
    registrarEmpresa,
    registrarProyecto,
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
    [SHOW_FORM]: (state, { show_form }) => {
        return {
            ...state,
            show_form,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
    show_form: false,
    data: [],
    registro: null,
};

export default handleActions(reducers, initialState);
