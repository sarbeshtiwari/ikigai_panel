import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/logo.png';
import { fetchHomeBanner, updateHomeBannerStatus, deleteHomeBanner, globals } from '../../../controllers/home_banner/home_banner';

export default function HomeBanner() {
    const [homeBanner, setHomeBanner] = useState([]);

    useEffect(() => {
        const loadHomeBanner = async () => {
            try {
                const homeBannerData = await fetchHomeBanner();
                setHomeBanner(homeBannerData);
            } catch (err) {
                console.log('Failed to fetch data:', err);
            }
        };

        loadHomeBanner();
    }, []);

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const result = await updateHomeBannerStatus(id, currentStatus);
            if (result.success) {
                console.log('Home banner status updated successfully!');
                setHomeBanner(prevHomeBanner => 
                    prevHomeBanner.map(homeBanner =>
                        homeBanner.id === id ? { ...homeBanner, status: currentStatus } : homeBanner
                    )
                );
            } else {
                console.error('Error updating home banner status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteHomeBanner = async (id) => {
        try {
            const result = await deleteHomeBanner(id);
            if (result.success) {
            
                setHomeBanner(prevHomeBanner => prevHomeBanner.filter(homeBanner => homeBanner.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting home banner:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Home Banner</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addHomeBanner/add" className="btn btn-success btn-xs mr-2">Add Home Banner</Link>
                                       
                                        
                                        <Link to="/metaDetails/home" className="btn btn-success btn-xs">Meta Details</Link>
                                        </div>
                                    
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                
                                                                <th>Image Desktop</th>
                                                                <th>Image Tablet</th>
                                                                <th>Image Mobile</th>

                                                                {/* <th>Alt Tag</th> */}
                                                                <th>Current Status</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {homeBanner.map((banner, index) => (
                                                                <tr key={banner.id}>
                                                                    <td>{index + 1}</td>
                                                                   
                                                                    <td>
                                                                        <img 
                                                                            src={banner.desktop_image_path ? `http://localhost:2000/uploads/home_banner/desktop/${banner.desktop_image_path}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={banner.alt_tag} 
                                                                            width="50" 
                                                                            height="50" 
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <img 
                                                                            src={banner.tablet_image_path ? `http://localhost:2000/uploads/home_banner/tablet/${banner.tablet_image_path}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={banner.alt_tag} 
                                                                            width="50" 
                                                                            height="50" 
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <img 
                                                                            src={banner.mobile_image_path ? `http://localhost:2000/uploads/home_banner/mobile/${banner.mobile_image_path}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={banner.alt_tag} 
                                                                            width="50" 
                                                                            height="50" 
                                                                        />
                                                                    </td>
                                                                    {/* <td>{banner.alt_tag_desktop}</td> */}
                                                                    <td>
                                                                        
                                                                          
                                                                                {banner.status === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(banner.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(banner.id, 0)}>Activate</button>
                                                                                )}
                                                                          
                                                                       
                                                                    </td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-center">
                                                                            {/* <li>
                                                                                <Link to={`/addHomeBanner/${banner.id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li> */}
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this home banner?')) {
                                                                                            handleDeleteHomeBanner(banner.id);
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
    );
}
