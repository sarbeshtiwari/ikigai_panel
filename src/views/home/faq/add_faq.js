import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';


const AddFAQ = () => {
    const { id } = useParams();
    const [faqType, setFaqType] = useState('');
    const [headings, setHeadings] = useState([{ faqQuestion: '', faqAnswer: ''}]);
    const navigate = useNavigate();

    useEffect(() => {
        // if (id !== 'add') {
        //     fetchFAQData(id);
        // }
    }, [id]);

    const fetchFAQData = async (faqId) => {
        // try {
        //     const data = await fetchFAQ(faqId);
        //     if (data.length === 0) {
        //         setHeadings([{  faqQuestion: '', faqAnswer: ''}]);
        //     } else {
        //         setFaqType(data[0].faqType || '');
        //         setHeadings(data);
        //     }
        // } catch (error) {
        //     console.error('Error fetching FAQ:', error);
        //     setHeadings([{ faqQuestion: '', faqAnswer: ''}]);
        // }
    };

    const addMoreFields = () => {
        setHeadings([...headings, { faqQuestion: '', faqAnswer: ''}]);
    };

    const removeField = (index) => {
        if (headings.length > 1) {
            const updatedHeadings = [...headings];
            updatedHeadings.splice(index, 1);
            setHeadings(updatedHeadings);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedHeadings = [...headings];
        updatedHeadings[index] = {
            ...updatedHeadings[index],
            [name]: value
        };
        setHeadings(updatedHeadings);
    };

    // const handleFaqTypeChange = (e) => {
    //     const { value } = e.target;
    //     setFaqType(value);
    //     const updatedHeadings = headings.map(heading => ({
    //         ...heading,
    //         faqType: value
    //     }));
    //     setHeadings(updatedHeadings);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (id !== 'add') {
                // response = await updateFAQ(id, headings);
            } else {
                // response = await addFAQ(headings);
            }
            // if (response && response.data) {
                // const result = response.data;
                // if (result.success) {
                    // alert('Data saved successfully');
                    navigate(-1);
                // } else {
                    // alert(`Failed to save data: ${result.message}`);
                // }
            // } else {
                // throw new Error('No response data');
            // }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving data. Please check the console for more details.');
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
                                    <h2>{id === 'add' ? 'Add FAQs' : 'Edit FAQs'}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                    <button 
                                    className="btn btn-primary btn-xs float-right"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <span className="status text-danger"></span>
                                        <form onSubmit={handleSubmit} id="gallerImage" encType="multipart/form-data">
                                            {/* <div className="form-row">
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">FAQs Type</label>
                                                    <select
                                                        name="faqType"
                                                        value={faqType}
                                                        onChange={handleFaqTypeChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="residential">Residential</option>
                                                        <option value="flat">Flat</option>
                                                        <option value="New">New</option>
                                                        <option value="apartment">Apartment</option>
                                                        <option value="commercial">Commercial</option>
                                                        <option value="studio">Studio</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            <div className="more_fields_container">
                                                {headings.map((heading, index) => (
                                                    <div className="clone_fields" key={index}>
                                                        <div className="col-md-6 form-group remove">
                                                            {headings.length > 1 && (
                                                                <span onClick={() => removeField(index)}>
                                                                    <i className="fa fa-times red_color" aria-hidden="true"></i>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Question</label>
                                                                <input
                                                                    type="text"
                                                                    name="faqQuestion"
                                                                    value={heading.faqQuestion}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Answer</label>
                                                                <input
                                                                    type="text"
                                                                    name="faqAnswer"
                                                                    value={heading.faqAnswer}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <span onClick={addMoreFields} className="col-md-12 form-group add-more-link">Add More</span>
                                            <div className="form-group margin_0">
                                                
                                                <button type="submit" className="main_bt">Submit</button>
                                            </div>
                                            <span id="result" className="text-danger mt-4 d-block"></span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFAQ;
