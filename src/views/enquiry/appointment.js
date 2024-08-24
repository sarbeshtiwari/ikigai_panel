import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import Sidebar from '../home/sidebar';
import Modal from './modal'; // Import the modal component
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import { deleteAppointment, fetchAppointment, saveAppointment } from '../../controllers/enquiry/appointment';

const Appointment = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item ID
    const [noteText, setNoteText] = useState(''); // Track the note text
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchappointment();
        };
        fetchData();
    }, []); // Empty dependency array to fetch data only once on component mount

    const fetchappointment = async () => {
        try {
            setLoading(true);
            const result = await fetchAppointment();
           
            setData(result);
        } catch (error) {
            setError('Error fetching data');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAppointment(id);
            fetchAppointment();
        } catch (error) {
            console.error('Error deleting Appointment:', error);
        }
    };

    const handleOpenModal = (item) => {
        setSelectedItemId(item.id); // Set selected item ID
        setNoteText(item.note || ''); // Prefill note text or set empty string
        setModalOpen(true);
    };

    const handleModalSubmit = async (text) => {
        if (selectedItemId !== null) {
            try {
                console.log('Submitted text:', text);
                await saveAppointment(selectedItemId, text); // Pass the selectedItemId to saveAppointment
                fetchappointment(); // Refresh the data after saving
                setModalOpen(false); // Close the modal
                setSelectedItemId(null); // Reset selected item ID
                setNoteText(''); // Reset note text
            } catch (error) {
                console.error('Error saving Appointment:', error);
            }
        } else {
            console.error('No item selected for saving.');
        }
    };

    const handleCopy = () => {
        const textToCopy = "Some text to copy"; // Replace with actual content
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Text copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    const downloadCSV = (data) => {
        const csvRows = [];
        // Adding headers
        csvRows.push(['No', 'Name', 'Email', 'Mobile', 'Note', 'Created at']); // Replace with actual headers

        // Adding data rows
        data.forEach((row, index) => {
            csvRows.push([index + 1, row.name, row.email, row.phoneNumber, row.note, row.created_at]);
        });

        const csvString = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();

        URL.revokeObjectURL(url);
    };

    const downloadExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data, { header: ['No', 'Name', 'Email', 'Mobile', 'Note', 'Created at'] });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');
    };

    const downloadPDF = (data) => {
        const doc = new jsPDF();
        doc.text("PDF content here", 10, 10); // Customize as needed
        data.forEach((item, index) => {
            doc.text(`${index + 1}: ${item.name}, ${item.email}, ${item.phoneNumber}, ${item.note}`, 10, 20 + index * 10);
        });
        doc.save('data.pdf');
    };

    return (
        <>
            <Sidebar />
            <div className="midde_cont">
                <div className="container-fluid">
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <h2>Appointment</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row column1">
                        <div className="col-md-12">
                            <div className="white_shd full margin_bottom_30">
                                <div className="full price_table padding_infor_info">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="table-responsive-sm">
                                                {/* <table border="0" cellSpacing="5" cellPadding="5">
                                                    <tbody>
                                                        <tr>
                                                            <td>Created at:</td>
                                                            <td><input type="date" id="min" name="min" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>End date:</td>
                                                            <td><input type="date" id="max" name="max" /></td>
                                                        </tr>
                                                    </tbody>
                                                </table> */}
                                                <div id="pjdataTable_wrapper" className="dataTables_wrapper no-footer">
                                                    <div className="dt-buttons">
                                                        <button 
                                                            className="dt-button buttons-copy buttons-html5" 
                                                            type="button" 
                                                            onClick={handleCopy}
                                                        >
                                                            <span>Copy</span>
                                                        </button>
                                                        <button 
                                                            className="dt-button buttons-excel buttons-html5" 
                                                            type="button" 
                                                            onClick={() => downloadExcel(data)}
                                                        >
                                                            <span>Excel</span>
                                                        </button>
                                                        <button 
                                                            className="dt-button buttons-csv buttons-html5" 
                                                            type="button" 
                                                            onClick={() => downloadCSV(data)}
                                                        >
                                                            <span>CSV</span>
                                                        </button>
                                                        <button 
                                                            className="dt-button buttons-pdf buttons-html5" 
                                                            type="button" 
                                                            onClick={() => downloadPDF(data)}
                                                        >
                                                            <span>PDF</span>
                                                        </button>
                                                    </div>
                                                    {loading && <div className="loading">Loading...</div>}
                                                    {error && <div className="alert alert-danger">{error}</div>}

                                                    {/* <div id="pjdataTable_filter" className="dataTables_filter">
                                                        <label>Search:<input type="search" placeholder="" aria-controls="pjdataTable" /></label>
                                                    </div> */}
                                                    <table id="pjdataTable" className="table table-striped projects display dataTable no-footer" style={{ width: '100%' }}>
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Mobile</th>
                                                            
                                                                <th>Created at</th>
                                                                <th>Note</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.map((item, index) => (
                                                                <tr key={item.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.phoneNumber}</td>
                                                                   
                                                                    <td>{item.created_at}</td>
                                                                    <td>{item.note ? item.note.slice(0,20) : item.note}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content">
                                                                            <li>
                                                                                <button className="btn btn-danger btn-xs" onClick={() => {
                                                                                    if (window.confirm('Are you sure you want to delete this DATA?')) {
                                                                                        handleDelete(item.id);
                                                                                    }
                                                                                }}>
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button 
                                                                                    className="btn btn-primary btn-xs" 
                                                                                    onClick={() => handleOpenModal(item)} // Pass item to handleOpenModal
                                                                                >
                                                                                    <i className="fa fa-plus"></i> 
                                                                                    {item.note === null ? 'Add Note' : 'Update Note'}
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="dataTables_info" role="status" aria-live="polite">Showing 1 to {data.length} of {data.length} entries</div>
                                                    <div className="dataTables_paginate paging_simple_numbers">
                                                        <Link className="paginate_button previous disabled" id="pjdataTable_previous">Previous</Link>
                                                        <span>
                                                            <Link className="paginate_button current" id="pjdataTable_page1">1</Link>
                                                        </span>
                                                        <Link className="paginate_button next" id="pjdataTable_next">Next</Link>
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
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedItemId(null); // Reset selected item ID on modal close
                    setNoteText(''); // Reset note text on modal close
                }}
                onSubmit={handleModalSubmit}
                text={noteText} // Pass the note text to the modal
            />
        </>
    );
};

export default Appointment;
