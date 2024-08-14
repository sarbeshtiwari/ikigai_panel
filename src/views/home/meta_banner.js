import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';

const MetaBanner = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
       
            <Sidebar />
             
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Meta Details</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                  
                                    <div className="full price_table padding_infor_info">
                                        {loading && <div className="loading">Loading...</div>}
                                        {error && <div className="alert alert-danger">{error}</div>}
                                       
                                        <p>Welcome to the Meta Details!</p>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/home">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">Home</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/about">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">About</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/service">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">Our Service</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/ourTeam">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">Our team</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/blogs">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">Blogs</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/faq">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">FAQs</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/ourSpecilities">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">Our Specilities</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <Link to="/metaDetails/testimonial">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <i className="fa fa-image blue1_color"></i>
                                                            </div>
                                                            <div className="counter_no">
                                                                <p className="head_couter">Testimonial</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            
                                            </div>
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

export default MetaBanner;
