import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import ReactQuill from 'react-quill';
import useServicesForm from './ourServices_form';

const AddOurServices = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        formData,
        editorHtml,
        statusMessage,
        handleInputChange,
        handleEditorChange,
        handleSubmit
    } = useServicesForm(id);


    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{id === 'add' ? 'Add' : 'Edit'} Our Services</h2>
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
                                        <span className="status text-danger">{statusMessage}</span>
                                        <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                                            <div className="form-row">
                                               
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Heading</label>
                                                    <input
                                                        type="text"
                                                        name="heading"
                                                        className="form-control"
                                                        value={formData.heading}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Image</label>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        className="form-control"
                                                        
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Home Data</label>
                                                    <input
                                                        type="text"
                                                        name="home_data"
                                                        className="form-control"
                                                        value={formData.home_data}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Home Icon</label>
                                                    <input
                                                        type="file"
                                                        name="home_image"
                                                        className="form-control"
                                                        // value={formData.home_icon}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Description</label>
                                                    <ReactQuill
                                                        value={editorHtml}
                                                        onChange={handleEditorChange}
                                                        modules={AddOurServices.modules}
                                                        formats={AddOurServices.formats}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                
                                                <button className="main_bt" type="submit">{id === 'add' ? 'Submit' : 'Update'}</button>
                                            </div>
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

AddOurServices.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'header': '5' }, { 'header': '6' }],
        [{ 'font': [] }],
        [{ 'size': ['small', 'medium', 'large', 'huge'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'direction': 'rtl' }],
        [{ 'emoji': [] }],
    ],
};

AddOurServices.formats = [
    'header', 'font', 'size',
    'list', 'bullet', 'indent', 'align',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'color', 'background',
    'link', 'image', 'video',
    'clean', 'script', 'direction', 'emoji',
];

export default AddOurServices;
