import React, { useState } from 'react';
import Sidebar from '../home/sidebar';
import { useNavigate } from 'react-router-dom';
import './header_footer.css';  // Ensure you have this file for additional styling

const HeaderFooter = () => {
    const [headerLogo, setHeaderLogo] = useState('');
    const [footerLogo, setFooterLogo] = useState('');
    const [navButtons, setNavButtons] = useState({
        home: true,
        aboutUs: true,
        ourServices: true,
        ourTeam: true,
        blogs: true,
        FAQs: true
    });
    const [displayOn, setDisplayOn] = useState('both');
    const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
    const [headerButtonColor, setHeaderButtonColor] = useState('#007bff');
    const [headerButtonHoverColor, setHeaderButtonHoverColor] = useState('#0056b3');
    const [headerButtonSize, setHeaderButtonSize] = useState('md');
    const [bookButtonBgColor, setBookButtonBgColor] = useState('#28a745');
    const [callButtonBgColor, setCallButtonBgColor] = useState('#dc3545');
    const [callNumber, setCallNumber] = useState('');
    const [transparentButtons, setTransparentButtons] = useState(false);

    const navigate = useNavigate();

    const handleLogoChange = (e, type) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'header') {
                setHeaderLogo(reader.result);
            } else if (type === 'footer') {
                setFooterLogo(reader.result);
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleNavButtonChange = (e) => {
        const { name, checked } = e.target;
        setNavButtons(prev => ({ ...prev, [name]: checked }));
    };

    const handleDisplayChange = (e) => {
        setDisplayOn(e.target.value);
    };

    const handleColorChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'header') {
            if (name === 'bgColor') setHeaderBgColor(value);
            if (name === 'buttonColor') setHeaderButtonColor(value);
            if (name === 'buttonHoverColor') setHeaderButtonHoverColor(value);
        }
        if (type === 'bookButton') {
            setBookButtonBgColor(value);
        }
        if (type === 'callButton') {
            setCallButtonBgColor(value);
        }
    };

    const handleSizeChange = (e) => {
        setHeaderButtonSize(e.target.value);
    };

    const handleTransparencyChange = (e) => {
        setTransparentButtons(e.target.checked);
    };

    return (
        <div className="page-wrapper">
            <header className="header">
                <Sidebar />
            </header>

            <main className="content">
                <div className="container my-5">
                    <div className="row mb-4">
                        <div className="col-md-12 text-center">
                            <h2 className="my-4 text-primary">Header and Footer Configuration</h2>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <h5 className="card-title">Header Logo</h5>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleLogoChange(e, 'header')}
                                        className="form-control-file"
                                    />
                                    {headerLogo && (
                                        <div className="mt-3 text-center">
                                            <img src={headerLogo} alt="Header Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />
                                        </div>
                                    )}

                                    <h5 className="card-title mt-4">Footer Logo</h5>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleLogoChange(e, 'footer')}
                                        className="form-control-file"
                                    />
                                    {footerLogo && (
                                        <div className="mt-3 text-center">
                                            <img src={footerLogo} alt="Footer Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />
                                        </div>
                                    )}

                                    <h5 className="card-title mt-4">Navigation Buttons</h5>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="home"
                                            checked={navButtons.home}
                                            onChange={handleNavButtonChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Home</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="aboutUs"
                                            checked={navButtons.aboutUs}
                                            onChange={handleNavButtonChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">About Us</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="ourServices"
                                            checked={navButtons.ourServices}
                                            onChange={handleNavButtonChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Our Services</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="ourTeam"
                                            checked={navButtons.ourTeam}
                                            onChange={handleNavButtonChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Our Team</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="blogs"
                                            checked={navButtons.blogs}
                                            onChange={handleNavButtonChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Blogs</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="FAQs"
                                            checked={navButtons.FAQs}
                                            onChange={handleNavButtonChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">FAQs</label>
                                    </div>

                                    <h5 className="card-title mt-4">Display Navigation Buttons</h5>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="headerOnly"
                                            name="displayOn"
                                            value="header"
                                            checked={displayOn === 'header'}
                                            onChange={handleDisplayChange}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="headerOnly" className="form-check-label">Header Only</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="footerOnly"
                                            name="displayOn"
                                            value="footer"
                                            checked={displayOn === 'footer'}
                                            onChange={handleDisplayChange}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="footerOnly" className="form-check-label">Footer Only</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="both"
                                            name="displayOn"
                                            value="both"
                                            checked={displayOn === 'both'}
                                            onChange={handleDisplayChange}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="both" className="form-check-label">Both</label>
                                    </div>

                                    <h5 className="card-title mt-4">Header Customization</h5>
                                    <div className="form-group">
                                        <label>Background Color</label>
                                        <input
                                            type="color"
                                            name="bgColor"
                                            value={headerBgColor}
                                            onChange={(e) => handleColorChange(e, 'header')}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Button Color</label>
                                        <input
                                            type="color"
                                            name="buttonColor"
                                            value={headerButtonColor}
                                            onChange={(e) => handleColorChange(e, 'header')}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Button Hover Color</label>
                                        <input
                                            type="color"
                                            name="buttonHoverColor"
                                            value={headerButtonHoverColor}
                                            onChange={(e) => handleColorChange(e, 'header')}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Button Size</label>
                                        <select
                                            value={headerButtonSize}
                                            onChange={handleSizeChange}
                                            className="form-control"
                                        >
                                            <option value="sm">Small</option>
                                            <option value="md">Medium</option>
                                            <option value="lg">Large</option>
                                        </select>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            checked={transparentButtons}
                                            onChange={handleTransparencyChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Transparent Buttons</label>
                                    </div>

                                    <h5 className="card-title mt-4">Special Buttons</h5>
                                    <div className="form-group">
                                        <label>Book an Appointment Button Color</label>
                                        <input
                                            type="color"
                                            value={bookButtonBgColor}
                                            onChange={(e) => handleColorChange(e, 'bookButton')}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Call Us Button Color</label>
                                        <input
                                            type="color"
                                            value={callButtonBgColor}
                                            onChange={(e) => handleColorChange(e, 'callButton')}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Call Number</label>
                                        <input
                                            type="tel"
                                            value={callNumber}
                                            onChange={(e) => setCallNumber(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <h5 className="card-title">Preview</h5>
                                    <div className="header-preview" style={{ backgroundColor: headerBgColor }}>
                                        {displayOn === 'header' || displayOn === 'both' ? (
                                            <header className="mb-4 p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: headerBgColor }}>
                                                {headerLogo && <img src={headerLogo} alt="Header Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />}
                                                <div className="btn-group" role="group">
                                                    {navButtons.home && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/')}
                                                        >
                                                            Home
                                                        </button>
                                                    )}
                                                    {navButtons.aboutUs && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/aboutUs')}
                                                        >
                                                            About Us
                                                        </button>
                                                    )}
                                                    {navButtons.ourServices && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/ourServices')}
                                                        >
                                                            Our Services
                                                        </button>
                                                    )}
                                                    {navButtons.ourTeam && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/ourTeam')}
                                                        >
                                                            Our Team
                                                        </button>
                                                    )}
                                                    {navButtons.blogs && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/blogs')}
                                                        >
                                                            Blogs
                                                        </button>
                                                    )}
                                                    {navButtons.FAQs && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/FAQs')}
                                                        >
                                                            FAQs
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            backgroundColor: bookButtonBgColor,
                                                            border: 'none',
                                                            color: '#fff',
                                                        }}
                                                        onClick={() => alert('Book an Appointment')}
                                                    >
                                                        Book an Appointment
                                                    </button>
                                                    {callNumber && (
                                                        <a
                                                            href={`tel:${callNumber}`}
                                                            className="btn"
                                                            style={{
                                                                backgroundColor: callButtonBgColor,
                                                                border: 'none',
                                                                color: '#fff',
                                                                textDecoration: 'none', // Ensure there's no underline
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                padding: '10px', // Adjust padding as needed
                                                            }}
                                                        >
                                                            <i className="fas fa-phone-alt"></i>
                                                        </a>
                                                    )}

                                                </div>
                                            </header>
                                        ) : null}
                                    </div>

                                    <div className="footer-preview mt-4">
                                        {displayOn === 'footer' || displayOn === 'both' ? (
                                            <footer className="text-center p-3" style={{ backgroundColor: headerBgColor }}>
                                                {footerLogo && <img src={footerLogo} alt="Footer Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />}
                                                <div className="btn-group" role="group">
                                                    {navButtons.home && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/')}
                                                        >
                                                            Home
                                                        </button>
                                                    )}
                                                    {navButtons.aboutUs && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/aboutUs')}
                                                        >
                                                            About Us
                                                        </button>
                                                    )}
                                                    {navButtons.ourServices && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/ourServices')}
                                                        >
                                                            Our Services
                                                        </button>
                                                    )}
                                                    {navButtons.ourTeam && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/ourTeam')}
                                                        >
                                                            Our Team
                                                        </button>
                                                    )}
                                                    {navButtons.blogs && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/blogs')}
                                                        >
                                                            Blogs
                                                        </button>
                                                    )}
                                                    {navButtons.FAQs && (
                                                        <button
                                                            className={`btn btn-${headerButtonSize} text-white`}
                                                            style={{
                                                                backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderColor: transparentButtons ? 'transparent' : headerButtonColor,
                                                                borderWidth: '2px',
                                                                borderStyle: 'solid',
                                                            }}
                                                            onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
                                                            onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
                                                            onClick={() => navigate('/FAQs')}
                                                        >
                                                            FAQs
                                                        </button>
                                                    )}
                                                </div>
                                            </footer>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HeaderFooter;
