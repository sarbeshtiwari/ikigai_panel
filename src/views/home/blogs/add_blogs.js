import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import { fetchBlogsByID, saveBlogs } from '../../../controllers/blog/blog';

export default function AddBlogs() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        blogName: '',
        blogBy: '',
        blogDate: '',
        blogTags: '',
        blogLink: '',
        alt_tag: '',
        content: '',
        schema_data: '',
    });
    const [file, setFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [errors, setErrors] = useState({});
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id !== 'add') {
            fetchBlogsByID(id)
                .then(data => {
                    setFormData({
                        blogName: data.blogName,
                        blogBy: data.blogBy,
                        blogDate: data.blogDate,
                        blogTags: data.blogTags,
                        blogLink: data.blogLink || '',
                        alt_tag: data.alt_tag,
                        content: data.content,
                        schema_data: data.schema_data || '',
                    });
                    setFile(null);
                    setPreviewURL(null);
                })
                .catch(console.error);
        }
    }, [id]);

    const validateForm = () => {
        const formErrors = {};
        if (!formData.blogName.trim()) formErrors.blogName = 'Blog Name cannot be empty.';
        if (!formData.blogBy.trim()) formErrors.blogBy = 'Blog By cannot be empty.';
        if (!formData.blogDate.trim()) formErrors.blogDate = 'Blog Date cannot be empty.';
        if (!formData.content.trim()) formErrors.content = 'Content cannot be empty.';
        if (!formData.alt_tag.trim()) formErrors.alt_tag = 'Alt Tag cannot be empty.';
        if (!file) formErrors.file = 'Image cannot be empty.';

        setErrors(formErrors);
        return formErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arr = (new Uint8Array(reader.result)).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }

                let fileType = "";
                switch (header) {
                    case "89504e47":
                        fileType = "image/png";
                        break;
                    case "52494646":
                        fileType = "image/webp";
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                    case "ffd8ffe3":
                    case "ffd8ffe8":
                        fileType = "image/jpeg";
                        break;
                    default:
                        fileType = "unknown";
                        break;
                }

                const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
                if (!allowedTypes.includes(fileType)) {
                    setErrors(prevErrors => ({ ...prevErrors, file: "Only JPG, JPEG, WEBP, and PNG formats are allowed." }));
                    setFile(null);
                    setPreviewURL(null);
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, file: null }));
                    setFile(selectedFile);
                    const previewReader = new FileReader();
                    previewReader.onloadend = () => {
                        setPreviewURL(previewReader.result);
                    };
                    previewReader.readAsDataURL(selectedFile);
                }
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('blogName', formData.blogName || ' ');
        formDataToSend.append('blogBy', formData.blogBy || ' ');
        formDataToSend.append('blogDate', formData.blogDate || ' ');
        formDataToSend.append('blogTags', formData.blogTags || ' ');
        formDataToSend.append('blogLink', formData.blogLink || '');
        formDataToSend.append('alt_tag', formData.alt_tag || ' ');
        formDataToSend.append('content', formData.content || ' ');
        formDataToSend.append('schema_data', formData.schema_data || '');
        if (file) {
            formDataToSend.append('image', file);
        }

        setIsSubmitting(true);

        try {
            await saveBlogs(id, formDataToSend);
            alert('Blog saved successfully');
            navigate(-1);
        } catch (error) {
            setStatusMessage(`Failed to save blog: ${error.message}`);
        } finally {
            setIsSubmitting(false);
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
                                    <h2>{id === 'add' ? 'Add Blog' : 'Edit Blog'}</h2>
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
                                        <form onSubmit={handleSubmit} id="add_blogs" encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Blog Name</label>
                                                    <input
                                                        type="text"
                                                        name="blogName"
                                                        value={formData.blogName}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${errors.blogName ? 'is-invalid' : ''}`}
                                                        required
                                                    />
                                                    {errors.blogName && (
                                                        <div className="invalid-feedback">{errors.blogName}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog By</label>
                                                    <input
                                                        type="text"
                                                        name="blogBy"
                                                        value={formData.blogBy}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${errors.blogBy ? 'is-invalid' : ''}`}
                                                        required
                                                    />
                                                    {errors.blogBy && (
                                                        <div className="invalid-feedback">{errors.blogBy}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog Date</label>
                                                    <input
                                                        type="date"
                                                        name="blogDate"
                                                        value={formData.blogDate}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${errors.blogDate ? 'is-invalid' : ''}`}
                                                        required
                                                    />
                                                    {errors.blogDate && (
                                                        <div className="invalid-feedback">{errors.blogDate}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog Tags</label>
                                                    <input
                                                        type='text'
                                                        name="blogTags"
                                                        value={formData.blogTags}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog Link</label>
                                                    <input
                                                        type="text"
                                                        name="blogLink"
                                                        value={formData.blogLink}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog Image</label>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        onChange={handleFileChange}
                                                        className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                                                        required
                                                    />
                                                    {errors.file && (
                                                        <div className="invalid-feedback">{errors.file}</div>
                                                    )}
                                                    {previewURL && (
                                                        <img
                                                            src={previewURL}
                                                            alt="Blog Image"
                                                            className="img-thumbnail mt-2"
                                                            width="120"
                                                            height="70"
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Alt Tag</label>
                                                    <input
                                                        type="text"
                                                        name="alt_tag"
                                                        value={formData.alt_tag}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${errors.alt_tag ? 'is-invalid' : ''}`}
                                                        required
                                                    />
                                                    {errors.alt_tag && (
                                                        <div className="invalid-feedback">{errors.alt_tag}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Content</label>
                                                    <textarea
                                                        name="content"
                                                        value={formData.content}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                                        rows="5"
                                                        required
                                                    />
                                                    {errors.content && (
                                                        <div className="invalid-feedback">{errors.content}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Schema Data</label>
                                                    <textarea
                                                        name="schema_data"
                                                        value={formData.schema_data}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        rows="5"
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                <button
                                                    type="submit"
                                                    className="main_bt"
                                                    disabled={isSubmitting}
                                                >
                                                    {id === 'add' 
                                                        ? (isSubmitting ? 'Submitting...' : 'Submit') 
                                                        : (isSubmitting ? 'Updating...' : 'Update')}
                                                </button>

                                                </div>
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
}
