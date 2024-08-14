import Sidebar from '../home/sidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMetaDetailsByID, saveMetaDetails } from '../../controllers/metaDetails/metaDetails';

export default function MetaDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        pageType: id,
       
    });

  

    useEffect(() => {
        fetchMetaDetailsByID(id)
            .then(data => {
                // Ensure data matches the formData structure
                setFormData({
                    meta_title: data.meta_title || '',
                    meta_keyword: data.meta_keyword || '',
                    meta_description: data.meta_description || '',
                    pageType: id
                });
            })
            .catch(console.error);
    }, [id]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log(formData); // Check if formData is logged correctly
            await saveMetaDetails(id, formData);
            alert('Meta info saved successfully');
            navigate(-1);
        } catch (error) {
            alert(`Failed to save meta info: ${error.message}`);
        }
    };
    

    return (
        <>
        <Sidebar />
        <div>
            <div className="midde_cont">
                <div className="container-fluid">
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <h2>{`${id} Meta Details`}</h2>
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
                                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                                        <span className="status text-danger mb-0"></span>
                                        <div className="form-row mb-3">
                                            <div className="col-md-6 form-group">
                                                <label className="label_field">Meta Title</label>
                                                <input
                                                    type="text"
                                                    name="meta_title"
                                                    id="meta_title"
                                                    value={formData.meta_title}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label className="label_field">Meta Keywords</label>
                                                <input
                                                    type="text"
                                                    name="meta_keyword"
                                                    id="meta_keyword"
                                                    value={formData.meta_keyword}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label className="label_field">Meta Description</label>
                                                <textarea
                                                    name="meta_description"
                                                    id="meta_description"
                                                    value={formData.meta_description}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    rows="5"
                                                ></textarea>
                                            </div>
                                            
                                        </div>
                                        <div className="form-group margin_0">
                                            <input type="hidden" name="addcities" id="addcities" value="active" />
                                            <button className="main_bt" type="submit">
                                               {(formData.meta_title === '' && formData.meta_keyword === '' && formData.meta_description === '') ?  'Submit' : 'Update'}</button>
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
    </>
    );
}
