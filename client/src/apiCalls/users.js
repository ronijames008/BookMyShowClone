import { axiosInstance } from ".";

export const registerUser = async (values) => {
    const response = await axiosInstance.post('/proxy/api/users/register', values);
    return response.data;
}

export const loginUser = async (values) => {
    const response = await axiosInstance.post('/proxy/api/users/login', values);
    return response.data;
}

export const validateToken = async () => {
    try {
        const response = await axiosInstance.get('/proxy/api/users/validateToken');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}