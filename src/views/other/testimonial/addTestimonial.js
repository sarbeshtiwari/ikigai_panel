import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../home/sidebar';

export default function AddTestimonial() {
    const navigate = useNavigate();
    const {id } = useParams();

    const [formData, setFormData] = useState({
        meta_title: '',
        meta_key: '',
        meta_desc: '',
        location_type: '',
        location: '',
        state: '',
        priority: '',
        ctcontent: '',
        schema: '',
        content_above_faqs: ''
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        if (id !== 'add') {
            // fetchCityDetails(ids, id)
            //     .then(data => {
            //         if (Array.isArray(data) && data.length > 0) {
            //             const city = data[0];
            //             const specificDataItem = city.data.find(item => item.location_type === id);
            //             if (specificDataItem) {
            //                 setFormData({
            //                     meta_title: specificDataItem.metaTitle || '',
            //                     meta_key: specificDataItem.metaKeyword || '',
            //                     meta_desc: specificDataItem.metaDescription || '',
            //                     location_type: specificDataItem.location_type || '',
            //                     location: city.location || '',
            //                     state: city.state || '',
            //                     priority: city.priority || '',
            //                     ctcontent: specificDataItem.ctcontent || '',
            //                     schema: specificDataItem.schema || '',
            //                     content_above_faqs: specificDataItem.content_above_faqs || ''
            //                 });
            //             } else {
            //                 console.error('Specific data item not found');
            //             }
            //         } else {
            //             console.error('City array is empty or not an array');
            //         }
            //     })
            //     .catch(error => console.error(error));
        }
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { meta_title, meta_key, meta_desc, location_type, location, state, priority, ctcontent, schema, content_above_faqs } = formData;
    
        // Prepare form data
        const dataArray = [{
            location_type: location_type,
            metaTitle: meta_title || ' ',
            metaKeyword: meta_key || ' ',
            metaDescription: meta_desc || ' ',
            ctcontent: ctcontent || ' ',
            schema: schema || ' ',
            content_above_faqs: content_above_faqs || ' ',
            image: image ? image.name : ''  // Add image name or path if needed
        }];
    
        const formDataToSend = new FormData();
        formDataToSend.append('location', location);
        formDataToSend.append('state', state);
        formDataToSend.append('priority', priority || ' ');
        formDataToSend.append('data', JSON.stringify(dataArray));
        if (image) {
            formDataToSend.append('image', image);
        }
    
        try {
            let result;
            if (id === 'add') {
                // result = await addCity(formDataToSend);
            } else {
                // result = await updateCity(ids, id, formDataToSend);
            }
    
            // if (result.success) {
                // alert('City saved successfully');
                navigate(-1);
            // } else {
                // alert(`Failed to save City: ${result.message}`);
            // }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <>
            <div>
                <Sidebar />
                <div>
                    <div className="midde_cont">
                        <div className="container-fluid">
                            <div className="row column_title">
                                <div className="col-md-12">
                                    <div className="page_title">
                                        <h2>{id === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
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
                                            <form onSubmit={handleFormSubmit} id="citiesform" encType="multipart/form-data">
                                                <span className="status text-danger mb-0"></span>
                                                <div className="form-row mb-3">
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Meta Title</label>
                                                        <input type="text" name="meta_title" id="meta_title" value={formData.meta_title} onChange={handleInputChange} className="form-control" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Meta Keywords</label>
                                                        <input type="text" name="meta_key" id="meta_key" value={formData.meta_key} onChange={handleInputChange} className="form-control" />
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Meta Description</label>
                                                        <textarea name="meta_desc" id="meta_desc" value={formData.meta_desc} onChange={handleInputChange} className="form-control" rows="5"></textarea>
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Name</label>
                                                        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="form-control" />
                                                    </div>
                                                   
                                                   
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Image</label>
                                                        <input type="file" name="image" id="image" onChange={handleFileChange} className="form-control" />
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Content</label>
                                                        <textarea name="ctcontent" id="ctcontent" value={formData.ctcontent} onChange={handleInputChange} className="form-control" rows="5"></textarea>
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Schema</label>
                                                        <textarea name="schema" id="schema" value={formData.schema} onChange={handleInputChange} className="form-control" rows="5"></textarea>
                                                    </div>
                                                    
                                                </div>

                                                <div className="form-group margin_0">
                                                    <input type="hidden" name="addcities" id="addcities" value="active" />
                                                    <input type="hidden" name="ct_id" id="ct_id" value="" />
                                                    <button className="main_bt" type="submit">Submit</button>
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
        </>
    );
}
