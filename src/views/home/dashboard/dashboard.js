// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
// import LineChart from './components/lineCharts'; // Adjust the path if needed
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
            <Sidebar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="my-4">Dashboard</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                {loading && <div className="alert alert-info">Loading...</div>}
                                {error && <div className="alert alert-danger">{error}</div>}
                                <p>Welcome to the Dashboard!</p>

                                <div className="row text-center">
                                    <div className="col-md-3 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <i className="fas fa-chart-line fa-3x"></i>
                                                <h3 className="mt-3">500</h3>
                                                <p>Today's Visitors</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <i className="fas fa-users fa-3x"></i>
                                                <h3 className="mt-3">120</h3>
                                                <p>Total Visitors</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <i className="fas fa-dollar-sign fa-3x"></i>
                                                <h3 className="mt-3">1500</h3>
                                                <p>Appointments</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <i className="fas fa-comments fa-3x"></i>
                                                <h3 className="mt-3">80</h3>
                                                <p>Query</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <LineChart /> */}
                            </div>
                        </div>
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
