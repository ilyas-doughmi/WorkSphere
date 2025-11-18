export function validator(object) {
    if (object.fullname.length < 3) {
        errors.name = "Name is too short (min 3 letters)";
        return false;
    }
    if (object.role == "") {
        errors.name = "Please select a job role"
    }

}

export function validate_exp(exp){
     if (exp.title.length < 2) {
        errors.title = "Job Title is too short";
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
}