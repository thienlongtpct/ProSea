export const addProjectValidators = {
    name: {
        notNull: true,
        maxLength: {
            value: 25,
            message: "Name must have no more than 25 characters"
        }
    },
    type: {
        ifNot: "Type must be selected"
    },
    shortDescription: {
        notNull: true,
        maxLength: {
            value: 200,
            message: "Short description must have no more than 200 characters"
        }
    },
    salary: {
        notNull: true,
        minValue: {
            value: 0,
            message: "Salary must be greater then 0"
        },
        maxValue: {
            value: 100000,
            message: "Salary must be less than 100000"
        }
    }
}

export const addProjectValidatorsDefault = {
    name: {
        validate: false,
        message: "Name must have no more than 25 characters"
    },
    type: {
        validate: true,
        message: "Looks good!"
    },
    shortDescription: {
        validate: false,
        message: "This field can not be empty"
    },
    salary: {
        validate: false,
        message: "This field can not be empty"
    }
}


