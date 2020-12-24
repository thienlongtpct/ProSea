import {PROJECTS_LOADING, PROJECTS_FAILED, PROJECTS_LOADED} from "../ActionTypes";

export const projectsResponse = (state = {
    isLoading: true,
    errorMess: null,
    projects: null,
    size: null
}, action) => {
    switch (action.type) {
        case PROJECTS_LOADING:
            return {...state, isLoading: true, errorMess: null}
        case PROJECTS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case PROJECTS_LOADED:
            return {...state, isLoading: false, errorMess: null, projects: action.payload.projects, size: action.payload.size}
        default:
            return state;
    }
}