import { peticionAPI } from "../common/GLOBAL";

export const LoginService = async(correo, password) => {
    
    let body = {
        correo,
        password
    };

    let response = await peticionAPI('POST', '/login', [], body);

    if(response?.success) {
        return response.data;
    }else{
        return {};
    }
}

export const RegisterService = async(newUser) => {

    let body = newUser;

    let response = await peticionAPI('POST', '/usuario', [], body);
    console.log('RegisterService > response: ',response);

    if(response?.success) {
        return response.data;
    }else{
        return {};
    }
}