// src/api/api.js
import axios from 'axios';

const API_URL = 'https://ikigai-panel-api.onrender.com/auth';

// src/api/api.js
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username: username, password });
        const { token, expiresIn } = response.data; // Assume the server returns token and expiry time
        console.log(response.data)

        // Store token and expiry time in local storage
        window.localStorage.setItem('authToken', token);
        window.localStorage.setItem('expiryTime', (Date.now() + expiresIn * 1000).toString());

        return response.data;
    } catch (error) {
        throw error;
    }
};

