import axios from 'axios';

const API_URL = 'https://ikigai-panel-api.onrender.com/testimonials';
// const API_URL = 'http://localhost:1000/testimonials';

export const fetchTestimonials = async () => {
    try {
        const response = await axios.get(`${API_URL}/getTestimonials`);
        return response.data;
    } catch (error) {
        console.error('Error fetching About Us data:', error);
        throw error;
    }
};

export const updateTestimonialsStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/updateStatus`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error updating About Us status:', error);
        throw error;
    }
};


export const deleteTestimonials = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting About Us:', error);
        throw error;
    }
};


export const fetchTestimonialsByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching About Us data:', error);
        throw error;
    }
};

export const saveTestimonials = async (id, formDataToSend) => {
    try {
        const url = id === 'add' ? `${API_URL}/addTestimonials` : `${API_URL}/updateTestimonials/${id}`;
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
