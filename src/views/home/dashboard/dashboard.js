import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     loadabouts();
    // }, []);

    // const loadabouts = async () => {
    //     setLoading(true);
    //     try {
    //         const aboutData = await fetchabouts();
    //         setabouts(aboutData);
    //     } catch (error) {
    //         setError(error.message);
    //         console.error('Error fetching abouts:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <>
       
            <Sidebar />
             
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Dashboard</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    {/* <div className="full graph_head">
                                        <Link to="/addAboutUs/add" className="btn btn-success btn-xs">Add About Us</Link>
                                    </div> */}
                                    <div className="full price_table padding_infor_info">
                                        {loading && <div className="loading">Loading...</div>}
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {/* <div className="table-responsive-sm">
                                            <table id="subct" className="table table-striped projects">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Heading</th>
                                                        <th>Content</th>
                                                        <th>On Home</th>
                                                        <th>On Top </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {abouts.map((about, index) => (
                                                        <tr key={about._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{about.heading}</td>
                                                            <td><button
                                                                            className={`btn btn-xs btn-primary`}
                                                                            onClick={() => ''}
                                                                        >
                                                                            View
                                                                        </button></td>
                                                            <td><button
                                                                            className={`btn btn-xs ${about.onHome === false ? 'btn-warning' : 'btn-success'}`}
                                                                            onClick={() => ''}
                                                                        >
                                                                            {about.onHome === false ? 'Deactive' : 'Active'}
                                                                        </button></td>
                                                            <td><button
                                                                            className={`btn btn-xs ${about.onTop === false ? 'btn-warning' : 'btn-success'}`}
                                                                            onClick={() => ''}
                                                                        >
                                                                            {about.onTop === false ? 'Deactive' : 'Active'}
                                                                        </button></td>
                                                          
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    <li>
                                                                        <button
                                                                            className={`btn btn-xs ${about.status === false ? 'btn-warning' : 'btn-success'}`}
                                                                            onClick={() => handleUpdateStatus(about._id, !about.status)}
                                                                        >
                                                                            {about.status === false ? 'Deactive' : 'Active'}
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/addAboutUs/${about._id}`} className="btn btn-primary btn-xs">
                                                                            <i className="fa fa-edit"></i>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => handleDeleteabout(about._id)}
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
                                        </div> */}
                                        <p>Welcome to the Dashboard!</p>
                                        <div key= '' className="col-md-6 col-lg-3">
                                        {/* <Link to={`/homeBanner`}>
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                            <div>
                                                                
                                                               <i className="fa fa-image blue1_color"></i>
                                                           
                                                                
                                                            
                                                                </div>

                                                            </div>
                                                            <div className="counter_no">
                                                                <div>
                                                                    <p className="total_no">{10}</p>
                                                                    <p className="head_couter">Home Banner</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link> */}
                                                    </div>
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
 </div>
        </>
    );
};

export default Dashboard;
