import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAboutUsByID, saveAboutUs } from '../../../controllers/about/about';

const useAboutForm = (id) => {
    const [formData, setFormData] = useState({
        heading: '',
        image: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchAboutUsByID(id)
                .then(data => {
                    // Set form data and editorHtml
                    setFormData(prevData => ({
                        ...prevData,
                        heading: data.heading,
                        description: data.description
                    }));
                    setEditorHtml(data.description); // Ensure editorHtml is updated
                    setImage(null); // Optionally reset image if needed
                })
                .catch(console.error);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
            setImage(files[0]); // Set the image file
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    
    const handleEditorChange = (value) => {
        setEditorHtml(value);
        setFormData(prevData => ({
            ...prevData,
            description: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.heading.trim()) {
            setStatusMessage('Heading cannot be empty.');
            return;
        }
        if (!editorHtml.trim()) {
            setStatusMessage('Description cannot be empty.');
            return;
        }
        if (!image) {
            setStatusMessage('Image cannot be empty.');
            return;
        }

        const formDataToSend = new FormData();
       
        formDataToSend.append('heading', formData.heading || ' ');
        formDataToSend.append('description', editorHtml);
        if (image) {
            formDataToSend.append('image', image);
        }
        setLoading(true);

        try {
           
            await saveAboutUs(id, formDataToSend);
            alert('About saved successfully');
            navigate(-1);
        } catch (error) {
            alert(`Failed to save About info: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        editorHtml,
        statusMessage,
        loading,
        handleInputChange,
        handleEditorChange,
        handleSubmit
    };
};

export default useAboutForm;
