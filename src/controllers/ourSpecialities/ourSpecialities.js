import axios from 'axios';

const API_URL = 'https://ecis.in/apis/ikigai-wellness-API/ourSpecialities';

export const fetchOurSpeciality = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Our Speciality data:', error);
        throw error;
    }
};

export const updateOurSpecialityStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/updateStatus`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Our Speciality status:', error);
        throw error;
    }
};


export const deleteOurSpeciality = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Our Speciality:', error);
        throw error;
    }
};


export const fetchOurSpecialityByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Our Speciality data:', error);
        throw error;
    }
};

export const saveOurSpeciality = async (id, formDataToSend) => {
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