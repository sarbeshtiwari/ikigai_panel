import React, { useState, useEffect } from 'react';
import Sidebar from '../home/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { addBannerImage } from '../../controllers/bannerImage/bannerImage';

export default function AddBannerImage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [banners, setBanners] = useState([{
        desktop_image_path: '',
        mobile_image_path: '',
        tablet_image_path: '',
        alt_tag_desktop: '',
        alt_tag_mobile: '',
        alt_tag_tablet: '',
        pageType: id
    }]);

    const [validationErrors, setValidationErrors] = useState({});

    // useEffect(() => {
    //     if (id) {
    //     }
    // }, [id]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedBanners = [...banners];
        updatedBanners[index][name] = value;
        setBanners(updatedBanners);
    };

    const validateImage = (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
        const maxSize = 2 * 1024 * 1024;

        
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            if (file.size > maxSize) {
                alert("File size exceeds 2 MB");
                return;
            }
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
                    alert("Only JPG, JPEG, WEBP, and PNG formats are allowed.");
                } else {
                    resolve(file);
                }
            };

            reader.onerror = () => alert("Error reading file.");
            reader.readAsArrayBuffer(file);
        });
    };

    const handleFileChange = async (index, e, key) => {
        const file = e.target.files[0];
        const valid = await validateImage(file);
        if (valid){const updatedBanners = [...banners];
            updatedBanners[index][key] = file;
            setBanners(updatedBanners);}
        
    };

    const validateForm = () => {
        const errors = {};
        let hasImage = false;

        banners.forEach((banner, index) => {
            if (banner.desktop_image_path && !banner.alt_tag_desktop) {
                errors[`alt_tag_desktop`] = 'Alt tag for desktop image is required';
            }
            if (banner.mobile_image_path && !banner.alt_tag_mobile) {
                errors[`alt_tag_mobile`] = 'Alt tag for mobile image is required';
            }
            if (banner.tablet_image_path && !banner.alt_tag_tablet) {
                errors[`alt_tag_tablet`] = 'Alt tag for tablet image is required';
            }

            if (banner.desktop_image_path || banner.mobile_image_path || banner.tablet_image_path) {
                hasImage = true;
            }
        });

        if (!hasImage) {
            errors.general = 'At least one image is required';
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

        const formDataToSend = new FormData();
        banners.forEach((banner, index) => {
            formDataToSend.append(`alt_tag_desktop`, banner.alt_tag_desktop || '');
            formDataToSend.append(`alt_tag_mobile`, banner.alt_tag_mobile || '');
            formDataToSend.append(`alt_tag_tablet`, banner.alt_tag_tablet || '');
            formDataToSend.append(`pageType`, banner.pageType || '');

            if (banner.desktop_image_path) {
                formDataToSend.append(`desktop_image`, banner.desktop_image_path);
            }
            if (banner.mobile_image_path) {
                formDataToSend.append(`mobile_image`, banner.mobile_image_path);
            }
            if (banner.tablet_image_path) {
                formDataToSend.append(`tablet_image`, banner.tablet_image_path);
            }
        });

        try {
            await addBannerImage(formDataToSend);
            alert('Banner saved successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Failed to save banner: ${error.message}`);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="midde_cont">
                <div className="container-fluid">
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <h2>Add Banner</h2>
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
                                        {banners.map((banner, index) => (
                                            <div className="row mb-3" key={index}>
                                                <div className="col-md-4">
                                                    <div className="card mb-3">
                                                        <div className="card-body">
                                                            <label className="label_field">Desktop Image</label>
                                                            <input
                                                                type="file"
                                                                name={`desktop_image`}
                                                                onChange={(e) => handleFileChange(index, e, 'desktop_image_path')}
                                                                className={`form-control ${validationErrors[`desktop_image`] ? 'is-invalid' : ''}`}
                                                            />
                                                            {banner.desktop_image_path && (
                                                                <img
                                                                    src={URL.createObjectURL(banner.desktop_image_path)}
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
                                                                name={`mobile_image`}
                                                                onChange={(e) => handleFileChange(index, e, 'mobile_image_path')}
                                                                className={`form-control ${validationErrors[`mobile_image`] ? 'is-invalid' : ''}`}
                                                            />
                                                            {banner.mobile_image_path && (
                                                                <img
                                                                    src={URL.createObjectURL(banner.mobile_image_path)}
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
                                                                name={`tablet_image`}
                                                                onChange={(e) => handleFileChange(index, e, 'tablet_image_path')}
                                                                className={`form-control ${validationErrors[`tablet_image`] ? 'is-invalid' : ''}`}
                                                            />
                                                            {banner.tablet_image_path && (
                                                                <img
                                                                    src={URL.createObjectURL(banner.tablet_image_path)}
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
                                            </div>
                                        ))}
                                        {validationErrors.general && (
                                            <div className="alert alert-danger">
                                                {validationErrors.general}
                                            </div>
                                        )}
                                        <div className="form-group margin_0">
                                            <button className="main_bt" type="submit">
                                                Add Banner
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
