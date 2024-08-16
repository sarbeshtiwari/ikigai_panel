import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import Overview from '../../widgets/overview';
import { deleteAboutUs, fetchAboutUs, updateAboutUsOnHomeStatus, updateAboutUsOnTopStatus, updateAboutUsStatus } from '../../../controllers/about/about';
import { deleteBanner, fetchBannerByID, updateBannerStatus } from '../../../controllers/bannerImage/bannerImage';
import { globals } from '../../../controllers/home_banner/home_banner';

const AboutUs = () => {
    const [abouts, setAbouts] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (about) => {
        setSelectedDetail(about);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                await loadAboutUs();
                await loadBannerImage('about');
            } catch (err) {
                setError('Failed to load data');
                console.log('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const loadAboutUs = async () => {
        try {
            const AboutUsData = await fetchAboutUs();
            setAbouts(AboutUsData || []);
        } catch (err) {
            console.log('Failed to fetch About Us data:', err);
            setError('Failed to fetch About Us data');
        }
    };

    const loadBannerImage = async () => {
        try {
            const bannerData = await fetchBannerByID('about');
            // console.log('Type of bannerData:', typeof bannerData);
            // console.log('Content of bannerData:', bannerData);
            
            // // Wrap the object in an array
            // const bannerDataArray = [bannerData];
            // console.log('Wrapped bannerData in an array:', bannerDataArray);
            
            setBannerImage(bannerData);
        } catch (err) {
            console.log('Failed to fetch Banner Image data:', err);
            setError('Failed to fetch Banner Image data');
        }
    };
    
    

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const result = await updateAboutUsStatus(id, currentStatus);
            if (result.success) {
                console.log('About Us status updated successfully!');
                loadAboutUs();
            } else {
                console.error('Error updating About Us status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleUpdateBannerStatus = async (id, currentStatus) => {
        try {
            const result = await updateBannerStatus(id, currentStatus);
            if (result.success) {
                console.log('Banner status updated successfully!');
                loadBannerImage();
            } else {
                console.error('Error updating Banner status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteBanner = async (id) => {
        try {
            const result = await deleteBanner(id);
            if (result.success) {
                alert('Banner deleted successfully');
                loadBannerImage();
                // setAbouts(prevAbouts => prevAbouts.filter(about => about.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting Banner:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleUpdateOnHomeStatus = async (id, currentStatus) => {
        try {
            await updateAboutUsOnHomeStatus(id, currentStatus);
            loadAboutUs();
        } catch (error) {
            console.error('Error updating On Home status:', error);
        }
    };

    const handleUpdateOnTopStatus = async (id, currentStatus) => {
        try {
            const result = await updateAboutUsOnTopStatus(id, currentStatus);
            if (result.success) {
                loadAboutUs();
            } else {
                console.error('Error updating On Top status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteAbout = async (id) => {
        try {
            const result = await deleteAboutUs(id);
            if (result.success) {
                alert('About Us deleted successfully');
                setAbouts(prevAbouts => prevAbouts.filter(about => about.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting About Us:', error);
            alert(`Error: ${error.message}`);
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
                                <h2>About Us</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row column1">
                        <div className="col-md-12">
                            <div className="white_shd full margin_bottom_30">
                                <div className="full graph_head">
                                    <Link to="/addAboutUs/add" className="btn btn-success btn-xs mr-2">Add About Us</Link>
                                    <Link to="/metaDetails/about" className="btn btn-success btn-xs mr-2">Meta Details</Link>
                                    <Link to="/bannerImage/about" className="btn btn-success btn-xs">Banner Image</Link>
                                </div>
                                <div className="full price_table padding_infor_info">
                                    {loading && <div className="loading">Loading...</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {bannerImage.length > 0 ? (
                                        <>
                                        <h2 className="mt-4 mb-4">Banner Images</h2>
                                        <div className="table-responsive-sm">
                                            <table id="subct" className="table table-striped projects">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Image Desktop</th>
                                                        <th>Image Tablet</th>
                                                        <th>Image Mobile</th>
                                                        <th>Current Status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bannerImage.map((banner, index) => (
                                                        <tr key={banner.id}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <img
                                                                    src={banner.desktop_image_path ? `${globals}/uploads/banner_image/desktop/${banner.desktop_image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={banner.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                />
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={banner.tablet_image_path ? `${globals}/uploads/banner_image/tablet/${banner.tablet_image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={banner.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                />
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={banner.mobile_image_path ? `${globals}/uploads/banner_image/mobile/${banner.mobile_image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={banner.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                />
                                                            </td>
                                                            <td>
                                                                {banner.status === 0 ? (
                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateBannerStatus(banner.id, 1)}>Deactivate</button>
                                                                ) : (
                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateBannerStatus(banner.id, 0)}>Activate</button>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to delete this banner image?')) {
                                                                                    handleDeleteBanner(banner.id);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> 
                                        
                                        </>
                                    ): ('')}
                                    
                                        <h2 className="mt-4 mb-4">About Us Data</h2>
                                    
                                    <div className="table-responsive-sm">
                                        <table id="subct" className="table table-striped projects">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>No</th>
                                                    <th>Heading</th>
                                                    <th>Content</th>
                                                    <th>On Home</th>
                                                    <th>On Top </th>
                                                    <th>Current Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {abouts.map((about, index) => (
                                                    <tr key={about.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{about.heading}</td>
                                                        <td>
                                                            <button onClick={() => openModal(about)} className="btn btn-success btn-xs">
                                                                Overview
                                                            </button>
                                                        </td>
                                                        <td>
                                                            {about.on_home === 0 ? (
                                                                <button className="btn btn-warning btn-xs" onClick={() => handleUpdateOnHomeStatus(about.id, 1)}>Deactivate</button>
                                                            ) : (
                                                                <button className="btn btn-success btn-xs" onClick={() => handleUpdateOnHomeStatus(about.id, 0)}>Activate</button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {about.on_top === 0 ? (
                                                                <button className="btn btn-warning btn-xs" onClick={() => handleUpdateOnTopStatus(about.id, 1)}>Deactivate</button>
                                                            ) : (
                                                                <button className="btn btn-success btn-xs" onClick={() => handleUpdateOnTopStatus(about.id, 0)}>Activate</button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {about.status === 0 ? (
                                                                <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(about.id, 1)}>Deactivate</button>
                                                            ) : (
                                                                <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(about.id, 0)}>Activate</button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <ul className="list-inline d-flex justify-content-center">
                                                                <li>
                                                                    <Link to={`/addAboutUs/${about.id}`} className="btn btn-primary btn-xs">
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="btn btn-danger btn-xs"
                                                                        onClick={() => handleDeleteAbout(about.id)}
                                                                    >
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Overview 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                description={selectedDetail ? selectedDetail.description : ''} 
            />
        </>
    );
};

export default AboutUs;
