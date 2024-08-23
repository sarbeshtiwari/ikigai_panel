import React, { useState, useEffect } from 'react';
import Sidebar from '../../home/sidebar';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/logo.png';
import { deleteBanner, fetchBannerByID, updateBannerStatus } from '../../../controllers/bannerImage/bannerImage';
import { deleteTestimonials, fetchTestimonials, updateTestimonialsStatus } from '../../../controllers/testimonials/testimonials';
import { globals } from '../../../controllers/home_banner/home_banner';
import ImageModal from '../../widgets/imageModel';


export default function Testimonial() {
    const [testimonial, setTestimonial] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [modalAltText, setModalAltText] = useState('');

    const handleShow = (imageUrl, altText) => {
        setModalImageUrl(imageUrl);
        setModalAltText(altText);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        const loadData = async () => {

        await loadTestimonial();
        await loadBannerImage('testimonial');
    };

    loadData();
    }, []);

     const loadTestimonial = async () => {
            try {setLoading(true);
                const TestimonialData = await fetchTestimonials();
               
                setTestimonial(TestimonialData.data);
            } catch (err) {
                console.log('Failed to fetch data');
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        const loadBannerImage = async () => {
            try { setLoading(true);
                const bannerData = await fetchBannerByID('testimonial');
                // console.log('Type of bannerData:', typeof bannerData);
                // console.log('Content of bannerData:', bannerData);
                
                // // Wrap the object in an array
                // const bannerDataArray = [bannerData];
                // console.log('Wrapped bannerData in an array:', bannerDataArray);
               
                
                setBannerImage(bannerData);
            } catch (err) {
                console.log('Failed to fetch Banner Image data:', err);
                setError('Failed to fetch Banner Image data');
            } finally {
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
                    // setAbouts(prevAbouts => prevAbouts.filter(about => about.id !== id));
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error deleting Banner:', error);
                alert(`Error: ${error.message}`);
            }
        };

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateTestimonialsStatus(id, status);
            if (response.success) {
                console.log('Testimonial status updated successfully!');
                loadTestimonial();
            } else {
                console.error('Error updating Testimonial status:', response.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteTestimonial = async (id) => {
        try {
            const result = await deleteTestimonials(id);
            if (result.success) {
                alert('Testimonial deleted successfully');
                setTestimonial(prevTestimonial => prevTestimonial.filter(Testimonial => Testimonial.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
            
            
        } catch (error) {
            console.error('Error deleting Testimonial:', error);
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
                                    <h2>Testimonial</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addTestimonial/add" className="btn btn-success btn-xs mr-2">Add Testimonial</Link>
                                        <Link to="/metaDetails/testimonial" className="btn btn-success btn-xs mr-2">Meta Details</Link>
                                        <Link to="/bannerImage/testimonial" className="btn btn-success btn-xs">Banner Image</Link>
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
                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateBannerStatus(banner.id, 1)}>Deactive</button>
                                                                ) : (
                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateBannerStatus(banner.id, 0)}>Active</button>
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
                                    
                                        <h2 className="mt-4 mb-4">Testimonial Data</h2>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Image</th>
                                                                <th>Alt Tag</th>
                                                                <th>Video</th>
                                                                <th>Current Status</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {testimonial.map((Testimonial, index) => (
                                                                <tr key={Testimonial.id}>
                                                                    <td>{index + 1}</td>
                                                                  
                                                                    <td>
                                                                        <img 
                                                                            src={Testimonial.image_path ? `${Testimonial.image_path}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={Testimonial.image_path} 
                                                                            width="50" 
                                                                            height="50" 
                                                                            onClick={() => handleShow(`${Testimonial.image_path}`)}
                                                                        />
                                                                    </td>
                                                                    <td>{Testimonial.alt_tag}</td>
                                                                    <td>
                                                                        {Testimonial.video_path ? (
                                                                            <a
                                                                                href={`${Testimonial.video_path}`}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                Watch Video
                                                                            </a>
                                                                        ) : (
                                                                            <a
                                                                                href={Testimonial.videoURL}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                Watch Video
                                                                            </a>
                                                                        )}
                                                                    </td>
                                                                    <td>{Testimonial.status === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(Testimonial.id, 1)}>Deactive</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(Testimonial.id, 0)}>Active</button>
                                                                                )}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            
                                                                            <li>
                                                                                <Link to={`/addTestimonial/${Testimonial.id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this Testimonial?')) {
                                                                                            handleDeleteTestimonial(Testimonial.id);
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ImageModal 
         show={showModal} 
         handleClose={handleClose} 
         imageUrl={modalImageUrl} 
         altText={modalAltText} 
     />
     </>
    );
}
