import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import { deleteOurTeam, fetchOurTeam, updateOurTeamStatus } from '../../../controllers/ourTeam/ourTeam';
import Overview from '../../widgets/overview';
import { deleteBanner, fetchBannerByID, updateBannerStatus } from '../../../controllers/bannerImage/bannerImage';
import { globals } from '../../../controllers/home_banner/home_banner';

const OurTeam = () => {
    const [team, setTeams] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (team) => {
        setSelectedDetail(team);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const loadData = async () => {

        await loadOurTeam();
        await loadBannerImage('ourTeam');
        }
        loadData();
    }, []);
    const loadOurTeam = async () => {
        try {
            setLoading(true);
            const OurTeamData = await fetchOurTeam();
            setTeams(OurTeamData);
        } catch (err) {
            
            console.log('Failed to fetch data:', err);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const loadBannerImage = async () => {
        try {
            setLoading(true);
            const bannerData = await fetchBannerByID('ourTeam');
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

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const result = await updateOurTeamStatus(id, currentStatus);
            if (result.success) {
                console.log('team Us status updated successfully!');
                // setTeams(prevteam => 
                //     prevteam.map(team =>
                //         team.id === id ? { ...team, status: currentStatus } : team
                //     )
                // );
                loadOurTeam();
            } else {
                console.error('Error updating team Us status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteTeam = async (id) => {
        try {
            const result = await deleteOurTeam(id);
            if (result.success) {
                alert('team Us deleted successfully');
                setTeams(prevteam => prevteam.filter(team => team.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting team Us:', error);
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
       
            <Sidebar />
          
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Our Team</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                <div className="full graph_head">
                                    <Link to="/addOurTeam/add" className="btn btn-success btn-xs mr-2">
                                        Add Our Team
                                    </Link>
                                    <Link to="/metaDetails/ourTeam" className="btn btn-success btn-xs mr-2">
                                        Meta Details
                                    </Link>
                                    <Link to="/bannerImage/ourTeam" className="btn btn-success btn-xs">Banner Image</Link>
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
                                    
                                        <h2 className="mt-4 mb-4">Our Team Data</h2>
                                        <div className="table-responsive-sm">
                                            <table id="subct" className="table table-striped projects">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Name</th>
                                                        <th>Designation</th>
                                                        <th>Description</th>
                                                        <th>Current Status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {team.map((team, index) => (
                                                        <tr key={team.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{team.name}</td>
                                                            <td>{team.designation}</td>
                                                            <td><div>
                                                                                <button onClick={() => openModal(team)} className="btn btn-success btn-xs">
                                                                                    Overview
                                                                                </button>
                                                                            </div></td>
                                                                            <td>
                                                                        
                                                                        {team.status === 0 ? (
                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(team.id, 1)}>Deactivate</button>
                                                                        ) : (
                                                                            <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(team.id, 0)}>Activate</button>
                                                                        )}
                                                                  
                                                            </td>
                                                          
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    
                                                                    <li>
                                                                        <Link to={`/addOurTeam/${team.id}`} className="btn btn-primary btn-xs">
                                                                            <i className="fa fa-edit"></i>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => handleDeleteTeam(team.id)}
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

export default OurTeam;
