import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import ReactQuill from 'react-quill';
import useTeamForm from './ourTeam_form';

const AddOurTeam = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        formData,
        editorHtml,
        statusMessage,
        validationErrors,
        handleInputChange,
        handleEditorChange,
        handleSubmit,
        loading,
        imagePreview // Include imagePreview
    } = useTeamForm(id);

    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{id === 'add' ? 'Add' : 'Edit'} Our Team</h2>
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
                                                    <label className="label_field">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.name && (
                                                        <div className="invalid-feedback">{validationErrors.name}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Designation</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        className={`form-control ${validationErrors.designation ? 'is-invalid' : ''}`}
                                                        value={formData.designation}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.designation && (
                                                        <div className="invalid-feedback">{validationErrors.designation}</div>
                                                    )}
                                                </div>
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
                                                        className={`form-control ${validationErrors.image ? 'is-invalid' : ''}`}
                                                        onChange={handleInputChange}
                                                    />
                                                    {imagePreview && <img src={imagePreview} alt="Current" style={{ width: '100px', height: '100px' }} />}
                                                    {validationErrors.image && (
                                                        <div className="invalid-feedback">{validationErrors.image}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Description</label>
                                                    <ReactQuill
                                                        value={editorHtml}
                                                        onChange={handleEditorChange}
                                                        modules={AddOurTeam.modules}
                                                        formats={AddOurTeam.formats}
                                                        style={{ height: '300px', marginBottom: '100px' }}
                                                    />
                                                    {validationErrors.description && (
                                                        <div className="invalid-feedback d-block">{validationErrors.description}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                <button 
                                                    className="main_bt" 
                                                    type="submit" 
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Submitting...' : (id === 'add' ? 'Submit' : 'Update')}
                                                </button>
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

AddOurTeam.modules = {
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
        [{ 'emoji': [] }],  // Note: Quill does not support emoji out-of-the-box; this would require custom implementation or a plugin
    ],
};

AddOurTeam.formats = [
    'header', 'font', 'size',
    'list', 'bullet', 'indent', 'align',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'color', 'background',
    'link', 'image', 'video',
    'clean', 'script', 'direction', 'emoji',
];

export default AddOurTeam;
