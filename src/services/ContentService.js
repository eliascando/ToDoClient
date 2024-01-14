import { peticionAPI } from "../common/GLOBAL"

export const getToDos = async (userId) => {

    let params = [userId];

    let response = await peticionAPI('GET', '/nota/usuario',params, {}, true);

    return response;
}

export const saveToDo = async (nota) => {

    let body = nota;

    let response = await peticionAPI('POST', '/nota', [], body, true);

    return response;
}