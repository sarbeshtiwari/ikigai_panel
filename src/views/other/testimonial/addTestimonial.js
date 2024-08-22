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
    const [imagePreview, setImagePreview] = useState('');
    const [videoPreview, setVideoPreview] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);  // New loading state

    useEffect(() => {
        if (id !== 'add') {
            // Fetch existing testimonial data if not adding a new one
            fetchTestimonialsByID(id).then(data => {
                const { image_path, alt_tag, videoURL, video_path } = data;
                setFormData({
                    alt_tag: alt_tag || '',
                    videoURL: videoURL || '',
                });
                setImagePreview(image_path || '');
                // Since videoURL is an iframe, it will be set directly in the textarea or input
                setVideoPreview(videoURL || video_path);
            }).catch(error => console.error("Error fetching testimonial data:", error));
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

    const validateVideo = (file) => {
        // Implement video validation if needed
        // For example, checking file types and sizes
        const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (!allowedTypes.includes(file.type)) {
            return Promise.reject("Only MP4, WEBM, and OGG formats are allowed.");
        }
        return Promise.resolve(file);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = async (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            try {
                if (name === 'image') {
                    const validImage = await validateImage(file);
                    setImage(validImage);
                    setValidationErrors(prevErrors => ({ ...prevErrors, image: null }));
                } else if (name === 'video') {
                    const validVideo = await validateVideo(file);
                    setVideo(validVideo);
                    setValidationErrors(prevErrors => ({ ...prevErrors, video: null }));
                }
            } catch (error) {
                setValidationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
                if (name === 'image') setImage(null);
                if (name === 'video') setVideo(null);
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!image && !imagePreview) errors.image = 'Thumbnail image is required';
        if (!formData.alt_tag) errors.alt_tag = 'Alt tag is required';
        if (!video && !videoPreview && !formData.videoURL) errors.videoOrURL = 'Either video file or video URL must be provided';
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const { alt_tag, videoURL } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('alt_tag', alt_tag);
        formDataToSend.append('videoURL', videoURL);

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
                                                    {imagePreview && (
                                                        <div>
                                                            <img 
                                                                src={imagePreview} 
                                                                alt="Thumbnail preview" 
                                                                className="img-thumbnail" 
                                                                style={{ width: '200px', height: 'auto', maxHeight: '200px' }} 
                                                            />
                                                        </div>
                                                    )}
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
                                                    {videoPreview && (
                                                        <div>
                                                            <video 
                                                                src={videoPreview} 
                                                                controls 
                                                                className="video-thumbnail" 
                                                                style={{ width: '320px', height: 'auto' }} 
                                                            />
                                                        </div>
                                                    )}
                                                    <input 
                                                        type="file" 
                                                        name="video" 
                                                        id="video" 
                                                        onChange={handleFileChange} 
                                                        className={`form-control ${validationErrors.video ? 'is-invalid' : ''}`} 
                                                    />
                                                    {validationErrors.video && (
                                                        <div className="invalid-feedback">{validationErrors.video}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                <label className="label_field">Video URL</label>
                                                {formData.videoURL && (
                                                    <div>
                                                        {/* Ensure the URL is in the correct format */}
                                                        <iframe 
                                                            width="320" 
                                                            height="180" 
                                                            src={`https://www.youtube.com/embed/${formData.videoURL.split('/').pop()}`} 
                                                            title="Video URL" 
                                                            frameBorder="0" 
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                            referrerPolicy="strict-origin-when-cross-origin" 
                                                            allowFullScreen 
                                                        />
                                                    </div>
                                                )}
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
                                            <div className="form-group">
                                                <button type="submit" className="main_bt">
                                                    {loading ? 'Submiting...' : 'Submit'}
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
