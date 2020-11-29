import { handleActions } from "redux-actions";
import { createReducerTicket } from "./baseReducerTicket";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { toUpper } from "lodash";
const SET_BUSQUEDA = "SET_BUSQUEDA";
const SET_CREANDO = "SET_CREANDO";
const SHOW_FORM = "SHOW_FORM";
// const SET_DATA = "SET_DATA";
const SET_PROYECTOS = "SET_PROYECTOS";
const SHOW_MODAL_USUARIOS = "SHOW_MODAL_USUARIOS";
const SHOW_MODAL_DELETE = "SHOW_MODAL_DELETE";
const RESUMEN= "RESUMEN";
const RESUMEN_PRIORIDAD_TICKET= "RESUMEN_PRIORIDAD_TICKET";
const SHOW_DATA_SELECCIONADOS= "SHOW_DATA_SELECCIONADOS";
const SET_TODOS_LOS_DOCS = "SET_TODOS_LOS_DOCS";
// ------------------------------------
// Constants
// ------------------------------------
const endpoint = "tickets";
// const storeId = "ticket";

const baseReducer = createReducerTicket(
    "ticket", //identificador dentro del store.
    endpoint, //endpoint donde realizará las peticiones.
    "ticketForm", //Nombre del formulario.
    "/cards" //url del componente en el frontend.
);



// -----------------------------------
// Pure Actions
// -----------------------------------

export const setTodosLosDocs = (todosLosDocs) => ({
    type: SET_TODOS_LOS_DOCS,
    todosLosDocs,
});

const setData = (data) => ({
    type: "TICKET_DATA",
    data,
});
const setLoader = (loader) => ({
    type: "TICKET_LOADER",
    loader,
});

const showForm = (show) => (dispatch) => {
    dispatch({ type: SHOW_FORM, show_form: show });
};
const showFormDelete = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_DELETE, show_form_delete: show });
};
//Identificador Unico para Usuarios (Modal)
const showFormUsuario = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_USUARIOS, show_form_usuarios: show });
};
const showDatosSeleccioandos = () => (dispatch) => {
    dispatch({ type: SHOW_DATA_SELECCIONADOS, seleccionados: [] });
};
// -----------------------------------
// Mis Actions
// -----------------------------------
const SetResetearBuscador = (palabra) => (dispatch, getStore) => {
    dispatch({ type: SET_BUSQUEDA, resetearBuscador: palabra });
    dispatch(initializeForm("formularioFiltro", null));
    dispatch(baseReducer.actions.searchChange(palabra));
};

const getProyectos = (idSeleccionado) => (dispatch, getStore) => {
    return api.get("proyecto/proyectosCliente", { id: idSeleccionado })
        .then((response) => {
            if (response) {
                let proyectos = [];
                response.results.forEach((Res) => {
                    proyectos.push({ value: Res.id, label: Res.nombre });
                });
                dispatch({ type: SET_PROYECTOS, proyectos });
            }
        })
        .catch(() => {});
};

const registrarProyectoDesdeTickets = () => (dispatch, getState) => {
    const formData = getState().form.ProyectoForm.values;
    console.log("");
    // const proyectosArray = _.cloneDeep(getState().form.profile2.values.empresa);
    const Formulario = _.cloneDeep(getState().form.ticketForm.values);
    console.log("desde usuarios personal", Formulario);
    const proyectosArray =
        !!Formulario && Formulario.proyecto ? Formulario.proyecto : [];
    
    console.log("proyectoArrays", proyectosArray);
    api.post("proyecto", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };

            let formValues = Formulario;
            formValues = !!formValues ? formValues : {};
            formValues.idProyecto = nuevo_elemento;
            dispatch(initializeForm("ticketForm", formValues));
            dispatch(showForm(false));
        })
        .catch((error) => {})
        .finally(() => {});
};

const listadoPersonal = (page = 1) => (dispatch, getStore) => {
 
    const resource = getStore()["ticket"];
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch(setLoader(true));
    api.get("tickets/ticketCliente", params)
        .then((response) => {
            dispatch(setData(response));
            dispatch(setPage(page));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const registrarUserDesdeTicket = () => (dispatch, getStore) => {
    const formData = getStore().form.profile2.values;
    const Formulario = _.cloneDeep(getStore().form.ticketForm.values);
    if (
        formData.password === null ||
        formData.password === undefined ||
        formData.password === ""
    )
    formData.password = "Temporal";
    console.log("FormData de registro ticket: ", formData);

    api.post( "user", formData )
        .then( ( response ) => {
        const nuevo_elemento = {
                value: response[0].id,
                label: response[0].nombre,
            };
            console.log( 'response:', response );
            let formValues = Formulario;
            formValues = !!formValues ? formValues : {};
            formValues.idUsuarioCliente = nuevo_elemento;
            dispatch(showForm(false));
            dispatch(initializeForm("ticketForm", formValues));
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            dispatch(showFormUsuario(false));
        });
};


const registrarProyecto = () => (dispatch, getState) => {
    const formData = getState().form.ProyectoForm.values;
    console.log("");
    // const proyectosArray = _.cloneDeep(getState().form.profile2.values.empresa);
    const Formulario = _.cloneDeep(getState().form.ticketForm.values);
    console.log("desde usuarios personal", Formulario);

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
            dispatch(initializeForm("ticketForm", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};

const filtrar = (page = 1) => (dispatch, getStore) => {
    setTimeout(() => {
        const resource = getStore().form.formularioFiltro.values;
        const parametro = { ...resource };

        // parametro.idGrupo
        //     ? (parametro.idGrupo = parametro.idGrupo.value)
        //     : null;

        for (const key in parametro) {
            if (parametro.hasOwnProperty(key)) {
                parametro[key] = parametro[key].value;

                if (parametro[key] === "") {
                    delete parametro[key];
                }
            }
        }

        dispatch({ type: SET_BUSQUEDA, resetearBuscador: "" });
        // dispatch(setLoader(true));
        dispatch(baseReducer.actions.listar())
        // api.get(endpoint, parametro)
        //     .then((response) => {
        //         dispatch(setData(response));
        //     })
        //     .catch(() => {
        //         // console.log("jajajaja :( ");
        //     })
        //     .finally(() => {
        //         dispatch(setLoader(false));
        //     });
    }, 1);
};
const crearFusion = (datos) => (dispatch, getStore) => {

    const estado = getStore();
    // const estados = estado.getState();
    const formData = estado.form.Fusion.values;
    console.log("Hola desde fusion redux", formData);
    dispatch(setLoader(true));
    api.post("fusion", formData)
        .then(() => {
            dispatch(baseReducer.actions.listar());
            dispatch(showForm(false));
            NotificationManager.success(
                "Registro creado Interno",
                "Éxito",
                3000
            );

            // if (!!resourceList) dispatch(push(resourceList));
        })
        .catch((error) => {
            console.log("Error en Fusion", error)
            NotificationManager.error("Error en la creación Interno", "ERROR");
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const eliminarTickets = (datos) => (dispatch, getStore, getState) => {
    const estado = getStore();
    // const estados_seleccionado = estado.getState();
    const formData = estado.form.Eliminarticket.values;
    // console.log("Hola desde eliniar estado redux ", estado);
    // console.log("Hola desde eliniar from redux ", formData);
    // dispatch(setLoader(true));
    // console.log( 'estados_seleccionado: ', estados_seleccionado )
    // ciclo = formData.tickets.length
    
    // for ()
    api.put("tickets/deleteTickets", formData.tickets)
        .then(() => {
            console.log( 'fin del envio de datos con exito' )
            dispatch(baseReducer.actions.listar());
            dispatch( showFormDelete( false ) );
            NotificationManager.success(
                "Registro(s) elimidado(s)",
                "Éxito",
                3000
            );       
        })
        .catch( ( error ) => {
            console.log( 'algo paso ', error )
            NotificationManager.error("Error en la eliminacion", "ERROR");
        } )
};

const getResumen =() =>(dispatch, getStore)  =>{
    const parametro={} 
    api.get(`${endpoint}/resumenEstados`, parametro)
    .then((response) => {
        console.log("RESUMEN ", response)
        console.log("RESUMEN", response.Results )
        dispatch({type:RESUMEN, dataResumen:response});
    })
    .catch(() => {
    })
    .finally(() => {
       
    });

}


const getResumenPrioridad =() =>(dispatch, getStore)  =>{
    const parametro={} 
    api.get(`${endpoint}/resumenPrioridad`, parametro)
    .then((response) => {
        console.log("Prioridad", response.Results )
        dispatch({type:RESUMEN_PRIORIDAD_TICKET, dataResumenPrioridad:response});
    })
    .catch(() => {

    })
    .finally(() => {
       
    });

}

const MostrarOcultarModal = (show) => (dispatch) => {
    dispatch(showFormUsuario(show))
}

const getDocumentosTickets = (idTicket) => (dispatch, getStore) => {
    // let roles = [];
    const params = { idTicketDoc:idTicket }

    api.get("tickets/getDocumentos", params)
        .then((response) => {
            if ( response ) {
                console.log( 'Documentos ', response )
                dispatch( initializeForm( 'ticketForm', response ) )
                dispatch( {type: SET_TODOS_LOS_DOCS, todosLosDocs :response })
            }
            // console.log('place user: ',roles);
            // return roles;
        })
        .catch(() => {
            return [];
        });
};
// -----------------------------------
// Reducers
// -----------------------------------

export const reducers = {
    ...baseReducer.reducers,
    // [SET_DATA]: (state, { data }) => {
    //     return {
    //         ...state,
    //         data,
    //     };
    // },
    [SET_BUSQUEDA]: (state, { resetearBuscador }) => {
        return {
            ...state,
            resetearBuscador,
        };
    },
    [SET_TODOS_LOS_DOCS]: (state, { todosLosDocs }) => {
        return {
            ...state,
            todosLosDocs,
        };
    },
    [SHOW_FORM]: (state, { show_form }) => {
        return {
            ...state,
            show_form,
        };
    },
    [SET_PROYECTOS]: (state, { proyectos }) => {
        return {
            ...state,
            proyectos,
        };
    },

    [SHOW_MODAL_USUARIOS]: (state, { show_form_usuarios }) => {
        return {
            ...state,
            show_form_usuarios,
        };
    },
    [SHOW_MODAL_USUARIOS]: (state, { seleccionados }) => {
        return {
            ...state,
            seleccionados,
        };
    },
    [SHOW_MODAL_DELETE]: (state, { show_form_delete }) => {
        return {
            ...state,
            show_form_delete,
        };
    },

    [RESUMEN]: (state, { dataResumen }) => { //va a recibir la variable data, y se lo va a sobrescribir al estado
        return {
            ...state,
            dataResumen,
        };
    
    },
    [RESUMEN_PRIORIDAD_TICKET]: (state, { dataResumenPrioridad }) =>{
        return {
            ...state,
            dataResumenPrioridad,
        };
    
    },



};

import { crearEtiqueta } from "./propiedades/etiquetas/etiquetas";
import { crearComentario } from "../comentarios/comentarios";

export const actions = {
    // ActualizarPropiedad,
    filtrar,
    crearEtiqueta,
    crearComentario,
    setTodosLosDocs,
    getDocumentosTickets,
    getProyectos,
    getResumenPrioridad,
    SetResetearBuscador,
    listadoPersonal,
    showForm,
    registrarProyecto,
    registrarProyectoDesdeTickets,
    crearFusion,
    registrarUserDesdeTicket,
    MostrarOcultarModal,
    eliminarTickets,
    showFormDelete,
    getResumen,
    ...baseReducer.actions,
};

export const initialState = {
    resetearBuscador: "",
    show_form: false,
    proyectos: [],
    todosLosDocs: [],
    show_form_usuarios: false,
    show_form_delete: false,
    dataResumen: null,
    dataResumenPrioridad: null,
    ...baseReducer.initialState,
};

export default handleActions(reducers, initialState);

