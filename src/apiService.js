import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export const getUserInfo = async () => {
    try {
        const response = await api.get('/user'); 
        return response.data; 
    } catch (error) {
        throw error.response || error.message;
    }
};


export const getProductDetails = async (productId) => {
    try {
        const response = await api.get(`/products/${productId}`); 
        return response.data; 
    } catch (error) {
        throw error.response || error.message;
    }
};


export const redeemProduct = async (productId) => {
    try {
        const response = await api.post(`/products/${productId}/redeem`); 
        return response.data; 
    } catch (error) {
        throw error.response || error.message;
    }
};


export const getProducts = async () => {
    try {
        const response = await api.get('/products'); 
        return response.data; 
    } catch (error) {
        throw error.response || error.message;
    }
};



export const getRedeemedProducts = async () => {
    try {
        const response = await api.get('/user/redeemedProducts');
        return response.data;
    } catch (error) {
        throw error.response || error.message;
    }
};


export const getUserProfile = async () => {
    console.log(73)
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        throw error.response || error.message;
    }
};


export const updateUserProfile = async (profile) => {
    try {
        const response = await api.put('/user/profile', profile);
        return response.data;
    } catch (error) {
        throw error.response || error.message;
    }
};



export const login = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;  
    } catch (error) {
        throw error.response || error.message;
    }
};

