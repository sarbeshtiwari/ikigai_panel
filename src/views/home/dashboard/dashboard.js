import React, { useState } from 'react';
import Sidebar from '../sidebar';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [date, setDate] = useState(new Date());

    return (
        <>
            <Sidebar />
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h2 className="my-4">Dashboard</h2>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                {loading && <div className="alert alert-info">Loading...</div>}
                                {error && <div className="alert alert-danger">{error}</div>}
                                <p>Welcome to the Dashboard!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h3 className="my-3">500</h3>
                                <i className="fas fa-chart-line fa-3x mb-3"></i>
                                <p>Total Visitors</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h3 className="my-3">50</h3>
                                <i className="fas fa-chart-line fa-3x mb-3"></i>
                                <p>Total Appointments</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h3 className="my-3">6</h3>
                                <i className="fas fa-chart-line fa-3x mb-3"></i>
                                <p>Total Query</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Latest Appointment</h5>
                                        <p>Neha has scheduled an appointment</p>
                                        <p>Rajan has scheduled an appointment</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Latest Query</h5>
                                        <p>Neha has a query</p>
                                        <p>Rajan has a query</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unique Button Section */}
                <div className="row mb-4">
                    <div className="col-md-12 text-center">
                        <button className="btn btn-primary btn-lg btn-custom">Update Header and Footer</button>
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
