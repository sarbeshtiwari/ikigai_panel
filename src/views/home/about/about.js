import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import Overview from '../../widgets/overview';
import { deleteAboutUs, fetchAboutUs, updateAboutUsOnHomeStatus, updateAboutUsOnTopStatus, updateAboutUsStatus } from '../../../controllers/about/about';

const AboutUs = () => {
    const [abouts, setabouts] = useState([]);

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
       

        loadAboutUs();
    }, []);
    const loadAboutUs = async () => {
        try {
            const AboutUsData = await fetchAboutUs();
            setabouts(AboutUsData);
        } catch (err) {
            console.log('Failed to fetch data:', err);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const result = await updateAboutUsStatus(id, currentStatus);
            if (result.success) {
                console.log('About Us status updated successfully!');
                // setabouts(prevabouts => 
                //     prevabouts.map(abouts =>
                //         abouts.id === id ? { ...abouts, status: currentStatus } : abouts
                //     )
                // );
                loadAboutUs();
            } else {
                console.error('Error updating About Us status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleUpdateOnHomeStatus = async (id, currentStatus) => {
        try {
            // Call the function to update status in the backend
            await updateAboutUsOnHomeStatus(id, currentStatus);

            // Update the local state with the new status
            // setabouts(prevAbouts => 
            //     prevAbouts.map(about => 
            //         about.id === id ? { ...about, on_home: currentStatus } : about
            //     )
            // );
            loadAboutUs();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    
    const handleUpdateOnTopStatus = async (id, currentStatus) => {
        try {
            const result = await updateAboutUsOnTopStatus(id, currentStatus);
            if (result.success) {
                // console.log('About Us On Top status updated successfully!');
                // setabouts(prevabouts => 
                //     prevabouts.map(abouts =>
                //         abouts.id === id ? { ...abouts, on_top: currentStatus } : abouts
                //     )
                // );
                loadAboutUs();
            } else {
                console.error('Error updating About Us status:', result.message);
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
                setabouts(prevabouts => prevabouts.filter(abouts => abouts.id !== id));
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
                                                            <td><div>
                                                                                <button onClick={() => openModal(about)} className="btn btn-success btn-xs">
                                                                                    Overview
                                                                                </button>
                                                                            </div></td>
                                                            <td>
                                                                {about.on_home === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateOnHomeStatus(about.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateOnHomeStatus(about.id, 0)}>Activate</button>
                                                                                )}
                                                                </td>
                                                            <td> {about.on_top === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateOnTopStatus(about.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateOnTopStatus(about.id, 0)}>Activate</button>
                                                                                )}</td>
                                                          
                                                                        <td>
                                                                        
                                                                                {about.status === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(about.id, 1)}>Deactivate</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(about.id, 0)}>Activate</button>
                                                                                )}
                                                                          
                                                                    </td><td>
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
