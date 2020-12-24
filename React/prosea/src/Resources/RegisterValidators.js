export const registerValidators = {
    username: {
        notNull: true,
        maxLength: {
            value: 20,
            message: "Username must have no more than 20 characters"
        }
    },
    email: {
        isEmail: true,
        maxLength: {
            value: 25,
            message: "Email must have no more than 25 characters"
        }
    },
    password: {
        isPassword: true,
        minLength: {
            value: 5,
            message: "Password must have at least 5 characters"
        },
        maxLength: {
            value: 25,
            message: "Password must have no more than 25 characters"
        }
    }
}

export const registerValidatorsDefault = {
    username: {
        validate: false,
        message: "This field can not be empty"
    },
    email: {
        validate: false,
        message: "This field can not be empty"
    },
    password: {
        validate: false,
        message: "This field can not be empty"
    }
}