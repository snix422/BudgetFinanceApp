import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Pobierz token z localStorage (lub z ciasteczek/stanu)
    const token = localStorage.getItem('token'); 
    
    // Jeśli token istnieje, doklej go do nagłówka
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor Odpowiedzi (Response Interceptor)
// Uruchamia się PO otrzymaniu odpowiedzi z backendu
api.interceptors.response.use(
  (response) => {
    // Możesz tutaj zwrócić samą treść (response.data), żeby nie pisać .data w każdym komponencie
    return response.data; 
  },
  (error) => {
    // Globalna obsługa błędów
    
    // Np. Jeśli backend zwróci 401 (Unauthorized), to znaczy, że token wygasł
    if (error.response && error.response.status === 401) {
       // Tutaj można wywołać czyszczenie localStorage i przekierowanie
       localStorage.removeItem('token');
       // Opcjonalnie: window.location.href = '/login'; 
    }
    
    return Promise.reject(error);
  }
);