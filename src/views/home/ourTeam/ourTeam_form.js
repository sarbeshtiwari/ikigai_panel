import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOurTeamByID, saveOurTeam } from '../../../controllers/ourTeam/ourTeam';

const useTeamForm = (id) => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        heading: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(''); // State for image preview
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchOurTeamByID(id)
                .then(data => {
                    setFormData({
                        name: data.name,
                        designation: data.designation,
                        heading: data.heading,
                        description: data.description
                    });
                    setEditorHtml(data.description);
                    setImagePreview(data.image_path || ''); // Set preview if image path exists
                })
                .catch(console.error);
        }
    }, [id]);

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.designation) errors.designation = 'Designation is required';
        if (!editorHtml) errors.description = 'Description is required';

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
                    setImagePreview(URL.createObjectURL(file)); // Create object URL for preview
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
        formDataToSend.append('name', formData.name);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('heading', formData.heading);
        formDataToSend.append('description', editorHtml);
        if (image) {
            formDataToSend.append('image', image); // Append to FormData with correct column name
        }

        setLoading(true);
        try {
            await saveOurTeam(id, formDataToSend);
            alert('Meta info saved successfully');
            navigate(-1);
        } catch (error) {
            setStatusMessage(`Failed to save meta info: ${error.message}`);
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
        handleSubmit,
        imagePreview // Return imagePreview
    };
};

export default useTeamForm;
