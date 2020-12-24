export const profileValidators = {
    email: {
        isEmail: true,
        maxLength: {
            value: 25,
            message: "Email must have no more than 25 characters"
        }
    },
    name: {
        maxLength: {
            value: 25,
            message: "Name must have no more than 25 characters"
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
    },
    bio: {
        maxLength: {
            value: 250,
            message: "Bio must have no more than 250 characters"
        }
    }
}

