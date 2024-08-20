import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import Overview from '../../widgets/overview';
import { deleteOurServices, fetchOurServices, updateOurServicesOnHomeStatus, updateOurServicesOnTopStatus, updateOurServicesStatus } from '../../../controllers/ourServices/services';
import { deleteBanner, fetchBannerByID, updateBannerStatus } from '../../../controllers/bannerImage/bannerImage';
import { globals } from '../../../controllers/home_banner/home_banner';
import ImageModal from '../../widgets/imageModel';

const OurServices = () => {
    const [services, setServices] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [modalAltText, setModalAltText] = useState('');

    const handleShow = (imageUrl, altText) => {
        setModalImageUrl(imageUrl);
        setModalAltText(altText);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    const openModal = (services) => {
        setSelectedDetail(services);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const loadData = async () => {

            await loadOurServices();
            await loadBannerImage('service');}
        loadData();
    }, []);
    const loadOurServices = async () => {
        try {
            setLoading(true);
            const OurServicesData = await fetchOurServices();
            setServices(OurServicesData);
        } catch (err) {
            setError('Failed to load Data');
            console.log('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadBannerImage = async () => {
        try {setLoading(true);
            const bannerData = await fetchBannerByID('service');
            // console.log('Type of bannerData:', typeof bannerData);
            // console.log('Content of bannerData:', bannerData);
            
            // // Wrap the object in an array
            // const bannerDataArray = [bannerData];
            // console.log('Wrapped bannerData in an array:', bannerDataArray);
            
            setBannerImage(bannerData);
        } catch (err) {
            console.log('Failed to fetch Banner Image data:', err);
            setError('Failed to fetch Banner Image data');
        }finally {
            setLoading(false);
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
                // setservicess(prevservicess => prevservicess.filter(services => services.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting Banner:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const result = await updateOurServicesStatus(id, currentStatus);
            if (result.success) {
                console.log('Our Services status updated successfully!');
                // setServices(prevservices => 
                //     prevservices.map(services =>
                //         services.id === id ? { ...services, status: currentStatus } : services
                //     )
                // );
                loadOurServices();
            } else {
                console.error('Error updating Our Services status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleUpdateOnHomeStatus = async (id, currentStatus) => {
        try {
            // Call the function to update status in the backend
            await updateOurServicesOnHomeStatus(id, currentStatus);

            // Update the local state with the new status
            // setServices(prevservices => 
            //     prevservices.map(services => 
            //         services.id === id ? { ...services, on_home: currentStatus } : services
            //     )
            // );
            loadOurServices();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    
    const handleUpdateOnTopStatus = async (id, currentStatus) => {
        try {
            const result = await updateOurServicesOnTopStatus(id, currentStatus);
            if (result.success) {
                // console.log('Our Services On Top status updated successfully!');
                // setServices(prevservices => 
                //     prevservices.map(services =>
                //         services.id === id ? { ...services, on_top: currentStatus } : services
                //     )
                // );
                loadOurServices();
            } else {
                console.error('Error updating Our Services status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteService = async (id) => {
        try {
            const result = await deleteOurServices(id);
            if (result.success) {
                alert('Our Services deleted successfully');
                setServices(prevservices => prevservices.filter(services => services.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting Our Services:', error);
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
                                    <h2>Our Services</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addOurServices/add" className="btn btn-success btn-xs mr-2">Add Our Services</Link>
                                        <Link to="/metaDetails/service" className="btn btn-success btn-xs mr-2">Meta Details</Link>
                                        <Link to="/bannerImage/service" className="btn btn-success btn-xs">Banner Image</Link>
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
                                                                    src={banner.desktop_image_path ? `${banner.desktop_image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={banner.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                    onClick={() => handleShow(`${banner.desktop_image_path}`, banner.alt_tag)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={banner.tablet_image_path ? `${banner.tablet_image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={banner.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                    onClick={() => handleShow(`${banner.tablet_image_path}`, banner.alt_tag)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={banner.mobile_image_path ? `${banner.mobile_image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={banner.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                    onClick={() => handleShow(`${banner.mobile_image_path}`, banner.alt_tag)}
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
                                    
                                        <h2 className="mt-4 mb-4">Our Services Data</h2>
                                        <div className="table-responsive-sm">
                                            <table id="subct" className="table table-striped projects">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Heading</th>
                                                        <th>Content</th>
                                                        <th>Image</th>
                                                        <th>On Home</th>
                                                        <th>On Top </th>
                                                        <th>Current Status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {services.map((services, index) => (
                                                        <tr key={services.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{services.heading}</td>
                                                            <td><div>
                                                                <button onClick={() => openModal(services)} className="btn btn-success btn-xs">
                                                                    Overview
                                                                </button>
                                                            </div></td>
                                                            <td>
                                                            <img
                                                                    src={services.image_path ? `${services.image_path}` : '/path/to/default/image'}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={services.alt_tag}
                                                                    width="50"
                                                                    height="50"
                                                                    onClick={() => handleShow(`${services.image_path}`)}
                                                                />
                                                            </td>
                                                          
                                                            <td>
                                                                {services.on_home === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateOnHomeStatus(services.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateOnHomeStatus(services.id, 0)}>Activate</button>
                                                                                )}
                                                                </td>
                                                            <td> {services.on_top === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateOnTopStatus(services.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateOnTopStatus(services.id, 0)}>Activate</button>
                                                                                )}</td>

                                                                                <td>
                                                                        
                                                                                {services.status === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(services.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(services.id, 0)}>Activate</button>
                                                                                )}
                                                                          
                                                                    </td>
                                                          
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    
                                                                    <li>
                                                                        <Link to={`/addOurServices/${services.id}`} className="btn btn-primary btn-xs">
                                                                            <i className="fa fa-edit"></i>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => handleDeleteService(services.id)}
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
                 <ImageModal 
         show={showModal} 
         handleClose={handleClose} 
         imageUrl={modalImageUrl} 
         altText={modalAltText} 
     />
        
        </>
    );
};

export default OurServices;
