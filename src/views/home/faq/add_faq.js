import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddFAQ = () => {
    const { id } = useParams();
    const [faqType, setFaqType] = useState('');
    const [headings, setHeadings] = useState([{ faqQuestion: '', faqAnswer: '' }]);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchFAQData(id);
        }
    }, [id]);

    const fetchFAQData = async (id) => {
        try {
            const response = await axios.get(`https://ikigai-panel-api.onrender.com/faq/getFaqById/${id}`);
            const data = response.data;
    
            if (data.success && data.data) {
                setHeadings([data.data]);
            } else {
                console.error('Unexpected data format:', data);
                setHeadings([{ faqQuestion: '', faqAnswer: '' }]);
            }
        } catch (error) {
            console.error('Error fetching FAQ:', error);
            setHeadings([{ faqQuestion: '', faqAnswer: '' }]);
        }
    };

    const addMoreFields = () => {
        setHeadings([...headings, { faqQuestion: '', faqAnswer: '' }]);
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

    const validateForm = () => {
        const errors = {};
        headings.forEach((heading, index) => {
            if (!heading.faqQuestion.trim()) {
                errors[`faqQuestion${index}`] = 'Question is required';
            }
            if (!heading.faqAnswer.trim()) {
                errors[`faqAnswer${index}`] = 'Answer is required';
            }
        });
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        console.log('Submitting data:', headings);
        const dataToSend = id !== 'add' ? headings[0] : headings;
        try {
            const apiEndpoint = id !== 'add' ? `https://ikigai-panel-api.onrender.com/faq/updateFaq/${id}` : 'https://ikigai-panel-api.onrender.com/faq/addFaq';
            const method = id !== 'add' ? 'put' : 'post';
            const response = await axios({
                method,
                url: apiEndpoint,
                data: dataToSend
            });
            if (response.status === 200 || response.status === 201) {
                alert('Data saved successfully');
                navigate(-1);
            } else {
                alert(`Failed to save data: ${response.data.message}`);
            }
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
                                            <div className="more_fields_container">
                                                {headings.map((heading, index) => (
                                                    <div className="clone_fields" key={index}>
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
                                                                {validationErrors[`faqQuestion${index}`] && (
                                                                    <div className="text-danger">{validationErrors[`faqQuestion${index}`]}</div>
                                                                )}
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
                                                                {validationErrors[`faqAnswer${index}`] && (
                                                                    <div className="text-danger">{validationErrors[`faqAnswer${index}`]}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {headings.length > 1 && (
                                                            <div className="col-md-12 mt-2">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => removeField(index)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {id === 'add' ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mb-3 mt-3"
                                                    onClick={addMoreFields}
                                                >
                                                    Add More
                                                </button>
                                            ) : ('')}
                                            
                                            <div className="form-group margin_0">
                                                <button type="submit" className="main_bt mt-2">Submit</button>
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
