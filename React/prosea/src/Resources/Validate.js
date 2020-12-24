export const validate = (input, validator) => {
    if (validator.ifNot) {
        if (input === "Null")
            return {validate: false, message: "This field must be chosen"};
    }
    if (validator.notNull) {
        if (input.length === 0)
            return {validate: false, message: "This field can not be empty"};
    }
    if (validator.isEmail) {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!re.test(String(input).toLowerCase()))
            return {validate: false, message: "Email is invalid"};
    }
    if (validator.isPassword) {
        if (!/[a-z]/g.test(input) || !/[A-Z]/g.test(input) || !/[0-9]/g.test(input))
            return {validate: false, message: "Password must contain number, uppercase, lowercase."};
    }
    if (validator.minLength) {
        if (input.length < validator.minLength.value)
            return {validate: false, message: validator.minLength.message};
    }
    if (validator.maxLength) {
        if (input.length > validator.maxLength.value)
            return {validate: false, message: validator.maxLength.message};
    }
    if (validator.minValue) {
        if (parseInt(input) < validator.minValue.value)
            return {validate: false, message: validator.minValue.message};
    }
    if (validator.maxValue) {
        if (parseInt(input) > validator.maxValue.value)
            return {validate: false, message: validator.maxValue.message};
    }
    return {validate: true, message: "Looks good!"};
}