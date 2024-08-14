import axios from 'axios';

const API_URL = 'http://localhost:1000/meta';

export const saveMetaDetails = async (id, formDataToSend) => {
    try {
        // const url = id === 'add'  ? `${API_URL}/upload` : `${API_URL}/update/${id}`;
        // const method = id === 'add' ? 'POST' : 'PUT';
        const url =  `${API_URL}/upload`;
        const method = 'POST';
        
        const response = await axios({
            method,
            url,
            data: formDataToSend,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        });

        return response.data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};


export const fetchMetaDetails = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching home banner data:', error);
        throw error;
    }
};

export const deleteMetaDetails = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting home banner:', error);
        throw error;
    }
};

export const fetchMetaDetailsByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            // Return an empty object if no data is found
            return {};
        }
    } catch (error) {
        console.error('Error fetching home banner data:', error);
        throw error;
    }
};