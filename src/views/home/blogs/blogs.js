// src/components/Blogs/Blogs.js

import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/logo.png';
import { globals } from '../../../controllers/home_banner/home_banner';
import { deleteBlogs, fetchBlogs, updateBlogsStatus } from '../../../controllers/blog/blog';
import { deleteBanner, fetchBannerByID, updateBannerStatus } from '../../../controllers/bannerImage/bannerImage';
import ImageModal from '../../widgets/imageModel';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
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
            await loadBannerImage('blogs');
       await  loadBlogs();
    };

    loadData();
    }, []);
    const loadBlogs = async () => {
        try {
            setLoading(true);
            const data = await fetchBlogs();
            setBlogs(data);
        } catch (err) {
            console.log('Failed to fetch data:', err);
        } finally{
            setLoading(false);
        }
    };

    const loadBannerImage = async () => {
        try {
            setLoading(true);
            const bannerData = await fetchBannerByID('blogs');
            // console.log('Type of bannerData:', typeof bannerData);
            // console.log('Content of bannerData:', bannerData);
            
            // // Wrap the object in an array
            // const bannerDataArray = [bannerData];
            // console.log('Wrapped bannerData in an array:', bannerDataArray);
            
            setBannerImage(bannerData);
        } catch (err) {
            console.log('Failed to fetch Banner Image data:', err);
            setError('Failed to fetch Banner Image data');
        } finally{
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const result = await updateBlogsStatus(id, currentStatus);
            if (result.success) {
                console.log('Blogs status updated successfully!');
                loadBlogs();
            } else {
                console.error('Error updating Blogs status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            const result = await deleteBlogs(id);
            if (result.success) {
                alert('Blog deleted successfully');
                setBlogs(prevBlogs => prevBlogs.filter(blogs => blogs.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting Blog:', error);
            alert(`Error: ${error.message}`);
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
                                    <h2>Blogs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addBlogs/add" className="btn btn-success btn-xs mr-2">Add Blogs</Link>
                                        <Link to="/metaDetails/blogs" className="btn btn-success btn-xs mr-2">Meta Details</Link>
                                        <Link to="/bannerImage/blogs" className="btn btn-success btn-xs">Banner Image</Link>
                                        
                                        
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                    {loading && <div className="loading">Loading...</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="row">
                                            <div className="col-lg-12">
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
                                                                    onClick={() => handleShow(`${globals}/uploads/banner_image/desktop/${banner.desktop_image_path}`, banner.alt_tag)}
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
                                                                    onClick={() => handleShow(`${globals}/uploads/banner_image/tablet/${banner.tablet_image_path}`, banner.alt_tag)}
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
                                                                    onClick={() => handleShow(`${globals}/uploads/banner_image/mobile/${banner.mobile_image_path}`, banner.alt_tag)}
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
                                    
                                        <h2 className="mt-4 mb-4">Blogs Data</h2>
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Blog Tags</th>
                                                                <th>Blogs Image</th>
                                                                <th>Blogs Name</th>
                                                                <th>Blogs By</th>
                                                                <th>Blogs Desc</th>
                                                                <th>Blogs Date</th>
                                                                <th>Current Status</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {blogs.map((blog, index) => (
                                                                <tr key={blog.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{blog.blogTags}</td>
                                                                    <td>
                                                                        <img 
                                                                            src={blog.image_path ? `${globals}/uploads/blogs/${blog.image_path}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={blog.blogsImage} 
                                                                            width="50" 
                                                                            height="50" 
                                                                            onClick={() => handleShow(`${globals}/uploads/blogs/${blog.image_path}`)}
                                                                        />
                                                                    </td>
                                                                    <td>{blog.blogName}</td>
                                                                    <td>{blog.blogBy}</td>
                                                                    <td>{blog.content.slice(0, 20)}</td>
                                                                    <td>{blog.blogDate}</td>
                                                                    <td>{blog.status === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(blog.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(blog.id, 0)}>Activate</button>
                                                                                )}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            
                                                                            <li>
                                                                                <Link to={`/addBlogs/${blog.id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this Blog?')) {
                                                                                            handleDeleteBlog(blog.id);
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
