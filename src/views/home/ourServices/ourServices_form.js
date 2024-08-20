import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOurServicesByID, saveOurServices } from '../../../controllers/ourServices/services';

const useServicesForm = (id) => {
    const [formData, setFormData] = useState({
        heading: '',
        home_data: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [image, setImage] = useState(null);
    const [homeImage, setHomeImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchOurServicesByID(id)
                .then(data => {
                    // Set form data and editorHtml
                    setFormData(prevData => ({
                        ...prevData,
                        heading: data.heading,
                        home_data: data.home_data,
                        description: data.description
                    }));
                    setEditorHtml(data.description); // Ensure editorHtml is updated
                    setImage(null); // Optionally reset image if needed
                    setHomeImage(null);
                })
                .catch(console.error);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (name === 'image') {
                setImage(file);
            } else if (name === 'home_image') {
                setHomeImage(file);
            }
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleEditorChange = (value) => {
        setEditorHtml(value);
        setFormData(prevData => ({ ...prevData, description: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.heading.trim()) {
            errors.heading = 'Heading is required';
        }
        if (!formData.home_data.trim()) {
            errors.home_data = 'Home data is required';
        }
        if (!editorHtml.trim()) {
            errors.description = 'Description is required';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const formDataToSend = new FormData();
        formDataToSend.append('heading', formData.heading || ' ');
        formDataToSend.append('home_data', formData.home_data || ' ');
        formDataToSend.append('description', editorHtml);
        if (image) {
            formDataToSend.append('image_path', image);
        }
        if (homeImage) {
            formDataToSend.append('home_image_path', homeImage);
        }
        setLoading(true);
        try {
            await saveOurServices(id, formDataToSend);
            alert('Our Services saved successfully');
            navigate(-1);
        } catch (error) {
            alert(`Failed to save info: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        editorHtml,
        statusMessage,
        loading,
        validationErrors,
        handleInputChange,
        handleEditorChange,
        handleSubmit,
    };
};

export default useServicesForm;
