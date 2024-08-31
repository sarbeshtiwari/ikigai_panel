import axios from 'axios';

const API_URL = 'https://ecis.in/apis/ikigai-wellness-API/blog';
// const API_URL = 'http://localhost:1000/blog';

export const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Blogs data:', error);
        throw error;
    }
};

export const updateBlogsStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/updateStatus`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Blogs status:', error);
        throw error;
    }
};

export const deleteBlogs = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Blogs:', error);
        throw error;
    }
};


export const fetchBlogsByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getByID/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Blogs data:', error);
        throw error;
    }
};

export const saveBlogs = async (id, formDataToSend) => {
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
        console.log('Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};