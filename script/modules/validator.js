export function validate_exp(exp) {

    if (exp.title.length < 2) {
        alert("Job Title is too short");
        return false;
    }

    if (exp.description.length <= 6) {
        alert("Description must be longer than 6 characters");
        return false;
    }

    if (exp.from === "" || exp.end === "") {
        alert("Start and End dates are required");
        return false;
    }

    if (exp.from > exp.end) {
        alert("End date cannot be before Start date");
        return false;
    }

    return true;
}

export function validator_exp(exp) {
    return validate_exp(exp);
}