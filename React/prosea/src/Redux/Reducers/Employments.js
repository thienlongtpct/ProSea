import {EMPLOYMENTS_LOADING, EMPLOYMENTS_FAILED, EMPLOYMENTS_LOADED} from "../ActionTypes";

export const employmentsResponse = (state = {
    isLoading: true,
    errorMess: null,
    employments: null
}, action) => {
    switch (action.type) {
        case EMPLOYMENTS_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case EMPLOYMENTS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case EMPLOYMENTS_LOADED:
            return {...state, isLoading: false, errorMess: null, employments: action.payload}
        default:
            return state;
    }
}