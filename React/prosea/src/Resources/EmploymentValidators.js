export const employmentValidators = {
    company: {
        notNull: true,
        maxLength: {
            value: 25,
            message: "Company's name must have no more than 25 characters"
        }
    },
    name: {
        notNull: true,
        maxLength: {
            value: 25,
            message: "Type's employment must have no more than 25 characters"
        }
    },
    startAt: {

    },
    endAt: {

    },
    describe: {
        maxLength: {
            value: 250,
            message: "Describe's employment must have no more than 250 characters"
        }
    }
}

export const employmentValidatorsDefault = {
    company: {
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
    },
    describe: {
        validate: true,
        message: "Looks good!"
    }
}