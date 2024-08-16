import Sidebar from '../home/sidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMetaDetailsByID, saveMetaDetails } from '../../controllers/metaDetails/metaDetails';

export default function MetaDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        pageType: id
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetchMetaDetailsByID(id)
            .then(data => {
                // Ensure data matches the formData structure
                setFormData({
                    meta_title: data.meta_title || '',
                    meta_keyword: data.meta_keyword || '',
                    meta_description: data.meta_description || '',
                    pageType: id
                });
            })
            .catch(console.error);
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.meta_title) {
            errors.meta_title = 'Meta title is required';
        }
        if (!formData.meta_keyword) {
            errors.meta_keyword = 'Meta keywords are required';
        }
        if (!formData.meta_description) {
            errors.meta_description = 'Meta description is required';
        }
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            console.log(formData); // Check if formData is logged correctly
            await saveMetaDetails(id, formData);
            alert('Meta info saved successfully');
            navigate(-1);
        } catch (error) {
            alert(`Failed to save meta info: ${error.message}`);
        }
    };

    return (
        <>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{`${id} Meta Details`}</h2>
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
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="form-row mb-3">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        name="meta_title"
                                                        id="meta_title"
                                                        value={formData.meta_title}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.meta_title ? 'is-invalid' : ''}`}
                                                    />
                                                    {validationErrors.meta_title && (
                                                        <div className="invalid-feedback">
                                                            {validationErrors.meta_title}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Keywords</label>
                                                    <input
                                                        type="text"
                                                        name="meta_keyword"
                                                        id="meta_keyword"
                                                        value={formData.meta_keyword}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.meta_keyword ? 'is-invalid' : ''}`}
                                                    />
                                                    {validationErrors.meta_keyword && (
                                                        <div className="invalid-feedback">
                                                            {validationErrors.meta_keyword}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Meta Description</label>
                                                    <textarea
                                                        name="meta_description"
                                                        id="meta_description"
                                                        value={formData.meta_description}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.meta_description ? 'is-invalid' : ''}`}
                                                        rows="5"
                                                    ></textarea>
                                                    {validationErrors.meta_description && (
                                                        <div className="invalid-feedback">
                                                            {validationErrors.meta_description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                <input type="hidden" name="addcities" id="addcities" value="active" />
                                                <button className="main_bt" type="submit">
                                                    {(!formData.meta_title && !formData.meta_keyword && !formData.meta_description) ? 'Submit' : 'Update'}
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
        </>
    );
}
