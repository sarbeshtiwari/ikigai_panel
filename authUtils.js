// authUtils.js

export const setToken = (token) => {
    localStorage.setItem('token', token);
    // Set timeout to delete token after 10 minutes
    setTimeout(() => {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }, 10 * 60 * 1000); // 10 minutes
  };
  
  export const getToken = () => localStorage.getItem('token');
  