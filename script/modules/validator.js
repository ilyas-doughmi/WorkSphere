export function validator(object){
      if (object.fullname.length < 3) {
        errors.name = "Name is too short (min 3 letters)";
        return false;
    }
}