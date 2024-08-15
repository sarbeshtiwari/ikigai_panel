import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import { deleteFaq, fetchFaq, updateFaqStatus } from '../../../controllers/faq/faq';

export default function FAQ() {
    const [faq, setFAQ] = useState([]);

    useEffect(() => {
        
            fetchFAQsData();
       
    }, []);

    const fetchFAQsData = async () => {
        try {
            const faqs = await fetchFaq();
            setFAQ(faqs);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateFaqStatus(id, status);
            fetchFAQsData();  // Refresh FAQs after update
        } catch (error) {
            console.error('Error updating FAQ status:', error);
        }
    };

    const handleDeleteFAQ = async (id) => {
        try {
            await deleteFaq(id);
            fetchFAQsData();  // Refresh FAQs after delete
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    };

    return (
        <div >
            <Sidebar />
            <div >
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2> FAQs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to={`/addFAQ/add`} className="btn btn-success btn-xs mr-2">Add FAQs</Link>
                                        <Link to="/metaDetails/faq" className="btn btn-success btn-xs mr-2">Meta Details</Link>
                                        <Link to="/bannerImage/about" className="btn btn-success btn-xs">Banner Image</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                    <div id="subct_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="table-responsive">
                                            <table className="table table-striped projects dataTable no-footer">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Question</th>
                                                        <th>Answers</th>
                                                        <th>Current Status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {faq.map((item, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                            <td className="sorting_1">{index + 1}</td>
                                                            <td>{item.faqQuestion}</td>
                                                            <td>{item.faqAnswer}</td>
                                                            <td>
                                                            {item.status === 0 ? (
                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(item.id, 1)}>Deactive</button>
                                                                        ) : (
                                                                            <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(item.id, 0)}>Active</button>
                                                                        )}
                                                            </td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    
                                                                    <li>
                                                                        <Link to={`/addFAQ/${item.id}`} className="btn btn-primary btn-xs">
                                                                            <i className="fa fa-edit"></i>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to delete this FAQ?')) {
                                                                                    handleDeleteFAQ(item.id);
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
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
