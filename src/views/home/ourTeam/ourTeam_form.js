import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOurTeamByID, saveOurTeam } from '../../../controllers/ourTeam/ourTeam';

const useTeamForm = (id) => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        heading: '',
        image:'',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchOurTeamByID(id)
                .then(data => {
                    // Set form data and editorHtml
                    setFormData(prevData => ({
                        ...prevData,
                       name: data.name,
                       designation: data.designation,
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

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name || ' ');
        formDataToSend.append('designation', formData.designation || ' ');
        formDataToSend.append('heading', formData.heading || ' ');
        formDataToSend.append('description', editorHtml);
        if (image) {
            formDataToSend.append('image', image);
        }

        setLoading(true);
        try {
            
            await saveOurTeam(id, formDataToSend);
            alert('Meta info saved successfully');
            navigate(-1);
        } catch (error) {
            alert(`Failed to save meta info: ${error.message}`);
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

export default useTeamForm;
