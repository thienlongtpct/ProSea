import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import {skillsResponse} from "./Reducers/Skills";
import {userResponse} from "./Reducers/User";
import {projectsResponse} from "./Reducers/Projects";
import {bookmarksResponse} from "./Reducers/Bookmarks";
import {educationsResponse} from "./Reducers/Educations";
import {employmentsResponse} from "./Reducers/Employments";
import {contactResponse} from "./Reducers/Contact";
import {reviewsResponse} from "./Reducers/Reviews";
import {requestsResponse} from "./Reducers/ Request";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            skills: skillsResponse,
            user: userResponse,
            contact: contactResponse,
            employments: employmentsResponse,
            educations: educationsResponse,
            projects: projectsResponse,
            bookmarks: bookmarksResponse,
            reviews: reviewsResponse,
            requests: requestsResponse
        }),
        applyMiddleware(thunk, logger)
    )
    return store;
}