export const KEY = "worksphere";

export function save(object){
    localStorage.setItem(KEY,JSON.stringify(object));
}

export function load(){
    return JSON.parse(localStorage.getItem(KEY));
}