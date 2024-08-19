import axios from 'axios';

export const globals = `https://ikigai-panel-api.onrender.com`;

const API_URL = 'https://ikigai-panel-api.onrender.com/homeBanner';
const API_URL1 = 'http://localhost:1000';

export const fetchHomeBanner = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching home banner data:', error);
        throw error;
    }
};

export const updateHomeBannerStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/updateStatus`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error updating home banner status:', error);
        throw error;
    }
};

export const deleteHomeBanner = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting home banner:', error);
        throw error;
    }
};


export const fetchHomeBannerByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching home banner data:', error);
        throw error;
    }
};

export const saveHomeBanner = async (id, formDataToSend) => {
    try {
        const url = id === 'add' ? `${API_URL}/upload` : `${API_URL}/upload/${id}`;
        const method = id === 'add' ? 'POST' : 'PUT';
        const response = await axios({
            method,
            url,
            data: formDataToSend,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};

export const addHomeBanner = async (id, formDataToSend) => {
    try {
        const url = id !== 'add' ? `${API_URL1}/save-home-banner/${id}` : `${API_URL1}/save-home-banner`;
        const method = id === 'add' ? 'POST' : 'PUT';
        const response = await axios({
            method,
            url,
            data: formDataToSend,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};