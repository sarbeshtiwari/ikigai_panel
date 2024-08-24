import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../home/sidebar';
import { fetchOurSpecialityByID, saveOurSpeciality } from '../../../controllers/ourSpecialities/ourSpecialities';

export default function AddSpecialities() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        heading: '',
        content: '',
        schema_data: '',
        image_path: '',
    });
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // To track new selected image
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id !== 'add') {
            fetchOurSpecialityByID(id)
                .then(data => {
                    setFormData({
                        heading: data.heading || '',
                        content: data.content || '',
                        schema_data: data.schema_data || '',
                        image_path: data.image_path || ''
                    });
                    if (data.image_path) {
                        setImage(data.image_path);
                    }
                })
                .catch(error => console.error('Error fetching speciality:', error));
        }
    }, [id]);

    const validateImage = (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const arr = new Uint8Array(reader.result).subarray(0, 4);
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
                    reject("Only JPG, JPEG, WEBP, and PNG formats are allowed.");
                } else {
                    resolve(file);
                }
            };

            reader.onerror = () => reject("Error reading file.");
            reader.readAsArrayBuffer(file);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const validFile = await validateImage(file);
                setSelectedImage(URL.createObjectURL(validFile)); // Create a URL for the new file
                setFormData(prevData => ({ ...prevData, image_path: file }));
                setValidationErrors(prevErrors => ({ ...prevErrors, image: null }));
            } catch (error) {
                setValidationErrors(prevErrors => ({ ...prevErrors, image: error }));
                setSelectedImage(null);
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.heading) errors.heading = 'Heading is required';
        if (!formData.content) errors.content = 'Content is required';
        if (id === 'add' && !selectedImage) errors.image = 'Image is required';
        if (id !== 'add' && !image && !selectedImage) errors.image = 'Image is required';
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setIsSubmitting(true); // Set submitting state to true

        const { heading, content, schema_data } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('heading', heading);
        formDataToSend.append('content', content);
        formDataToSend.append('schema_data', schema_data || ' ');

        // Append image based on whether a new one is selected
        if (selectedImage) {
            formDataToSend.append('image', formData.image_path);
        } else if (image) {
            formDataToSend.append('image_path', image); // Send existing image URL
        }

        try {
            await saveOurSpeciality(id, formDataToSend);
            alert('Speciality saved successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <>
            <div>
                <Sidebar />
                <div>
                    <div className="midde_cont">
                        <div className="container-fluid">
                            <div className="row column_title">
                                <div className="col-md-12">
                                    <div className="page_title">
                                        <h2>{id === 'add' ? 'Add Speciality' : 'Edit Speciality'}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row column1">
                                <div className="col-md-12">
                                    <div className="white_shd full margin_bottom_30">
                                        <div className="full graph_head">
                                            <button
                                                className="btn btn-primary btn-xs float-right"
                                                onClick={() => navigate(-1)}
                                            >
                                                Back
                                            </button>
                                        </div>
                                        <div className="full price_table padding_infor_info">
                                            <form onSubmit={handleFormSubmit} id="specialitiesForm" encType="multipart/form-data">
                                                <div className="form-row mb-3">
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Heading</label>
                                                        <input
                                                            type="text"
                                                            name="heading"
                                                            id="heading"
                                                            value={formData.heading}
                                                            onChange={handleInputChange}
                                                            className={`form-control ${validationErrors.heading ? 'is-invalid' : ''}`}
                                                        />
                                                        {validationErrors.heading && (
                                                            <div className="invalid-feedback">{validationErrors.heading}</div>
                                                        )}
                                                    </div>

                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Image</label>
                                                        <input
                                                            type="file"
                                                            name="image"
                                                            id="image"
                                                            onChange={handleFileChange}
                                                            className={`form-control ${validationErrors.image ? 'is-invalid' : ''}`}
                                                        />
                                                        {validationErrors.image && (
                                                            <div className="invalid-feedback">{validationErrors.image}</div>
                                                        )}
                                                        {(selectedImage || image) && (
                                                            <div className="mt-2">
                                                                <img
                                                                    src={selectedImage || image}
                                                                    alt="Selected"
                                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Content</label>
                                                        <textarea
                                                            name="content"
                                                            id="ccontent"
                                                            value={formData.content}
                                                            onChange={handleInputChange}
                                                            className={`form-control ${validationErrors.content ? 'is-invalid' : ''}`}
                                                            rows="5"
                                                        ></textarea>
                                                        {validationErrors.content && (
                                                            <div className="invalid-feedback">{validationErrors.content}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Schema</label>
                                                        <textarea
                                                            name="schema_data"
                                                            id="schema_data"
                                                            value={formData.schema_data}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                            rows="5"
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="form-group margin_0">
                                                    <button
                                                        className="main_bt"
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? 'Submitting...' : (id === 'add' ? 'Submit' : 'Update')}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
