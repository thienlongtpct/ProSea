import {USER_LOADING, USER_FAILED, USER_LOADED} from "../ActionTypes";

export const userResponse = (state = {
    isLoading: true,
    errorMess: null,
    user: null
}, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case USER_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case USER_LOADED:
            return {...state, isLoading: false, errorMess: null, user: action.payload}
        default:
            return state;
    }
}