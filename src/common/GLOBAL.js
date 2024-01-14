const API_URL = import.meta.env.VITE_API_URL;

export const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        console.log('getUser: ',JSON.parse(user));
        return JSON.parse(user);
    }
    else{
        console.log('getUser:', {});
        return {};
    }
}

export const getToken = () => {
    let user = getUser();
    if (user) return user.Token;
    else return null;
}

export const peticionAPI = async (
    method = 'GET', 
    endpoint, 
    params = [], 
    body = {},
    token = false
) => {

    let url = `${API_URL}/api${endpoint}`;
    
    if (params.length > 0) {
        url += `/${params.join('/')}`;
    }

    let options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${getToken()}`;
    }

    if (['POST', 'PUT'].includes(method)) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response?.ok) {
            throw new Error(`Error HTTP: ${response?.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la petición:', error);
        return null;
    }
};

export const getEstados = async () => {
    let response = await peticionAPI('GET', '/estado', [], {}, true);
    response.forEach(element => {
        element.color = estadoColors.find(x => x.id === element.id).color;
    });
    return response;
}

const estadoColors = [
    {
        id: 1,
        color: '#17a2b8'
    },
    {
        id: 2,
        color: '#007bff'
    },
    {
        id: 3,
        color: '#28a745'
    },
    {
        id: 4,
        color: '#ffc107'
    },
    {
        id: 5,
        color: '#dc3545'
    },
];