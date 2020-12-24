import {
    CONTACT_FAILED,
    CONTACT_LOADED,
    CONTACT_LOADING,
    EDUCATIONS_FAILED,
    EDUCATIONS_LOADED,
    EDUCATIONS_LOADING,
    EMPLOYMENTS_FAILED,
    EMPLOYMENTS_LOADED,
    EMPLOYMENTS_LOADING,
    PROJECTS_FAILED,
    PROJECTS_LOADED,
    PROJECTS_LOADING,
    REQUESTS_FAILED,
    REQUESTS_LOADED,
    REQUESTS_LOADING,
    REVIEWS_FAILED,
    REVIEWS_LOADED,
    REVIEWS_LOADING,
    SKILLS_FAILED,
    SKILLS_LOADED,
    SKILLS_LOADING,
    USER_FAILED,
    USER_LOADED,
    USER_LOADING
} from "./ActionTypes";
import {addDays, subDays} from "date-fns";
import {BaseURL} from "../Resources/BaseURL";

// SKILLS

export const skillsLoading = () => {
    return {
        type: SKILLS_LOADING
    };
}

export const skillFailed = (errorMess) => {
    return {
        type: SKILLS_FAILED,
        payload: errorMess
    };
}

export const skillsLoaded = (skills) => {
    return {
        type: SKILLS_LOADED,
        payload: skills
    };
}

export const fetchSkills = () => (dispatch) => {
    dispatch(skillsLoading());
    return fetch(BaseURL+"getSkills")
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(skillFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(skills => dispatch(skillsLoaded(skills)))
        .catch(error => dispatch(skillFailed(error.message)));
}

// USER

export const userLoading = () => {
    return {
        type: USER_LOADING
    };
}

export const userFailed = (errorMess) => {
    return {
        type: USER_FAILED,
        payload: errorMess
    };
}

export const userLoaded = (user) => {
    return {
        type: USER_LOADED,
        payload: user
    };
}

export const register = (user, isDeveloper) => (dispatch) => {
    fetch(BaseURL+(isDeveloper? "addDeveloper" : "addCompany"), {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status+": "+response.statusText);
                error.response = response;
                return error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(userLoaded(user));
            window.location = "http://localhost:3000/"+user.username;
        })
        .catch(error => alert('Username or email already registed'));
}

export const login = (user) => (dispatch) => {
    fetch(BaseURL+"loginUser", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status+": "+response.statusText);
                error.response = response;
                return error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem("user", JSON.stringify(user));
            window.location = "http://localhost:3000/" + user.username;
        })
        .catch(error => alert('Wrong username or password'));
}

export const fetchUser = (username) => (dispatch) => {
    dispatch(userLoading());
    return fetch(BaseURL+"getUser/"+username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(userFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(user => dispatch(userLoaded(user)))
        .catch(error => console.log(error));
}

export const editUser = (user, reload) => (dispatch) => {
    return fetch(BaseURL+(user.type === "developer" ? "editDeveloper/" : "editCompany/"), {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(userFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(user => {if (reload) dispatch(userLoaded(user))})
        .catch(error => dispatch(userFailed(error.message)));
}

// CONTACT

export const contactLoading = () => {
    return {
        type: CONTACT_LOADING
    };
}

export const contactFailed = (errorMess) => {
    return {
        type: CONTACT_FAILED,
        payload: errorMess
    };
}

export const contactLoaded = (contact) => {
    return {
        type: CONTACT_LOADED,
        payload: contact
    };
}

export const fetchContact = (username) => (dispatch) => {
    dispatch(contactLoading());
    return fetch(BaseURL+"getContact/"+username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(contactFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(contact => dispatch(contactLoaded(contact)))
        .catch(error => dispatch(contactFailed(error.message)));
}

export const editContact = (contact, username) => (dispatch) => {
    return fetch(BaseURL+"editContact/"+username, {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(contactFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(contactFailed(error.message)));
}

// PROJECT

export const projectsLoading = () => {
    return {
        type: PROJECTS_LOADING
    };
}

export const projectsFailed = (errorMess) => {
    return {
        type: PROJECTS_FAILED,
        payload: errorMess
    };
}

export const projectsLoaded = (projects) => {
    return {
        type: PROJECTS_LOADED,
        payload: projects
    };
}

export const editProject = (project) => (dispatch) => {
    return fetch(BaseURL+"editProject/", {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(projectsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        });
}

export const deleteProject = (id) => (dispatch) => {
    return fetch(BaseURL+"deleteProject/"+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(projectsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => alert(error));
}

export const fetchAllProjects = (sort, pageNum, filter) => (dispatch) => {
    dispatch(projectsLoading());
    return fetch(BaseURL+"getProjects?request="+encodeURI(JSON.stringify({
        prefix: "",
        salary: {
            min: 0,
            max: 100000
        },
        deadlineRange: {
            startDate: subDays(new Date(), 900),
            endDate: addDays(new Date(), 900)
        },
        type: "Null",
        hideExpired: false,
        specialitySet: [],
        languageSet: [],
        frameworkSet: [],
        ...filter,
        sort: sort,
        pageNum: pageNum
    })))
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(projectsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(projects => dispatch(projectsLoaded(projects)))
        .catch(error => dispatch(projectsFailed(error.message)));
}

export const fetchProjects = (username, sort, pageNum, isBookmark, filter) => (dispatch) => {
    dispatch(projectsLoading());
    return fetch(BaseURL+"getUserProjects/"+username+"?request="+encodeURI(JSON.stringify({
        prefix: "",
        salary: {
            min: 0,
            max: 100000
        },
        deadlineRange: {
            startDate: subDays(new Date(), 900),
            endDate: addDays(new Date(), 900)
        },
        type: "Null",
        hideExpired: false,
        specialitySet: [],
        languageSet: [],
        frameworkSet: [],
        ...filter,
        sort: sort,
        pageNum: pageNum,
        isBookmark: isBookmark
    })))
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(projectsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(projects => dispatch(projectsLoaded(projects)))
        .catch(error => dispatch(projectsFailed(error.message)));
}

// EMPLOYMENTS

export const employmentsLoading = () => {
    return {
        type: EMPLOYMENTS_LOADING
    };
}

export const employmentsFailed = (errorMess) => {
    return {
        type: EMPLOYMENTS_FAILED,
        payload: errorMess
    };
}

export const employmentsLoaded = (employments) => {
    return {
        type: EMPLOYMENTS_LOADED,
        payload: employments
    };
}

export const fetchEmployments = (username) => (dispatch) => {
    dispatch(employmentsLoading());
    return fetch(BaseURL+"getEmploymentSet/"+username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(employmentsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(employments => dispatch(employmentsLoaded(employments)))
        .catch(error => dispatch(employmentsFailed(error.message)));
}

export const editEmployment = (employment) => (dispatch) => {
    fetch(BaseURL + "editEmployment/", {
        method: "PUT",
        body: JSON.stringify(employment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(employmentsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(employmentsFailed(error.message)));
}

export const addEmployment = (username, employment, callback) => (dispatch) => {
    return fetch(BaseURL+"addEmployment/"+username, {
        method: "POST",
        body: JSON.stringify(employment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(employmentsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(id => callback(id))
        .catch(error => dispatch(employmentsFailed(error.message)));
}

export const deleteEmployment = (id) => (dispatch) => {
    fetch(BaseURL+"deleteEmployment/"+id, {
            method: "DELETE",
            credentials: "same-origin"
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(employmentsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(employmentsFailed(error.message)));
}

// EDUCATION

export const educationsLoading = () => {
    return {
        type: EDUCATIONS_LOADING
    };
}

export const educationsFailed = (errorMess) => {
    return {
        type: EDUCATIONS_FAILED,
        payload: errorMess
    };
}

export const educationsLoaded = (educations) => {
    return {
        type: EDUCATIONS_LOADED,
        payload: educations
    };
}

export const fetchEducations = (username) => (dispatch) => {
    dispatch(educationsLoading());
    return fetch(BaseURL+"getEducationSet/"+username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(educationsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(educations => dispatch(educationsLoaded(educations)))
        .catch(error => dispatch(educationsFailed(error.message)));
}

export const editEducation = (education) => (dispatch) => {
    fetch(BaseURL + "editEducation/", {
        method: "PUT",
        body: JSON.stringify(education),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(educationsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(educationsFailed(error.message)));
}

export const addEducation = (username, education, callback) => (dispatch) => {
    return fetch(BaseURL+"addEducation/"+username, {
        method: "POST",
        body: JSON.stringify(education),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(educationsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(id => callback(id))
        .catch(error => dispatch(educationsFailed(error.message)));
}

export const deleteEducation = (id) => (dispatch) => {
    fetch(BaseURL+"deleteEducation/"+id, {
        method: "DELETE",
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(educationsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(educationsFailed(error.message)));
}

// REVIEW

export const reviewsLoading = () => {
    return {
        type: REVIEWS_LOADING
    };
}

export const reviewsFailed = (errorMess) => {
    return {
        type: REVIEWS_FAILED,
        payload: errorMess
    };
}

export const reviewsLoaded = (reviews) => {
    return {
        type: REVIEWS_LOADED,
        payload: reviews
    };
}

export const fetchReviews = (username) => (dispatch) => {
    dispatch(reviewsLoading());
    return fetch(BaseURL+"getReviews/"+username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(reviewsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(reviews => dispatch(reviewsLoaded(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)));
}

export const editReview = (review) => (dispatch) => {
    fetch(BaseURL + "editReview/", {
        method: "PUT",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(reviewsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(reviewsFailed(error.message)));
}

export const addReview = (review, callback) => (dispatch) => {
    return fetch(BaseURL+"addReview/", {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(reviewsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(review => callback(review))
        .catch(error => dispatch(reviewsFailed(error.message)));
}

export const deleteReview = (id) => (dispatch) => {
    fetch(BaseURL+"deleteReview/"+id, {
        method: "DELETE",
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(reviewsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => dispatch(reviewsFailed(error.message)));
}

// REQUEST

export const requestsLoading = () => {
    return {
        type: REQUESTS_LOADING
    };
}

export const requestsFailed = (errorMess) => {
    return {
        type: REQUESTS_FAILED,
        payload: errorMess
    };
}

export const requestsLoaded = (requests) => {
    return {
        type: REQUESTS_LOADED,
        payload: requests
    };
}

export const fetchRequests = (username) => (dispatch) => {
    dispatch(requestsLoading());
    return fetch(BaseURL+"getRequests/"+username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(requests => dispatch(requestsLoaded(requests)))
        .catch(error => dispatch(requestsFailed(error.message)));
}

export const addProjectRequest = (username, id, callback) => (dispatch) => {
    return fetch(BaseURL+"addProjectRequest?username="+username+"&id="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(id => callback(id))
        .catch(error => alert(error.message));
}

export const addApplyRequest = (developerUsername, companyUsername, callback) => (dispatch) => {
    return fetch(BaseURL+"addApplyRequest?developerUsername="+developerUsername+"&companyUsername="+companyUsername, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(id => callback(id))
        .catch(error => alert(error.message));
}

export const deleteRequest = (id) => (dispatch) => {
    fetch(BaseURL+"deleteRequest/"+id, {
        method: "DELETE",
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => alert(error.message));
}

export const acceptRequest = (id) => (dispatch) => {
    fetch(BaseURL+"acceptRequest/"+id, {
        method: "PUT",
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .catch(error => alert(error.message));
}

export const isProjectRequested = (username, id, callback) => (dispatch) => {
    fetch(BaseURL+"isProjectRequested?username="+username+"&id="+id)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(id => callback(id))
        .catch(error => alert(error.message))
}

export const isCompanyRequested = (developerUsername, companyUsername, callback) => (dispatch) => {
    fetch(BaseURL+"isCompanyRequested?developerUsername="+developerUsername+"&companyUsername="+companyUsername)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.status);
                dispatch(requestsFailed(error));
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(id => callback(id))
        .catch(error => alert(error.message))
}
