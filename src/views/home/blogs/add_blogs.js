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
        image: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (id !== 'add') {
            fetchBlogsByID(id)
                .then(data => {
                    // Set form data and image
                    setFormData({
                        blogName: data.blogName,
                        blogBy: data.blogBy,
                        blogDate: data.blogDate,
                        blogTags: data.blogTags,
                        blogLink: data.blogLink || '', // Handle empty blogLink
                        alt_tag: data.alt_tag,
                        content: data.content,
                        schema_data: data.schema_data || '', // Handle empty schema_data
                    });
                    setImage(null); // Optionally reset image if needed
                })
                .catch(console.error);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
            setImage(files[0]); // Set the image file
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formDataToSend = new FormData();
        formDataToSend.append('blogName', formData.blogName || '');
        formDataToSend.append('blogBy', formData.blogBy || '');
        formDataToSend.append('blogDate', formData.blogDate || '');
        formDataToSend.append('blogTags', formData.blogTags || '');
        formDataToSend.append('blogLink', formData.blogLink || '');
        formDataToSend.append('alt_tag', formData.alt_tag || '');
        formDataToSend.append('content', formData.content || '');
        formDataToSend.append('schema_data', formData.schema_data || '');
        if (image) {
            formDataToSend.append('image', image);
        }
      
        try {
            console.log(formData)
            console.log(formDataToSend)
    
            await saveBlogs(id, formDataToSend);
            alert('Blog saved successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Failed to save blog: ${error.message}`);
        }
    };
    
    
    
      

    const getImagePreviewUrl = () => {
        return image ? URL.createObjectURL(image) : ''; // Show preview for the selected image
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
                                        <form onSubmit={handleSubmit} id="add_blogs" encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Blog Name</label>
                                                    <input
                                                        type="text"
                                                        name="blogName"
                                                        value={formData.blogName}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog By</label>
                                                    <input
                                                        type="text"
                                                        name="blogBy"
                                                        value={formData.blogBy}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog Date</label>
                                                    <input
                                                        type="date"
                                                        name="blogDate"
                                                        value={formData.blogDate}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        required
                                                    />
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
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        required
                                                    />
                                                    {image && (
                                                        <img
                                                            src={getImagePreviewUrl()}
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
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Content</label>
                                                    <textarea
                                                        rows={'6'}
                                                        name="content"
                                                        value={formData.content}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Schema</label>
                                                    <textarea
                                                        rows={'6'}
                                                        name="schema_data"
                                                        value={formData.schema_data}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="form-group margin_0">
                                                <button className="main_bt" type="submit">
                                                    {id === 'add' ? 'Submit' : 'Update'}
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
}
