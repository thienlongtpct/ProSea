import {REQUESTS_LOADING, REQUESTS_FAILED, REQUESTS_LOADED} from "../ActionTypes";

export const requestsResponse = (state = {
    isLoading: true,
    errorMess: null,
    requests: null
}, action) => {
    switch (action.type) {
        case REQUESTS_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case REQUESTS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case REQUESTS_LOADED:
            return {...state, isLoading: false, errorMess: null, requests: action.payload}
        default:
            return state;
    }
}