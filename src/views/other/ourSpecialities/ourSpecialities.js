import React, { useState, useEffect } from 'react';
import Sidebar from '../../home/sidebar';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/logo.png';

export default function Specialities() {
    const [specialities, setspecialities] = useState([]);

    useEffect(() => {
        // const loadspecialities = async () => {
        //     try {
        //         const specialitieData = await fetchspecialities();
        //         setspecialities(specialitieData);
        //     } catch (err) {
        //         console.log('Failed to fetch data');
        //     }
        // };

        // loadspecialities();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        // try {
        //     const response = await updatespecialitieStatus(id, status);
        //     if (response.success) {
        //         console.log('specialitie status updated successfully!');
        //         setspecialities(prevspecialities => prevspecialities.map(specialitie => specialitie._id === id ? { ...specialitie, status } : specialitie));
        //     } else {
        //         console.error('Error updating specialitie status:', response.message);
        //     }
        // } catch (error) {
        //     console.error('Unexpected error:', error);
        // }
    };

    const handleDeletespecialitie = async (id, image) => {
        // try {
        //     await deletespecialitie(id, image);
        //     setspecialities(prevspecialities => prevspecialities.filter(specialitie => specialitie._id !== id));
        // } catch (error) {
        //     console.error('Error deleting specialitie:', error);
        // }
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
                                        <Link to="/addSpecialities/add" className="btn btn-success btn-xs">Add Speciality</Link>
                                        <Link to="" className="btn btn-primary btn-xs float-right">Back</Link>
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
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {specialities.map((specialitie, index) => (
                                                                <tr key={specialitie._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{specialitie.heading}</td>
                                                                    <td>
                                                                        <img 
                                                                            src={specialitie.specialitiesImage ? `https://star-estate-api.onrender.com/uploads/specialities/${specialitie.specialitiesImage}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={specialitie.specialitiesImage} 
                                                                            width="50" 
                                                                            height="50" 
                                                                        />
                                                                    </td>
                                                                    <td>{specialitie.content.slice(0, 20)}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                {specialitie.status === false ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(specialitie._id, true)}>Deactive</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(specialitie._id, false)}>Active</button>
                                                                                )}
                                                                            </li>
                                                                            <li>
                                                                                <Link to={`/addSpecialities/${specialitie._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this specialitie?')) {
                                                                                            handleDeletespecialitie(specialitie._id, specialitie.specialitiesImage);
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
