import { handleActions } from 'redux-actions';
import { createReducerTicket } from "./baseReducerTicket";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SHOW_FORM = "SHOW_FORM";
const SHOW_MODAL_DELETE = "SHOW_MODAL_DELETE";
const SET_BUSQUEDA_CLIENTE = "SET_BUSQUEDA_CLIENTE";
const TICKET_LISTADO_CLIENTE = "TICKET_LISTADO_CLIENTE";
//const GUARDAR_REGISTRO_CLIENTE = "GUARDAR_REGISTRO_CLIENTE";

const endpoint = "tickets";
// const storeId = "ticket";

const baseReducer = createReducerTicket(
    "ticketCliente", //identificador dentro del store.
    endpoint, //endpoint donde realizará las peticiones.
    "ticketForm", //Nombre del formulario.
    "/ticketCliente/create" //url del componente en el frontend
);

// const setData = (data) => ({
//     type: "TICKET_DATA_CLIENTE",
//     data,
// });
// const setLoader = (loader) => ({
//     type: "TICKET_LOADER_CLIENTE",
//     loader,
// });

const showForm = (show) => (dispatch) => {
    dispatch({ type: SHOW_FORM, show_form: show });
};
const showFormDelete = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL_DELETE, show_form_delete: show });
};

const SetResetearBuscadorCliente = (palabra) => (dispatch, getStore) => {
    dispatch({ type: SET_BUSQUEDA_CLIENTE, resetearBuscadorCliente: palabra });
    dispatch(initializeForm("formularioFiltro", null));
    dispatch(baseReducer.actions.searchChange(palabra));
};

export const listarTicketCliente = () => (dispatch) => {
    
    api.get('tickets/ticketCliente/').then((response) => {
        console.log("Listar Tickets: ", response);
        dispatch({type: TICKET_LISTADO_CLIENTE , dataCliente: response });
        // dispatch(setData(response));
        // dispatch(setPage(page));

        //NotificationManager.success('Registro realizado con', 'Éxito', 3000);
        // dispatch(list());

    }).catch((error) => {
        console.log('Error Cliente', error);
        NotificationManager.error('No se pudo cargar el registro', 'ERROR', 0);
   
    }).finally(() => {
        // dispatch(setLoader(false));
       
    });
};

const filtrarCliente = (page = 1) => (dispatch, getStore) => {
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

        dispatch({ type: SET_BUSQUEDA_CLIENTE, resetearBuscadorCliente: "" });
        dispatch(setLoader(true));

        api.get(endpoint, parametro)
            .then((response) => {
                dispatch(setData(response));
            })
            .catch(() => {
                // console.log("jajajaja :( ");
            })
            .finally(() => {
                dispatch(setLoader(false));
            });
    }, 1);
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
            dispatch(listarTicketCliente());
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

const MostrarOcultarModal = (show) => (dispatch) => {
    dispatch(showFormUsuario(show))
}

//funciones reductoras
export const reducers = {
   
    [TICKET_LISTADO_CLIENTE]: (state, { dataCliente }) => {
        return {
            ...state,
            dataCliente,
        };
    
    },

    [SET_BUSQUEDA_CLIENTE]: (state, { resetearBuscadorCliente }) => {
        return {
            ...state,
            resetearBuscadorCliente,
        };
    },

    [SHOW_FORM]: (state, { show_form }) => {
        return {
            ...state,
            show_form,
        };
    },

    [SHOW_MODAL_DELETE]: (state, { show_form_delete }) => {
        return {
            ...state,
            show_form_delete,
        };
    },

 
};


export const actions = {
    listarTicketCliente,
    filtrarCliente,
    SetResetearBuscadorCliente,
    eliminarTickets,
    showForm,
    MostrarOcultarModal,
    showFormDelete,

    ...baseReducer.actions,
};


//Siempre necesitamos un estado inicial
export const initialState = {
    resetearBuscadorCliente: "",
    dataCliente:null,
    show_form: false,
    show_form_delete: false,
    ...baseReducer.initialState,
  
};

export default handleActions(reducers, initialState);
