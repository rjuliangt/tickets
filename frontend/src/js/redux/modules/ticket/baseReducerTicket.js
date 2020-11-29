import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { createReducer } from "./baseReducerModificado";

export const createReducerTicket = (
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
    const SET_FILES_FORM = 'SET_FILES_FORM'
    
    
    const constants = {
        LOADER: `${storeId.toUpperCase()}_LOADER`,
        ITEM: `${storeId.toUpperCase()}_ITEM`,
    };

    // -----------------------------------
    // Pure Actions
    // -----------------------------------

    const setLoader = (loader) => ({
        type: constants.LOADER,
        loader,
    });

    const setItem = (item) => ({
        type: constants.ITEM,
        item,
    });

    // -----------------------------------
    // Actions
    // -----------------------------------

    const leer = (id) => (dispatch) => {
        dispatch( setLoader( true ) );
        let local_response = undefined
        let params = {idTicketDoc:id}
        api.get("tickets/getDocumentos", params)
        .then((response) => {
            if ( response ) {
                console.log( 'Documentos ', response )
                local_response = response
                // dispatch( initializeForm( 'ticketForm', response ) )
                // dispatch( {type: SET_TODOS_LOS_DOCS, todosLosDocs :response })
            }
            // console.log('place user: ',roles);
            // return roles;
        })
        .catch(() => {
            return [];
        } );
        
        api.get(`${endpoint}/${id}`)
            .then((response) => {
                // response.idGrupo = { value: 1, label: "Grupo Ax" };
                //programaraca
                // console.log("otra vez aca 1xd noche", response);

                for (const key in response) {
                    if (!response[key]) {
                        continue;
                    }
                    // if (key.substr(0, 9) == "idUsuario") {
                    //     console.log("este es el dato", response[key]);
                    //     continue;
                    // }
                    if (key.substr(0, 2) == "id") {
                        if (response[key].hasOwnProperty("nombre")) {
                            response[key].label = response[key].nombre;
                            // console.log("NOMBRE el key es", key);
                        }
                        if (response[key].hasOwnProperty("id")) {
                            response[key].value = response[key].id;
                            // console.log("ID el key es", key);
                        }
                    }
                    if (key == "idEtiquetas") {
                        // console.log("ID el key es", key);
                        // console.log("sus Datos son", response[key]);
                        response[key].forEach((element) => {
                            if (element.hasOwnProperty("nombre")) {
                                element.label = element.nombre;
                            }
                            if (element.hasOwnProperty("id")) {
                                element.value = element.id;
                            }
                        });
                    }
                }
                response.descripcion = {
                    html_content: response.descripcion,
                    images: [],
                };
                response.documentos = local_response.documentos
                // formData.descripcion = {
                //     html_content: response.descripcion,
                //     images: [],
                // };
                console.log("desde reducer", response);
                dispatch(setItem(response));
                if (!!formName) dispatch(initializeForm(formName, response));
                if (!!formName) dispatch(initializeForm('crearTicketForm', response));
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

    const crear = (data) => (dispatch, getStore) => {
        dispatch(setLoader(true));
        console.log("este es el reducer", data);
        // console.log(data)
        const parametro = { ...data };
        const estado = getStore().ticket
        const archivos_adjuntos = estado.files
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
        if (parametro.descripcion && parametro.descripcion.images) {
            attachments = parametro.descripcion.images;
            delete parametro.descripcion.images;
            parametro.descripcion = parametro.descripcion.html_content;
        }
        if ( archivos_adjuntos.length > 0 ) {
            console.log('archivos adjuntos: ', archivos_adjuntos)
            // attachments.push( archivos_adjuntos )
            for ( let x = 0; x < archivos_adjuntos.length; x++ ) {
                attachments.push( archivos_adjuntos[x] )
            }
            dispatch( {type: SET_FILES_FORM, files:[] })
        }
        console.log("desde images ", attachments);
        api.postAttachments(endpoint, parametro, attachments)
            .then(() => {
                NotificationManager.success("Registro creado", "Éxito", 3000);
                // if (!!resourceList) dispatch(push(resourceList));
                if (getStore().login.me.idRoles) {
                    if ((getStore().login.me.idRoles.nombre == "Cliente")) {
                        dispatch(push("/ticketsCliente"));
                    } else {
                        dispatch(push("/cards"));
                    }
                } else {
                    dispatch(push("/cards"));
                }
            })
            .catch(() => {
                NotificationManager.error("Error en la creación", "ERROR");
            })
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

    const setFiles = ( files ) => ( dispatch, getStore ) => {
        console.log( 'archivos desde redux ', files );
        
        dispatch( {type:SET_FILES_FORM, files})
    }
    
    const editar = (id, data) => (dispatch, getStore) => {
        dispatch(setLoader(true));

        const parametro = { ...data };
        const estado = getStore().ticket
        const archivos_adjuntos = estado.files
        
        for (const key in parametro) {
            if (!parametro[key]) {
                continue;
            }
            // if (key.substr(0, 9) == "idUsuario") {
            //     console.log("este es el dato", parametro[key]);
            //     continue;
            // }

            if (key.substr(0, 2) == "id") {
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
        if (parametro.descripcion && parametro.descripcion.images) {
            attachments = parametro.descripcion.images;
            delete parametro.descripcion.images;
            parametro.descripcion = parametro.descripcion.html_content;
        }
        
        if ( archivos_adjuntos.length > 0 ) {
            console.log('archivos adjuntos: ', archivos_adjuntos)
            for ( let x = 0; x < archivos_adjuntos.length; x++ ) {
                attachments.push( archivos_adjuntos[x] )
            }
            dispatch( {type: SET_FILES_FORM, files:[] })
        }
        
        api.putAttachments(`${endpoint}/${id}`, parametro, attachments)
            .then(() => {
                NotificationManager.success(
                    "Registro actualizado",
                    "Éxito",
                    3000
                );

                if (getStore().login.me.idRoles) {
                    if ((getStore().login.me.idRoles.nombre == "Cliente")) {
                        dispatch(push("/ticketsCliente"));
                    } else {
                        dispatch(push("/cards"));
                    }
                } else {
                    dispatch(push("/cards"));
                }
            })
            .catch(() => {
                NotificationManager.error("Error en la edición", "ERROR", 0);
            })
            .finally(() => {
                dispatch(setLoader(false));
            });
    };
    const {
        listar,
        eliminar,
        searchChange,
        onSortChange,
    } = baseReducer.actions;

    const actions = {
        listar,
        leer,
        crear,
        editar,
        eliminar,
        searchChange,
        onSortChange,
        setFiles,
    };

    // -----------------------------------
    // Reducers
    // -----------------------------------

    const reducers = {
        ...baseReducer.reducers,
        [SET_FILES_FORM]: (state, {files}) => {
            return {
                ...state,
                files,
            };
        },

        [constants.LOADER]: (state, { loader }) => {
                   return {
                        ...state,
                       loader,
                   };
            },


};



    const initialState = {
        ...baseReducer.initialState,
        files : [],
        loader: false,
    };
    // const initialState = baseReducer.initialState;
    // const reducers = baseReducer.reducers;

    return { reducers, initialState, actions };
};
