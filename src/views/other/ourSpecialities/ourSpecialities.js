import React, { useState, useEffect } from 'react';
import Sidebar from '../../home/sidebar';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/logo.png';
import { deleteOurSpeciality, fetchOurSpeciality, updateOurSpecialityStatus } from '../../../controllers/ourSpecialities/ourSpecialities';
import { globals } from '../../../controllers/home_banner/home_banner';

export default function Specialities() {
    const [specialities, setSpecialities] = useState([]);

    useEffect(() => {
        loadspecialities();
    }, []);

    const loadspecialities = async () => {
        try {
            const specialitieData = await fetchOurSpeciality();
            setSpecialities(specialitieData);
        } catch (err) {
            console.log('Failed to fetch data');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateOurSpecialityStatus(id, status);
            if (response.success) {
                console.log('specialitie status updated successfully!');
        //         setSpecialities(prevspecialities => prevspecialities.map(specialitie => specialitie._id === id ? { ...specialitie, status } : specialitie));
            loadspecialities();
            } else {
                console.error('Error updating specialitie status:', response.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteSpeciality = async (id) => {
        try {
            const result = await deleteOurSpeciality(id);
            if (result.success) {
                alert('Speciality deleted successfully');
                setSpecialities(prevspecialities => prevspecialities.filter(specialities => specialities.id !== id));
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting Speciality:', error);
            alert(`Error: ${error.message}`);
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
                                    <h2>Specialities</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addSpecialities/add" className="btn btn-success btn-xs mr-2">Add Speciality</Link>
                                        <Link to="/metaDetails/ourSpecilities" className="btn btn-success btn-xs mr-2">Meta Details</Link>
                                        <Link to="/bannerImage/ourSpecilities" className="btn btn-success btn-xs">Banner Image</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Heading</th>
                                                                <th>Image</th>
                                                                <th>Content</th>
                                                                <th>Current Status</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {specialities.map((speciality, index) => (
                                                                <tr key={speciality.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{speciality.heading}</td>
                                                                    <td>
                                                                        <img 
                                                                            src={speciality.image_path ? `${globals}/uploads/our_specialities/${speciality.image_path}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={speciality.image} 
                                                                            width="50" 
                                                                            height="50" 
                                                                        />
                                                                    </td>
                                                                    <td>{speciality.content.slice(0, 20)}</td>
                                                                    <td>
                                                                                {speciality.status === 0 ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(speciality.id, 1)}>Deactive</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(speciality.id, 0)}>Active</button>
                                                                                )}
                                                                            </td>
                                                                    <td>
                                                                       
                                                                            
                                                                            <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                <Link to={`/addSpecialities/${speciality.id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this specialitie?')) {
                                                                                            handleDeleteSpeciality(speciality.id);
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
                                            </div>
                                        </div>
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
