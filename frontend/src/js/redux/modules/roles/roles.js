import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
import { initialize as initializeForm } from "redux-form";
// ------------------------------------
// Constants
// ------------------------------------
const SET_TODOS_LOS_PERMISOS = 'SET_TODOS_LOS_PERMISOS'


const baseReducer = createReducer (
    "roles", //identificador dentro del store.
    "roles", //endpoint donde realizará las peticiones.
    "RolForm", //Nombre del formulario.
    "/roles" //url del componente en el frontend.
);

const getPermisos = (rol) => (dispatch, getStore) => {
    let roles = [];
    const params = { rol }

    api.get("roles/getPermisos", params)
        .then((response) => {
            if ( response ) {
                console.log( 'PERMISOS AL ACTUALIZAR', response )
                response.id = response.rol.id
                response.nombre = response.rol.nombre
                console.log( 'PERMISOS ACTUALIZAR', response )
                dispatch( initializeForm( 'RolForm', response ) )
                dispatch( {type: SET_TODOS_LOS_PERMISOS, todosLosPermisos :response })
            }
            console.log('place user: ',roles);
            return roles;
        })
        .catch(() => {
            return [];
        });
};

const getPermisosCreate = () => (dispatch, getStore) => {
    api.get("permiso")
        .then((response) => {
            if ( response ) {
                console.log( 'PERMISOS AL crear', response )
                dispatch(initializeForm('RolForm', response))
                dispatch( {type: SET_TODOS_LOS_PERMISOS, todosLosPermisos :response })
            }
            
        })
        .catch(() => {
        });
};

export const setTodosLosPermisos = (todosLosPermisos) => ({
    type: SET_TODOS_LOS_PERMISOS,
    todosLosPermisos,
});

export const reducers = {
    ...baseReducer.reducers,
    [SET_TODOS_LOS_PERMISOS]: (state, { todosLosPermisos }) => {
        return {
            ...state,
            todosLosPermisos,
        };
    },

};

export const actions = {
    setTodosLosPermisos,
    getPermisos,
    getPermisosCreate,
    ...baseReducer.actions,
};

export const initialState = {
    todosLosPermisos : [],
    ...baseReducer.initialState,
};

export default handleActions(reducers, initialState);
