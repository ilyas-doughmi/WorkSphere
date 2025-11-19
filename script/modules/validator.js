export function validator(object) {

    if (object.fullname.length < 3) {
        errors.name = "Name is too short (min 3 letters)";
        return false;
    }

    if (object.role === "") {
        errors.name = "Please select a job role";
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(object.email)) {
        errors.email = "Invalid email format";
        return false;
    }

    const phoneRegex = /^06\d{8}$/;
    if (!phoneRegex.test(object.phone)) {
        errors.phone = "Phone must start with 06 and contain 10 digits";
        return false;
    }

    return true;
}


export function validate_exp(exp) {

    if (exp.title.length < 2) {
        errors.title = "Job Title is too short";
        return false;
    }

    if (exp.description.length <= 6) {
        errors.description = "Description must be longer than 6 characters";
        return false;
    }

    if (exp.from === "" || exp.end === "") {
        errors.dates = "Start and End dates are required";
        return false;
    }

    if (exp.from > exp.end) {
        errors.dates = "End date cannot be before Start date";
        return false;
    }

    return true;
}

export function validator_exp(exp) {
    return validate_exp(exp);
}
