import { handleActions } from "redux-actions";

const SHOW_MODAL = "SHOW_MODAL";

const showModal = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL, show_modal: show });
};

export const actionsModal = {
    showModal,
};

export const reducers = {
    [SHOW_MODAL]: (state, { show_modal }) => {
        return {
            ...state,
            show_modal,
        };
    },
};

export const initialState = {
    show_modal: false,
};

export default handleActions(reducers, initialState);

//container
