import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
import moment from 'moment' 


const DASHBOARD= "DASHBOARD";
const DASHBOARD_SEMANAL = "DASHBOARD_SEMANAL"

const getDashboard = () => ( dispatch, getStore ) => {
    api.get('dashboard/Dashboard/')
    .then((response) => {
        dispatch({type:DASHBOARD, dataDashboard:response});
    })
    .catch(() => {
    
    })
    .finally(() => {
       
    });
}
const getDashBoardSemanal = () => ( dispatch, getStore ) => {
    api.get('dashboard/DashboardSemanal/')
    .then((response) => {
        dispatch({type:DASHBOARD_SEMANAL, dataDashBoardSemanal:response});
    })
    .catch(() => {
    
    })
    .finally(() => {
       
    });
}




export const reducers = {
    [DASHBOARD]: (state, { dataDashboard }) => {
        return {
            ...state,
            dataDashboard,
        };
    },

    [DASHBOARD_SEMANAL]: (state, { dataDashBoardSemanal }) => {
        return {
            ...state,
            dataDashBoardSemanal,
        };
    },
    
    
};

   
export const actions = {
  
    getDashboard,
    getDashBoardSemanal,
};

export const initialState = {
    
    dataDashboard:null,
    dataDashBoardSemanal:null,
};

export default handleActions(reducers, initialState);