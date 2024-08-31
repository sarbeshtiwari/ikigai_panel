import axios from 'axios';

const API_URL = 'https://ecis.in/apis/ikigai-wellness-API/userQuery';

export const fetchQuery = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching About Us data:', error);
        throw error;
    }
};

export const deleteQuery = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting About Us:', error);
        throw error;
    }
};

export const saveQuery = async (id, note) => {
    try {
        console.log(note)
        const url =  `${API_URL}/update/${id}`;
        const method =  'PUT';
        const response = await axios({
            method,
            url,
            headers: {
                'Content-Type': 'application/json' // Make sure to set the correct content type
            },
            data: JSON.stringify({ note })
        });
        

        return response.data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};