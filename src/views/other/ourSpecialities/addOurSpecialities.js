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
    });
    const [image, setImage] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (id !== 'add') {
            fetchOurSpecialityByID(id)
                .then(data => {
                    setFormData({
                        heading: data.heading || '',
                        content: data.content || '',
                        schema_data: data.schema_data || '',
                    });
                })
                .catch(error => console.error('Error fetching speciality:', error));
        }
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateForm = () => {
       
        const errors = {};
        if (!formData.heading) errors.heading = 'Heading is required';
        if (!formData.content) errors.content = 'Content is required';
        if (!image) errors.image = 'Image is required';
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const { heading, content, schema_data } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('heading', heading);
        formDataToSend.append('content', content);
        formDataToSend.append('schema_data', schema_data || ' ');
        if (image) {
            formDataToSend.append('image', image);
        }

        try {
            await saveOurSpeciality(id, formDataToSend);
            alert('Speciality saved successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error submitting form:', error);
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
                                                    <button className="main_bt" type="submit">Submit</button>
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
