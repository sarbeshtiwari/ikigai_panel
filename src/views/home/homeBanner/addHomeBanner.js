import Sidebar from '../sidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addHomeBanner, fetchHomeBannerByID, saveHomeBanner } from '../../../controllers/home_banner/home_banner';

export default function AddHomeBanner() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validationErrors, setValidationErrors] = useState({});

    const [formData, setFormData] = useState({
        banners: [
            { desktop_image_path: '', mobile_image_path: '', tablet_image_path: '', alt_tag_desktop: '', alt_tag_mobile: '', alt_tag_tablet: '' }
        ]
    });

    const [images, setImages] = useState([{}, {}, {}]); // Track uploaded images (desktop, mobile, tablet)

    useEffect(() => {
        if (id !== 'add') {
            fetchHomeBannerByID(id).then(data => {
                // Assuming data.banners is an array of banner objects
                setFormData({ banners: data.banners });
            }).catch(console.error);
        }
    }, [id]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedBanners = [...formData.banners];
        updatedBanners[index][name] = value;
        setFormData({ banners: updatedBanners });
    };

    const handleFileChange = (index, e, key) => {
        const file = e.target.files[0];
        const updatedBanners = [...formData.banners];
        updatedBanners[index][key] = file ? URL.createObjectURL(file) : '';
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages[index] = { ...newImages[index], [key]: file };
            return newImages;
        });
        setFormData({ banners: updatedBanners });
    };

    const handleAddRow = () => {
        setFormData(prevState => ({
            banners: [
                ...prevState.banners,
                { desktop_image_path: '', mobile_image_path: '', tablet_image_path: '', alt_tag_desktop: '', alt_tag_mobile: '', alt_tag_tablet: ''}
            ]
        }));
        setImages(prevImages => [...prevImages, {}, {}, {}]); // Add a new set of image placeholders
    };

    const handleRemoveRow = (index) => {
        if (formData.banners.length > 1) {
            const updatedBanners = formData.banners.filter((_, i) => i !== index);
            setFormData({ banners: updatedBanners });
            setImages(prevImages => prevImages.filter((_, i) => i !== index));
        }
    };

    const validateForm = () => {
        const errors = {};
        let hasImage = false;
    
        formData.banners.forEach((banner, index) => {
            // Validate desktop image and alt tag
            if (banner.desktop_image_path && !banner.alt_tag_desktop) {
                errors[`alt_tag_desktop_${index}`] = 'Alt tag for desktop image is required';
            }
    
            // Validate mobile image and alt tag
            if (banner.mobile_image_path && !banner.alt_tag_mobile) {
                errors[`alt_tag_mobile_${index}`] = 'Alt tag for mobile image is required';
            }
    
            // Validate tablet image and alt tag
            if (banner.tablet_image_path && !banner.alt_tag_tablet) {
                errors[`alt_tag_tablet_${index}`] = 'Alt tag for tablet image is required';
            }
    
            // Check if any image is selected
            if (banner.desktop_image_path || banner.mobile_image_path || banner.tablet_image_path) {
                hasImage = true;
            }
        });
    
        // General validation to check if at least one image is selected
        if (!hasImage) {
            errors.general = 'At least one image is required';
        }
    
        return errors;
    };
    

    const handleFormSubmit = async (e) => {
    e.preventDefault();

    // const errors = validateForm();
    // if (Object.keys(errors).length > 0) {
    //     setValidationErrors(errors);
    //     return;
    // }

    const formDataToSend = new FormData();
    formData.banners.forEach((banner, index) => {
        formDataToSend.append(`alt_tag_desktop`, banner.alt_tag_desktop || '');
        formDataToSend.append(`alt_tag_mobile`, banner.alt_tag_mobile || '');
        formDataToSend.append(`alt_tag_tablet`, banner.alt_tag_tablet || '');

        if (images[index]?.desktop_image) {
            formDataToSend.append(`desktop_image`, images[index].desktop_image);
        }
        if (images[index]?.mobile_image) {
            formDataToSend.append(`mobile_image`, images[index].mobile_image);
        }
        if (images[index]?.tablet_image) {
            formDataToSend.append(`tablet_image`, images[index].tablet_image);
        }
    });

    try {
        await saveHomeBanner(id, formDataToSend);
        alert('Banner saved successfully');
        navigate(-1);
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(`Failed to save banner: ${error.response?.data}`);
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
                                    <h2>{id === 'add' ? 'Add Home Banner' : 'Edit Home Banner'}</h2>
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
                                        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                                            {formData.banners.map((banner, index) => (
                                                <div className="row mb-3" key={index}>
                                                    <div className="col-md-4">
                                                        <div className="card mb-3">
                                                            <div className="card-body">
                                                                <label className="label_field">Desktop Image</label>
                                                                <input
                                                                    type="file"
                                                                    name="desktop_image"
                                                                    id={`desktop_image_${index}`}
                                                                    onChange={(e) => handleFileChange(index, e, 'desktop_image')}
                                                                    className={`form-control ${validationErrors[`desktop_image`] ? 'is-invalid' : ''}`}
                                                                />
                                                                {banner.desktop_image_path && !images[index].desktop_image && (
                                                                    <img
                                                                        src={banner.desktop_image_path}
                                                                        alt="Desktop"
                                                                        className="img-thumbnail mt-2"
                                                                        style={{ width: '150px' }}
                                                                    />
                                                                )}
                                                                <div className="form-group mt-3">
                                                                    <label className="label_field">Alt Tag</label>
                                                                    <input
                                                                        type="text"
                                                                        name="alt_tag_desktop"
                                                                        id={`alt_tag_desktop_${index}`}
                                                                        value={banner.alt_tag_desktop}
                                                                        onChange={(e) => handleInputChange(index, e)}
                                                                        className={`form-control ${validationErrors[`alt_tag_desktop`] ? 'is-invalid' : ''}`}
                                                                    />
                                                                    {validationErrors[`alt_tag_desktop`] && (
                                                                    <div className="invalid-feedback">{validationErrors[`alt_tag_desktop`]}</div>
                                                                )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="card mb-3">
                                                            <div className="card-body">
                                                                <label className="label_field">Mobile Image</label>
                                                                <input
                                                                    type="file"
                                                                    name="mobile_image"
                                                                    id={`mobile_image_${index}`}
                                                                    onChange={(e) => handleFileChange(index, e, 'mobile_image')}
                                                                    className={`form-control ${validationErrors[`mobile_image`] ? 'is-invalid' : ''}`}
                                                                />
                                                                {banner.mobile_image_path && !images[index].mobile_image && (
                                                                    <img
                                                                        src={banner.mobile_image_path}
                                                                        alt="Mobile"
                                                                        className="img-thumbnail mt-2"
                                                                        style={{ width: '150px' }}
                                                                    />
                                                                )}
                                                                <div className="form-group mt-3">
                                                                    <label className="label_field">Alt Tag</label>
                                                                    <input
                                                                        type="text"
                                                                        name="alt_tag_mobile"
                                                                        id={`alt_tag_mobile_${index}`}
                                                                        value={banner.alt_tag_mobile}
                                                                        onChange={(e) => handleInputChange(index, e)}
                                                                        className={`form-control ${validationErrors[`alt_tag_mobile`] ? 'is-invalid' : ''}`}
                                                                    />
                                                                     {validationErrors[`alt_tag_mobile`] && (
                                                                    <div className="invalid-feedback">{validationErrors[`alt_tag_mobile`]}</div>
                                                                )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="card mb-3">
                                                            <div className="card-body">
                                                                <label className="label_field">Tablet Image</label>
                                                                <input
                                                                    type="file"
                                                                    name="tablet_image"
                                                                    id={`tablet_image_${index}`}
                                                                    onChange={(e) => handleFileChange(index, e, 'tablet_image')}
                                                                    className={`form-control ${validationErrors[`tablet_image`] ? 'is-invalid' : ''}`}
                                                                />
                                                                {banner.tablet_image_path && !images[index].tablet_image && (
                                                                    <img
                                                                        src={banner.tablet_image_path}
                                                                        alt="Tablet"
                                                                        className="img-thumbnail mt-2"
                                                                        style={{ width: '150px' }}
                                                                    />
                                                                )}
                                                                <div className="form-group mt-3">
                                                                    <label className="label_field">Alt Tag</label>
                                                                    <input
                                                                        type="text"
                                                                        name="alt_tag_tablet"
                                                                        id={`alt_tag_tablet_${index}`}
                                                                        value={banner.alt_tag_tablet}
                                                                        onChange={(e) => handleInputChange(index, e)}
                                                                        className={`form-control ${validationErrors[`alt_tag_tablet`] ? 'is-invalid' : ''}`}
                                                                        />
                                                                        {validationErrors[`alt_tag_tablet`] && (
                                                                            <div className="invalid-feedback">{validationErrors[`alt_tag_tablet`]}</div>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {formData.banners.length > 1 && (
                                                        <div className="col-md-12">
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => handleRemoveRow(index)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {validationErrors.general && (
                                            <div className="alert alert-danger">
                                                {validationErrors.general}
                                            </div>
                                        )}

                                            {/* <button
                                                type="button"
                                                className="btn btn-primary mb-3"
                                                onClick={handleAddRow}
                                            >
                                                Add More
                                            </button> */}

                                            <div className="form-group margin_0">
                                                <input type="hidden" name="addcities" id="addcities" value="active" />
                                                <button className="main_bt" type="submit">Submit</button>
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
