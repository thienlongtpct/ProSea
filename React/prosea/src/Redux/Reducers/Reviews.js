import {REVIEWS_LOADING, REVIEWS_FAILED, REVIEWS_LOADED} from "../ActionTypes";

export const reviewsResponse = (state = {
    errorMess: null,
    reviews: null,
    isLoading: true
}, action) => {
    switch (action.type) {
        case REVIEWS_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case REVIEWS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case REVIEWS_LOADED:
            return {...state, isLoading: false, errorMess: null, reviews: action.payload}
        default:
            return state;
    }
}