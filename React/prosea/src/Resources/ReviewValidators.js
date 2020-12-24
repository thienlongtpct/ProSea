export const reviewValidators = {
    rating: {

    },
    review: {
        notNull: true,
        maxLength: {
            value: 250,
            message: "Review must have no more than 250 characters"
        }
    }
}

export const reviewValidatorsDefault = {
    rating: {
        validate: true,
        message: "Looks good!"
    },
    review: {
        validate: true,
        message: "Looks good!"
    }
}
