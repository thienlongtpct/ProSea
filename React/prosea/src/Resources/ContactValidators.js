export const contactValidators = {
    telephone: {
        minLength: {
            value: 10,
            message: "Telephone must have exactly 10 numbers"
        },
        maxLength: {
            value: 10,
            message: "Telephone must have exactly 10 numbers"
        }
    },
    city: {
        maxLength: {
            value: 25,
            message: "City's name must have no more than 25 characters"
        }
    },
    github: {
        maxLength: {
            value: 25,
            message: "GitHub account must have no more than 25 characters"
        }
    },
    gitlab: {
        maxLength: {
            value: 25,
            message: "GitLab account must have no more than 25 characters"
        }
    },
    facebook: {
        maxLength: {
            value: 25,
            message: "Facebook account must have no more than 25 characters"
        }
    },
    instagram: {
        maxLength: {
            value: 25,
            message: "Instagram account must have no more than 25 characters"
        }
    },
    vk: {
        maxLength: {
            value: 25,
            message: "Vkontakte account must have no more than 25 characters"
        }
    }
}

export const contactValidatorsDefault = {
    telephone: {
        validate: false,
        message: "Telephone must have exactly 10 numbers"
    },
    city: {
        validate: true,
        message: "Looks good!"
    },
    github: {
        validate: true,
        message: "Looks good!"
    },
    gitlab: {
        validate: true,
        message: "Looks good!"
    },
    facebook: {
        validate: true,
        message: "Looks good!"
    },
    instagram: {
        validate: true,
        message: "Looks good!"
    },
    vk: {
        validate: true,
        message: "Looks good!"
    }
}