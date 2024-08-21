import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAboutUsByID, saveAboutUs } from '../../../controllers/about/about';

const useAboutForm = (id) => {
    const [formData, setFormData] = useState({
        heading: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchAboutUsByID(id)
                .then(data => {
                    setFormData({
                        heading: data.heading,
                        description: data.description
                    });
                    setEditorHtml(data.description); // Ensure editorHtml is updated
                })
                .catch(console.error);
        }
    }, [id]);

    const validateForm = () => {
        const errors = {};
        if (!formData.heading.trim()) errors.heading = 'Heading cannot be empty.';
        if (!editorHtml.trim()) errors.description = 'Description cannot be empty.';
        if (!image) errors.image = 'Image is required';

        return errors;
    };

    const isValidImage = async (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
        const reader = new FileReader();
        
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const arr = (new Uint8Array(reader.result)).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }

                let fileType = "";
                switch (header) {
                    case "89504e47":
                        fileType = "image/png";
                        break;
                    case "52494646":
                        fileType = "image/webp";
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                    case "ffd8ffe3":
                    case "ffd8ffe8":
                        fileType = "image/jpeg";
                        break;
                    default:
                        fileType = "unknown";
                        break;
                }

                if (!allowedTypes.includes(fileType)) {
                    setValidationErrors(prevErrors => ({ ...prevErrors, image: "Only JPG, JPEG, WEBP, and PNG formats are allowed." }));
                    resolve(false);
                } else {
                    setValidationErrors(prevErrors => ({ ...prevErrors, image: null }));
                    resolve(true);
                }
            };

            reader.readAsArrayBuffer(file);
        });
    };

    const handleInputChange = async (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                const isValid = await isValidImage(file);
                if (isValid) {
                    setImage(file);
                } else {
                    setValidationErrors(prevErrors => ({ ...prevErrors, image: "Only JPG, JPEG, WEBP, and PNG formats are allowed." }));
                }
            }
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

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
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
        validationErrors,
        loading,
        handleInputChange,
        handleEditorChange,
        handleSubmit
    };
};

export default useAboutForm;
