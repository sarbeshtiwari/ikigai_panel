import axios from 'axios';

const API_URL = 'https://ikigai-panel-api.onrender.com/services';


export const fetchOurServices = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Our Services data:', error);
        throw error;
    }
};

export const updateOurServicesStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/updateStatus`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Our Services status:', error);
        throw error;
    }
};

export const updateOurServicesOnHomeStatus = async (id, on_home) => {
    try {
        const response = await axios.patch(`${API_URL}/updateOnHomeStatus`, {
            id,
            on_home
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error updating Our Services status:', error);
        throw error;
    }
};

export const updateOurServicesOnTopStatus = async (id, on_top) => {
    try {
        const response = await axios.patch(`${API_URL}/updateOnTopStatus`, {
            id,
            on_top
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Our Services status:', error);
        throw error;
    }
};

export const deleteOurServices = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Our Services:', error);
        throw error;
    }
};


export const fetchOurServicesByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Our Services data:', error);
        throw error;
    }
};

export const saveOurServices = async (id, formDataToSend) => {
    try {
        const url = id === 'add' ? `${API_URL}/upload` : `${API_URL}/update/${id}`;
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