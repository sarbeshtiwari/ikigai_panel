import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [showEnquiry, setShowEnquiry] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const toggleOther = () => setShowOther(!showOther);
    const toggleEnquiry = () => setShowEnquiry(!showEnquiry);

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
                            {/* <NavDropdown.Item as={Link} to="">
                                User List
                            </NavDropdown.Item> */}
                            <NavDropdown.Item as={Link} to="">
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
                                        Our Specilities
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/testimonial" className="text-dark">
                                        Testimonial
                                    </Nav.Link>
                                     {/* <Nav.Link as={Link} to="/footerContent" className="text-dark">
                                        Footer Content
                                    </Nav.Link> */}
                                    {/*<Nav.Link as={Link} to="/locationAdvantages" className="text-dark">
                                        Common Location Advantages
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/approvedBanks" className="text-dark">
                                        Approved Banks
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/developer" className="text-dark">
                                        Developer
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/blogs" className="text-dark">
                                        Blogs
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/events" className="text-dark">
                                        Events
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/newsPaper" className="text-dark">
                                        News Paper
                                    </Nav.Link> */}
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
                                    <Nav.Link as={Link} to="/appointments" className="text-dark">
                                        Appointments
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/ContactUs" className="text-dark">
                                        Contact Us
                                    </Nav.Link>
                                    
                                </Nav>
                            )}
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
