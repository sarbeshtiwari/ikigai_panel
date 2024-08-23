// // src/api/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://ikigai-panel-api.onrender.com/auth';

// export const loginUser = async (username, password) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         username,
//         password,
//       });
//       const { token, expiresIn } = response.data;
  
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('expiryTime', Date.now() + expiresIn * 1000);
  
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const getStoredToken = () => {
//     const token = localStorage.getItem('authToken');
//     const expiryTime = localStorage.getItem('expiryTime');
  
//     if (token && expiryTime) {
//       const isTokenValid = Date.now() < parseInt(expiryTime);
//       return isTokenValid ? token : null;
//     }
//     return null;
//   };
  
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        const { token, expiresIn } = response.data;

        // Store token and expiry time in cookies
        Cookies.set('authToken', token, { expires: 10 / 1440 }); // Expires in 10 minutes (1440 minutes in a day)
        Cookies.set('expiryTime', Date.now() + expiresIn * 1000, { expires: 10 / 1440 });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStoredToken = () => {
    const token = Cookies.get('authToken');
    const expiryTime = Cookies.get('expiryTime');

    if (token && expiryTime) {
        const isTokenValid = Date.now() < parseInt(expiryTime);
        return isTokenValid ? token : null;
    }
    return null;
};
