import axios from 'axios';

const API_URL = 'http://localhost:1000/bannerImage';

export const deleteBanner = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting  banner:', error);
        throw error;
    }
};


export const fetchBannerByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getBanner/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching  banner data:', error);
        throw error;
    }
};

export const addBannerImage = async (formDataToSend) => {
    try {
        const url = `${API_URL}/saveBanner`;
        const response = await axios.post(url, formDataToSend, {
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