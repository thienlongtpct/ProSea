import {EDUCATIONS_LOADING, EDUCATIONS_FAILED, EDUCATIONS_LOADED} from "../ActionTypes";

export const educationsResponse = (state = {
    isLoading: true,
    errorMess: null,
    educations: null
}, action) => {
    switch (action.type) {
        case EDUCATIONS_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case EDUCATIONS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case EDUCATIONS_LOADED:
            return {...state, isLoading: false, errorMess: null, educations: action.payload}
        default:
            return state;
    }
}