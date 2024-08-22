import axios from 'axios';

const API_URL = 'https://ikigai-panel-api.onrender.com/faq';

export const fetchFaq = async () => {
    try {
        const response = await axios.get(`${API_URL}/getFaq`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching  Faq data:', error);
        throw error;
    }
};

export const updateFaqStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/updateStatus`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error updating  Faq status:', error);
        throw error;
    }
};


export const deleteFaq = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting  Faq:', error);
        throw error;
    }
};


export const fetchFaqByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching  Faq data:', error);
        throw error;
    }
};

export const saveFaq = async (id, formDataToSend) => {
    try {
        const url = id === 'add' ? `${API_URL}/addFaq` : `${API_URL}/updateFaq/${id}`;
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