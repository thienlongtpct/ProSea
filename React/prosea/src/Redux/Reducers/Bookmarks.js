import {BOOKMARKS_LOADING, BOOKMARKS_FAILED, BOOKMARKS_LOADED} from "../ActionTypes";

export const bookmarksResponse = (state = {
    isLoading: true,
    errorMess: null,
    bookmarks: null
}, action) => {
    switch (action.type) {
        case BOOKMARKS_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case BOOKMARKS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case BOOKMARKS_LOADED:
            return {...state, isLoading: false, errorMess: null, bookmarks: action.payload}
        default:
            return state;
    }
}