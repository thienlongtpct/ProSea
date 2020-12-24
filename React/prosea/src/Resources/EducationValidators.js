

export const educationValidators = {
    school: {
        notNull: true,
        maxLength: {
            value: 25,
            message: "School's name must have no more than 25 characters"
        }
    },
    name: {
        notNull: true,
        maxLength: {
            value: 25,
            message: "Type must have no more than 25 characters"
        }
    },
    startAt: {

    },
    endAt: {

    }
}

export const educationValidatorsDefault = {
    school: {
        validate: true,
        message: "Looks good!"
    },
    name: {
        validate: true,
        message: "Looks good!"
    },
    startAt: {
        validate: true,
        message: "Looks good!"
    },
    endAt: {
        validate: true,
        message: "Looks good!"
    }
}