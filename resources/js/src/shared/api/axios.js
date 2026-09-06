import axios from 'axios';

// Instance Axios configurée pour Laravel Sanctum
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // L'URL de notre API Laravel
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Crucial pour que Sanctum lise les cookies de session/CSRF
});

// Intercepteur pour gérer les erreurs globales (ex: Token expiré)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // L'utilisateur n'est pas connecté ou son token a expiré
            // Logique de déconnexion automatique ou redirection vers /login ici
            console.error('Non autorisé, veuillez vous reconnecter.');
        }
        return Promise.reject(error);
    }
);

export default api;
