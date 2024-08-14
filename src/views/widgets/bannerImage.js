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

    useEffect(() => {
        if (id) {
            // Uncomment and implement fetch if needed
            // fetchBannerImageByID(id).then(data => setBanners(data)).catch(console.error);
        }
    }, [id]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedBanners = [...banners];
        updatedBanners[index][name] = value;
        setBanners(updatedBanners);
    };

    const handleFileChange = (index, e, key) => {
        const file = e.target.files[0];
        const updatedBanners = [...banners];
        updatedBanners[index][key] = file;
        setBanners(updatedBanners);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
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
                                                            name={`desktop_image_${index}`}
                                                            onChange={(e) => handleFileChange(index, e, 'desktop_image_path')}
                                                            className="form-control"
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
                                                                className="form-control"
                                                            />
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
                                                            name={`mobile_image_${index}`}
                                                            onChange={(e) => handleFileChange(index, e, 'mobile_image_path')}
                                                            className="form-control"
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
                                                                className="form-control"
                                                            />
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
                                                            name={`tablet_image_${index}`}
                                                            onChange={(e) => handleFileChange(index, e, 'tablet_image_path')}
                                                            className="form-control"
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
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
