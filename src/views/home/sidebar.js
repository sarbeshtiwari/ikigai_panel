import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [showEnquiry, setShowEnquiry] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    const location = useLocation();

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const toggleOther = () => setShowOther(!showOther);
    const toggleEnquiry = () => setShowEnquiry(!showEnquiry);

    useEffect(() => {
        const checkTokenExpiry = () => {
            const expiryTime = localStorage.getItem('expiryTime');
            if (expiryTime) {
                const expiryTimestamp = parseInt(expiryTime, 10);
                if (!isNaN(expiryTimestamp)) {
                    const currentTime = Date.now();
                    const timeRemaining = Math.max(0, Math.floor((expiryTimestamp - currentTime) / 1000));
                    setTimeLeft(timeRemaining);
                    if (timeRemaining <= 0) {
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('expiryTime');
                        window.location.href = '/login';
                    }
                }
            }
        };

        checkTokenExpiry(); // Check immediately
        const interval = setInterval(checkTokenExpiry, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        // Show sidebar by default on Dashboard route
        if (location.pathname === '/dashboard') {
            setShowSidebar(true);
        } else {
            setShowSidebar(false);
        }
    }, [location]);

    const formatTime = (seconds) => {
        if (seconds <= 0) return '0m 0s';
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs}s`;
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('expiryTime');
        window.location.href = '/login';
    };

    return (
        <>
            <Navbar bg="rgb(233, 238, 234)" expand="lg" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                <Button 
                    variant="secondary" 
                    onClick={toggleSidebar}
                    style={{ paddingLeft: '15px', paddingRight: '15px', backgroundColor: '#6434D6', 
                        borderColor: '#6434D6',
                        color: '#fff' }}
                >
                    {showSidebar ? '' : <i className='fa fa-bars fa-2x'></i>}
                </Button>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title="Welcome" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Offcanvas show={showSidebar} onHide={toggleSidebar} className="bg-light p-4">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={logo} alt="Logo" width="150" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {/* Navigation Links */}
                        <Nav.Link as={Link} to="/dashboard" 
                        style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/metaBanner" 
                        style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}
                        >
                            Meta Details
                        </Nav.Link>
                        <Nav.Link as={Link} to="/homeBanner" style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Home Banner
                        </Nav.Link>
                        <Nav.Link as={Link} to="/aboutUs" style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            About Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ourServices" style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Our Services
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ourTeam" style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Our Team
                        </Nav.Link>
                        <Nav.Link as={Link} to="/blogs" style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Blogs
                        </Nav.Link>
                        <Nav.Link as={Link} to="/faqs" style={{ backgroundColor: '#6434D6', 
                            borderColor: '#6434D6',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            FAQs
                        </Nav.Link>
                        
                        <Nav.Item>
                            <Nav.Link 
                                onClick={toggleOther}
                                aria-controls="other-items"
                                aria-expanded={showOther}
                                style={{ backgroundColor: '#2F2F2F', 
                                    borderColor: '#6434D6',
                                    color: '#fff',
                                    borderRadius: 5,
                                    marginBottom: 10
                                 }}
                            >
                                Other
                                <i className={`fa fa-chevron-${showOther ? 'up' : 'down'} ml-2`}></i>
                            </Nav.Link>
                            {showOther && (
                                <Nav className="flex-column bg-light p-2 rounded" id="other-items">
                                    <Nav.Link as={Link} to="/ourSpecialities" className="text-dark">
                                        Our Specialities
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/testimonial" className="text-dark">
                                        Testimonial
                                    </Nav.Link>
                                </Nav>
                            )}
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link 
                                onClick={toggleEnquiry}
                                aria-controls="enquiry-items"
                                aria-expanded={showEnquiry}
                                style={{ backgroundColor: '#2F2F2F', 
                                    borderColor: '#6434D6',
                                    color: '#fff',
                                    borderRadius: 5,
                                    marginBottom: 10
                                 }}
                            >
                                Enquiry
                                <i className={`fa fa-chevron-${showEnquiry ? 'up' : 'down'} ml-2`}></i>
                            </Nav.Link>
                            {showEnquiry && (
                                <Nav className="flex-column bg-light p-2 rounded" id="enquiry-items">
                                    <Nav.Link as={Link} to="/userQuery" className="text-dark">
                                        User Query
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/appointment" className="text-dark">
                                        Appointments
                                    </Nav.Link>
                                </Nav>
                            )}
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
                {timeLeft !== null && (
                    <div className="mt-3 text-center">
                        <span className="text-danger">Session expires in: {formatTime(timeLeft)}</span>
                    </div>
                )}
            </Offcanvas>
        </>
    );
}
