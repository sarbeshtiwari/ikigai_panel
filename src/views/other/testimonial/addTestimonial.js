import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../home/sidebar';
import { fetchTestimonialsByID, saveTestimonials } from '../../../controllers/testimonials/testimonials';

export default function AddTestimonial() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        alt_tag: '',
        videoURL: '',
    });

    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);  // New loading state

    useEffect(() => {
        if (id !== 'add') {
            // Fetch existing testimonial data if not adding a new one
            fetchTestimonialsByID(id).then(data => {
                setFormData({
                    alt_tag: data.alt_tag || '',
                    videoURL: data.videoURL || '',
                });
                setImage(data.image); // Set image URL or file if needed
                setVideo(data.video); // Set video URL or file if needed
            }).catch(error => console.error(error));
        }
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        } else if (e.target.name === 'video') {
            setVideo(e.target.files[0]);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!image) errors.image = 'Thumbnail image is required';
        if (!formData.alt_tag) errors.alt_tag = 'Alt tag is required';
        if (!video && !formData.videoURL) errors.videoOrURL = 'Either video file or video URL must be provided';
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append('alt_tag', formData.alt_tag);
        formDataToSend.append('videoURL', formData.videoURL);
    
        if (image) {
            formDataToSend.append('image', image);
        }
        if (video) {
            formDataToSend.append('video', video);
        }
    
        setLoading(true);
    
        try {
            console.log('FormData:', formDataToSend); // Check FormData
            let result = await saveTestimonials(id, formDataToSend);
    
            if (result.success) {
                alert('Testimonial saved successfully');
                navigate(-1);
            } else {
                alert(`Failed to save testimonial: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    
    

    return (
        <>
            <div>
                <Sidebar />
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{id === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
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
                                        <form onSubmit={handleFormSubmit} id="testimonialForm" encType="multipart/form-data">
                                            <div className="form-row mb-3">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Thumbnail Image</label>
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
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Alt Tag</label>
                                                    <input 
                                                        type="text" 
                                                        name="alt_tag" 
                                                        id="alt_tag" 
                                                        value={formData.alt_tag} 
                                                        onChange={handleInputChange} 
                                                        className={`form-control ${validationErrors.alt_tag ? 'is-invalid' : ''}`} 
                                                    />
                                                    {validationErrors.alt_tag && (
                                                        <div className="invalid-feedback">{validationErrors.alt_tag}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Video</label>
                                                    <input 
                                                        type="file" 
                                                        name="video" 
                                                        id="video" 
                                                        onChange={handleFileChange} 
                                                        className={`form-control ${validationErrors.videoOrURL ? 'is-invalid' : ''}`} 
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Video URL</label>
                                                    <input 
                                                        type="text" 
                                                        name="videoURL" 
                                                        id="videoURL" 
                                                        value={formData.videoURL} 
                                                        onChange={handleInputChange} 
                                                        className={`form-control ${validationErrors.videoOrURL ? 'is-invalid' : ''}`} 
                                                    />
                                                    {validationErrors.videoOrURL && (
                                                        <div className="invalid-feedback">{validationErrors.videoOrURL}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-group margin_0">
                                              
                                               
                                                <button 
                                                    className="main_bt" 
                                                    type="submit" 
                                                    disabled={loading}  // Disable button when loading
                                                >
                                                    {loading ? 'Submitting...' : 'Submit'}
                                                </button>
                                            </div>
                                            <span id="result" className="text-danger mt-4 d-block"></span>
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
