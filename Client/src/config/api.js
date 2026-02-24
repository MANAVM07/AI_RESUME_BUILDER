import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000"
})

// Request Interceptor
api.interceptors.request.use((config) => {
    const fullUrl = config.baseURL ? (config.url.startsWith('http') ? config.url : `${config.baseURL}${config.url}`) : config.url;
    console.log(`[API Request Started] ${config.method.toUpperCase()} ${fullUrl}`);
    console.log(`[API Request Headers]`, config.headers);
    return config;
}, (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use((response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    return response;
}, (error) => {
    console.error(`[API Response Error] ${error.response?.status} ${error.config?.url}`, error.response?.data || error.message);
    return Promise.reject(error);
});

export default api