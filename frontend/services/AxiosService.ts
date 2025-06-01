import { getAuth } from 'firebase/auth';
import axios from 'axios';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/', // precisa colocar a URL do ambiente de producao depois
});

axiosService.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosService.interceptors.response.use(
    response => response,
    (error) => {
        const auth = getAuth();

        if (error.response) {
            if (error.response.status === 401) {
                console.warn('Token expirado ou inválido, deslogando...');
                auth.signOut();
                localStorage.removeItem('user');
                window.location.href = '/login';
            } else {
                console.error('Erro de resposta:', error.response.data);
            }
        } else if (error.request) {
            console.error('Problema de rede ou servidor indisponível:', error.request);
        } else {
            console.error('Erro desconhecido:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosService;
