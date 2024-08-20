import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar';
import { fetchQuery } from '../../../controllers/enquiry/user_query';
import { fetchAppointment } from '../../../controllers/enquiry/appointment';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [queries, setQueries] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [latestQuery, setLatestQuery] = useState(null);
    const [latestAppointment, setLatestAppointment] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const fetchedQueries = await fetchQuery();
                setQueries(fetchedQueries);
                const fetchedAppointments = await fetchAppointment();
                setAppointments(fetchedAppointments);

                // Set latest query and appointment
                if (fetchedQueries.length > 0) {
                    setLatestQuery(fetchedQueries[fetchedQueries.length - 1]);
                }
                if (fetchedAppointments.length > 0) {
                    setLatestAppointment(fetchedAppointments[fetchedAppointments.length - 1]);
                }
            } catch (err) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h2 className="my-4 text-primary">Dashboard</h2>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                {loading && <div className="alert alert-info">Loading...</div>}
                                {error && <div className="alert alert-danger">{error}</div>}
                                <p>Welcome to the Dashboard! Here you can monitor the latest activity and statistics.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card text-center bg-primary text-white">
                            <div className="card-body">
                                <h3 className="my-3">500</h3>
                                <i className="fas fa-users fa-3x mb-3"></i>
                                <p className="text-dark">Total Visitors</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center bg-success text-white">
                            <div className="card-body">
                                <h3 className="my-3">{appointments.length}</h3>
                                <i className="fas fa-calendar-check fa-3x mb-3"></i>
                                <p className="text-dark">Total Appointments</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center bg-info text-white">
                            <div className="card-body">
                                <h3 className="my-3">{queries.length}</h3>
                                <i className="fas fa-question-circle fa-3x mb-3"></i>
                                <p className="text-dark">Total Queries</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Latest Appointment</h5>
                                {latestAppointment ? (
                                    <p>{latestAppointment.name} has booked an appointment.</p>
                                ) : (
                                    <p>No recent appointments</p>
                                )}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/appointment')}
                                >
                                    Explore More Appointments
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Latest Query</h5>
                                {latestQuery ? (
                                    <p>{latestQuery.name} has a query.</p>
                                ) : (
                                    <p>No recent queries</p>
                                )}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/userQuery')}
                                >
                                    Explore More Queries
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button to update header and footer */}
                <div className="row mb-4">
                    <div className="col-md-12 text-center">
                        <button
                            className="btn btn-warning btn-lg"
                            onClick={() => navigate('/headerFooter')}
                        >
                            Update Header and Footer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;






















// import React, { useState, useEffect } from 'react';
// import Sidebar from '../sidebar';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

   

//     return (
//         <>
       
//             <Sidebar />
             
//                 <div className="midde_cont">
//                     <div className="container-fluid">
//                         <div className="row column_title">
//                             <div className="col-md-12">
//                                 <div className="page_title">
//                                     <h2>Dashboard</h2>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row column1">
//                             <div className="col-md-12">
//                                 <div className="white_shd full margin_bottom_30">
                                    
//                                     <div className="full price_table padding_infor_info">
//                                         {loading && <div className="loading">Loading...</div>}
//                                         {error && <div className="alert alert-danger">{error}</div>}
                                       
//                                         <p>Welcome to the Dashboard!</p>
//                                         <div key= '' className="col-md-6 col-lg-3">
                                        
//                                                     </div>
                                
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
               
//  </div>
//         </>
//     );
// };

// export default Dashboard;
