import {CONTACT_LOADING, CONTACT_FAILED, CONTACT_LOADED} from "../ActionTypes";

export const contactResponse = (state = {
    isLoading: true,
    errorMess: null,
    contact: null
}, action) => {
    switch (action.type) {
        case CONTACT_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case CONTACT_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case CONTACT_LOADED:
            return {...state, isLoading: false, errorMess: null, contact: action.payload}
        default:
            return state;
    }
}