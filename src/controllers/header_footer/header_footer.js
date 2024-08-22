import axios from "axios";

const API_URL = 'https://ikigai-panel-api.onrender.com/headerFooter';

export const fetchHeaderFooter = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching home banner data:', error);
        throw error;
    }
};

export const addHeaderFooter = async (formData) => {
    try{
        const response = await axios.post(`${API_URL}/submit`, formData);
        return response.json();
    } catch (error) {
        console.error('Error adding home banner data:', error);
        throw error;
    }
};

export const updateHeaderFooter = async (id, formData) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding home banner data:', error);
        throw error;
    }
};
