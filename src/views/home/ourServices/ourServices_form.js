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
    const [imagePreview, setImagePreview] = useState('');  // New state for image preview
    const [homeImagePreview, setHomeImagePreview] = useState('');  // New state for home image preview
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
                    setImagePreview(data.image_path || ''); // Set image preview
                    setHomeImagePreview(data.home_image_path || ''); // Set home image preview
                })
                .catch(console.error);
        }
    }, [id]);

    const handleInputChange = async (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (name === 'image') {
                const isValid = await isValidImage(file);
                if (isValid) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file)); // Create object URL for preview
                }
            } else if (name === 'home_image') {
                const isValid = await isValidImage(file);
                if (isValid) {
                    setHomeImage(file);
                    setHomeImagePreview(URL.createObjectURL(file)); // Create object URL for preview
                }
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
        if (!image && !imagePreview) errors.image = 'Image is required';
        if (!homeImage && !homeImagePreview) errors.home_image = 'Image is required';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidImage = async (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg", "image/svg+xml"];
        const reader = new FileReader();
    
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const arr = new Uint8Array(reader.result);
                let fileType = "";
                
                // Check for image file types based on file headers
                let header = "";
                for (let i = 0; i < Math.min(arr.length, 4); i++) {
                    header += arr[i].toString(16);
                }
    
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
                        // Additional SVG validation
                        const svgHeader = new TextDecoder().decode(arr.subarray(0, 100));
                        if (svgHeader.startsWith('<?xml') || svgHeader.startsWith('<svg')) {
                            fileType = "image/svg+xml";
                        } else {
                            fileType = "unknown";
                        }
                        break;
                }
    
                if (!allowedTypes.includes(fileType)) {
                    setValidationErrors(prevErrors => ({ ...prevErrors, image: "Only JPG, JPEG, WEBP, SVG, and PNG formats are allowed." }));
                    resolve(false);
                } else {
                    setValidationErrors(prevErrors => ({ ...prevErrors, image: null }));
                    resolve(true);
                }
            };
    
            reader.readAsArrayBuffer(file);
        });
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
        imagePreview, // Return imagePreview
        homeImagePreview // Return homeImagePreview
    };
};

export default useServicesForm;
