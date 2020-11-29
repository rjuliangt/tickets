import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { createReducer } from "../baseReducer/baseReducer";
export const createReducerComentario = (
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
        IDTICKET: `${storeId.toUpperCase()}_IDTICKET`,
    };

    const setIdTicket = (idticket) => ({
        type: constants.IDTICKET,
        idticket,
    });

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
        // params.ordering = resource.ordering;
        // params.search = resource.search;
        params.idTicket__id = resource.idticket;

        console.log("este es el filtrosss", params);

        dispatch(setLoader(true));
        console.log("estos son los parametrsoos", params);
        api.get(`${endpoint}/listarComentarios`, params)
            .then((response) => {
                console.log("leyenedooooo NOOOOOO", response);
                dispatch( setData( response ) );
                const valor = { contenido :{
                    html_content: '',
                    images: [],
                }};
                const nuevo = valor
                dispatch(initializeForm('comentariosForm', nuevo));
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
            });
    };

    const editar = (id, data) => (dispatch, getStore) => {
        dispatch( setLoader( true ) );
        const { values } = getStore().form[formName];
        data.contenido = values.contenido;
        const parametro = { ...data };
        for (const key in parametro) {
            if (!parametro[key]) {
                continue;
            }

            if (key.substr(0, 2) == "id") {
                console.log("tiene Id", key);
                if (parametro[key].hasOwnProperty("value")) {
                    parametro[key] = parametro[key].value;
                }
            }
            if (key == "idEtiquetas") {
                for (var i = 0; i < parametro[key].length; i++) {
                    parametro[key][i] = parametro[key][i].value;
                }
            }
        }
        let attachments = [];
        if (parametro.contenido && parametro.contenido.images) {
            attachments = parametro.contenido.images;
            // delete parametro.contenido.images;
            parametro.contenido = parametro.contenido.html_content;
        }
        api.putAttachments(`${endpoint}/${id}`, data , attachments,parametro)
            .then((response) => {
                NotificationManager.success(
                    "Registro actualizado",
                    "Éxito",
                    3000
                );
                const resource = getStore()[storeId];
                console.log('el ied',response)
                console.log('el ied',resource)
                if (getStore().login.me.idRoles) {
                    if ((getStore().login.me.idRoles.nombre =="Cliente")) {
                        // dispatch(push(`/ticketCliente/${resource.item.idTicket}/ver`));
                        dispatch(push(`/ticketCliente/${resource.idticket}/ver`));
                    } else {
                        dispatch(
                            push(`/ticket/${resource.idticket}/ver`)
                        );
                    }
                } else {
                    dispatch(push(`/ticket/${resource.idticket}/ver`));
                }
            })
            .catch(() => {
                NotificationManager.error("Error en la edición", "ERROR", 0);
            })
            .finally(() => {
                dispatch(setLoader(false));
            });
    };
    
    
    const leer = (id) => (dispatch) => {
        dispatch( setLoader( true ) );        
        api.get(`${endpoint}/${id}`)
            .then((response) => {
           
                response.contenido = {
                    html_content: response.contenido,
                    images: [],
                };
                console.log("desde reducer comentario", response);
                dispatch(initializeForm(formName, response));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };
    
    const filtrarPorTicket = (idticket) => (dispatch) => {
        console.log("haciendo el filtrarPorTicket", idticket);
        dispatch(setIdTicket(idticket));
        dispatch(listar());
    };

    const crearComentario = (data) => (dispatch, getStore) => {

        dispatch(setLoader(true));
        const { values } = getStore().form[formName];
        data.contenido = values.contenido;
        const parametro = { ...data };
        for (const key in parametro) {
            if (!parametro[key]) {
                continue;
            }

            if (key.substr(0, 2) == "id") {
                console.log("tiene Id", key);
                if (parametro[key].hasOwnProperty("value")) {
                    parametro[key] = parametro[key].value;
                }
            }
            if (key == "idEtiquetas") {
                for (var i = 0; i < parametro[key].length; i++) {
                    parametro[key][i] = parametro[key][i].value;
                }
            }
        }
        let attachments = [];
        if (parametro.contenido && parametro.contenido.images) {
            attachments = parametro.contenido.images;
            // delete parametro.contenido.images;
            parametro.contenido = parametro.contenido.html_content;
        }
        api.postAttachments(endpoint, parametro, attachments)
            .then((response) => {
                dispatch( actions.listar() );
                console.log( "todo genial Comentario", response.contenido );
                const valor = { contenido :{
                    html_content: '',
                    images: [],
                }};
                const nuevo = valor
                dispatch(initializeForm("comentariosForm", nuevo ));
                console.log("se inicializo mal el form", nuevo);
            })
            .catch(() => {
                console.log("todo mal Comentario");
            })
            .finally( () => {
                dispatch( setLoader( false ) );
            } );
    };

    const { eliminar, searchChange, onSortChange } = baseReducer.actions;

    const actions = {
        listar,
        leer,
        crear,
        editar,
        eliminar,
        filtrarPorTicket,
        onSortChange,
        searchChange,
        crearComentario,
    };

    const reducers = {
        ...baseReducer.reducers,

        [constants.IDTICKET]: (state, { idticket }) => {
            return {
                ...state,
                idticket,
            };
        },
    };
    const initialState = {
        idticket: "",
        loader: false,

        ...baseReducer.initialState,
    };

    return { reducers, initialState, actions };
};
