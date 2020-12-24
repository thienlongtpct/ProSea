import {SKILLS_LOADING, SKILLS_FAILED, SKILLS_LOADED} from "../ActionTypes";

export const skillsResponse = (state = {
    isLoading: true,
    errorMess: null,
    specialities: null,
    languages: null,
    frameworks: null
}, action) => {
    switch (action.type) {
        case SKILLS_LOADING:
            return {...state, isLoading: true, errorMess: null, specialities: null, languages: null, frameworks: null}
        case SKILLS_FAILED:
            return {...state, isLoading: false, errorMess: action.payload}
        case SKILLS_LOADED:
            return {...state, isLoading: false, errorMess: null,
                    specialities: action.payload.specialities.sort((a, b) => parseInt(a.id)-parseInt(b.id)),
                    languages: action.payload.languages.sort((a, b) => parseInt(a.id)-parseInt(b.id)),
                    frameworks: action.payload.frameworks.sort((a, b) => parseInt(a.id)-parseInt(b.id))}
        default:
            return state;
    }
}