import React, { useEffect, useState } from 'react';
import { addHeaderFooter, fetchHeaderFooter, updateHeaderFooter } from '../../controllers/header_footer/header_footer';
import Sidebar from '../home/sidebar';

export default function HeaderFooter() {
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [buttons, setButtons] = useState([{ text: '', checked: false, link: '' }]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [footerTitle, setFooterTitle] = useState('');
    const [footerDescription, setFooterDescription] = useState('');
    const [address, setAddress] = useState('');
    const [contactPhones, setContactPhones] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [id, setID] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchHeaderFooter();
                const data = result[0] || {};
                setID(data.id);
                setLogo(data.logo);
                setButtons(Array.isArray(data.buttons) ? data.buttons : [{ text: '', checked: false, link: '' }]);
                setPhoneNumber(data.phone_number);
                setFooterTitle(data.footer_title);
                setFooterDescription(data.footer_description);
                setAddress(data.address);
                setContactPhones(data.contact_phones);
                setEmail(data.email);

                if (data.logo) {
                    setLogoPreview(data.logo);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to fetch data. Please try again.');
            }
        };

        fetchData();
    }, []);

    const validateImage = (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const arr = new Uint8Array(reader.result).subarray(0, 4);
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

                if (!allowedTypes.includes(fileType)) {
                    alert("Only JPG, JPEG, WEBP, and PNG formats are allowed.");
                } else {
                    resolve(file);
                }
            };

            reader.onerror = () => reject("Error reading file.");
            reader.readAsArrayBuffer(file);
        });
    };

    const handleLogoChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const validFile = await validateImage(file);
            if (validFile) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5 MB.');
                    return;
                } else {
                    const fileUrl = URL.createObjectURL(file);
                    setLogo(file);
                    setLogoPreview(fileUrl);
                }
            } else {
                setLogo(null);
            }
        }
    };

    const addButton = () => {
        setButtons([...buttons, { text: '', checked: false, link: '' }]);
    };

    const updateButton = (index, value) => {
        const newButtons = [...buttons];
        newButtons[index] = { ...newButtons[index], text: value, link: generateLink(value) };
        setButtons(newButtons);
    };

    const toggleButtonCheck = (index) => {
        const newButtons = [...buttons];
        newButtons[index] = { ...newButtons[index], checked: !newButtons[index].checked };
        setButtons(newButtons);
    };

    const handleButtonRemove = (index) => {
        setButtons(buttons.filter((_, i) => i !== index));
    };

    const validateFields = () => {
        const newErrors = {};
        if (!logo) newErrors.logo = 'Logo is required.';
        if (!footerTitle) newErrors.footerTitle = 'Footer title is required.';
        if (!footerDescription) newErrors.footerDescription = 'Footer description is required.';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const data = {
            buttons: buttons.map((btn) => ({ text: btn.text, checked: btn.checked, link: btn.link })),
            phone_number: phoneNumber,
            footer_title: footerTitle,
            footer_description: footerDescription,
            address,
            contact_phones: contactPhones,
            email,
        };

        try {
            const formData = new FormData();
            if (logo) {
                formData.append('logo', logo);
            }
            formData.append('buttons', JSON.stringify(data.buttons));
            formData.append('phone_number', data.phone_number);
            formData.append('footer_title', data.footer_title);
            formData.append('footer_description', data.footer_description);
            formData.append('address', data.address);
            formData.append('contact_phones', data.contact_phones);
            formData.append('email', data.email);

            await updateHeaderFooter(id, formData);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit data. Please try again.');
        }
    };

    // Function to generate link based on button text
    const generateLink = (text) => {
        const formattedText = text.trim().toLowerCase().replace(/\s+/g, '-');
        return text.trim().toLowerCase() === 'home' ? '/' : `/${formattedText}`;
    };

    return (
        <>
            <Sidebar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Header & Footer Settings</h2>

                                <div className="mb-4">
                                    <h6>Logo:</h6>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="logo"
                                        className="form-control"
                                        onChange={handleLogoChange}
                                    />
                                    {logoPreview && (
                                        <img src={logoPreview} alt="Logo Preview" className="img-fluid mt-3" style={{ maxHeight: '150px', objectFit: 'contain' }} />
                                    )}
                                    {errors.logo && <div className="text-danger mt-2">{errors.logo}</div>}
                                </div>

                                <div className="mb-4">
                                    <h6>Header & Footer Buttons:</h6>
                                    {buttons.map((btn, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2">
                                            <div className="form-check me-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={btn.checked}
                                                    onChange={() => toggleButtonCheck(index)}
                                                />
                                                <label className="form-check-label">Checked</label>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                placeholder={`Button ${index + 1}`}
                                                value={btn.text}
                                                onChange={(e) => updateButton(index, e.target.value)}
                                            />
                                            <span className="ms-2">
                                                <a href={btn.link} className="text-decoration-none" target="_blank" rel="noopener noreferrer">
                                                    {btn.link}
                                                </a>
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-danger ms-2"
                                                onClick={() => handleButtonRemove(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-2"
                                        onClick={addButton}
                                    >
                                        Add More Buttons
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phoneNumber" className="form-label"><h6>Phone Number:</h6></label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="footerTitle" className="form-label"><h6>Footer Title:</h6></label>
                                    <input
                                        type="text"
                                        id="footerTitle"
                                        className="form-control"
                                        value={footerTitle}
                                        onChange={(e) => setFooterTitle(e.target.value)}
                                    />
                                    {errors.footerTitle && <div className="text-danger mt-2">{errors.footerTitle}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="footerDescription" className="form-label"><h6>Footer Description:</h6></label>
                                    <textarea
                                        id="footerDescription"
                                        className="form-control"
                                        rows="4"
                                        value={footerDescription}
                                        onChange={(e) => setFooterDescription(e.target.value)}
                                    />
                                    {errors.footerDescription && <div className="text-danger mt-2">{errors.footerDescription}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="address" className="form-label"><h6>Address:</h6></label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="contactPhones" className="form-label"><h6>Contact Phones:</h6></label>
                                    <input
                                        type="text"
                                        id="contactPhones"
                                        className="form-control"
                                        value={contactPhones}
                                        onChange={(e) => setContactPhones(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label"><h6>Contact Email:</h6></label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}




















// import React, { useState } from 'react';
// import Sidebar from '../home/sidebar';
// import { useNavigate } from 'react-router-dom';

// const HeaderFooter = () => {
//     const [headerLogo, setHeaderLogo] = useState('');
//     const [footerLogo, setFooterLogo] = useState('');
//     const [navButtons, setNavButtons] = useState({});
//     const [displayOn, setDisplayOn] = useState('both');
//     const [headerBgColor, setHeaderBgColor] = useState('#ffffff');
//     const [headerButtonColor, setHeaderButtonColor] = useState('#007bff');
//     const [headerButtonHoverColor, setHeaderButtonHoverColor] = useState('#0056b3');
//     const [headerButtonSize, setHeaderButtonSize] = useState('md');
//     const [bookButtonBgColor, setBookButtonBgColor] = useState('#28a745');
//     const [callButtonBgColor, setCallButtonBgColor] = useState('#dc3545');
//     const [callNumber, setCallNumber] = useState('');
//     const [transparentButtons, setTransparentButtons] = useState(false);
//     const [bookButtonRadius, setBookButtonRadius] = useState('4px');
//     const [callButtonRadius, setCallButtonRadius] = useState('4px');
//     const [buttonRadius, setButtonRadius] = useState('4px');
//     const [footerData , setFooterData] = useState({
//         footerHeading: '',
//         footerDescription: '',
//         address: '',
//         phoneNumber: '',
//         email: '',
//         headingColor: '#000',
//         headingFontSize: '20px',
//         descriptionColor: '#000',
//         descriptionFontSize: '16px',
//         addressColor: '#000',
//         addressFontSize: '16px',
//         phoneNumberColor: '#000',
//         phoneNumberFontSize: '16px',
//         emailColor: '#000',
//         emailFontSize: '16px',
//         alignment: 'center',
//     });
//     const [headerData, setHeaderData] = useState({
//         headerLogo: headerLogo,
//         headerButtonSize: headerButtonSize,
//         headerButtonColor: headerButtonColor,
//         headerButtonHoverColor: headerButtonHoverColor,
//         buttonRadius: buttonRadius,
//         bookButtonBgColor: bookButtonBgColor,
//         bookButtonRadius: bookButtonRadius,
//         callButtonBgColor: callButtonBgColor,
//         callButtonRadius: callButtonRadius,
//         callNumber: callNumber,
//         navButtons: navButtons,
//       });

//     const navigate = useNavigate();

//     const handleLogoChange = (e, type) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             if (type === 'header') {
//                 setHeaderLogo(reader.result);
//             } else if (type === 'footer') {
//                 setFooterLogo(reader.result);
//             }
//         };
//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleNavButtonChange = (e) => {
//         const { name, checked } = e.target;
//         setNavButtons(prev => ({ ...prev, [name]: checked }));
//     };

//     const handleDisplayChange = (e) => {
//         setDisplayOn(e.target.value);
//     };

//     const handleColorChange = (e, type) => {
//         const { name, value } = e.target;
//         if (type === 'header') {
//             if (name === 'bgColor') setHeaderBgColor(value);
//             if (name === 'buttonColor') setHeaderButtonColor(value);
//             if (name === 'buttonHoverColor') setHeaderButtonHoverColor(value);
//         }
//         if (type === 'bookButton') {
//             setBookButtonBgColor(value);
//         }
//         if (type === 'callButton') {
//             setCallButtonBgColor(value);
//         }
//     };

//     const handleSizeChange = (e) => {
//         setHeaderButtonSize(e.target.value);
//     };

//     const handleTransparencyChange = (e) => {
//         setTransparentButtons(e.target.checked);
//     };

//     const handleBookButtonRadiusChange = (e) => {
//         setBookButtonRadius(e.target.value);
//     };
      
//     const handleCallButtonRadiusChange = (e) => {
//         setCallButtonRadius(e.target.value);
//     };

//     const handleButtonRadiusChange = (e) => {
//         setButtonRadius(e.target.value);
//     };
      

//     const handleExitClick = () => {
//         navigate('/dashboard'); // Navigate to /dashboard
//     };

//     const handleFooterData = (e) => {
//         const { name, value } = e.target;
//         setFooterData({
//           ...footerData,
//           [name]: value,
//         });
//       };
    
//       const handleSaveHeader = async (e) => {
//         e.preventDefault();
    
//         // Construct the complete headerData object with current state values
//         const completeHeaderData = {
//             headerLogo: headerLogo,
//             footerLogo: footerLogo,
//             headerButtonSize: headerButtonSize,
//             headerButtonColor: headerButtonColor,
//             headerButtonHoverColor: headerButtonHoverColor,
//             buttonRadius: buttonRadius,
//             bookButtonBgColor: bookButtonBgColor,
//             bookButtonRadius: bookButtonRadius,
//             callButtonBgColor: callButtonBgColor,
//             callButtonRadius: callButtonRadius,
//             callNumber: callNumber,
//             navButtons: navButtons,
//         };
    
//         try {
//             const response = await fetch('/api/saveHeader', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(completeHeaderData),
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const data = await response.json();
//             console.log('Success:', data);
//             // Handle success (e.g., navigate to another page or show a success message)
//             navigate('/dashboard');
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error (e.g., show an error message)
//         }
//     };
    


//     return (
//         <div className="page-wrapper">
//             {/* <header className="header">
//                 <Sidebar />
//             </header> */}

//             <main className="content">
//             <div className="header-preview" style={{ backgroundColor: headerBgColor }}>
//                                         {displayOn === 'header' || displayOn === 'both' ? (
//                                             <header className="p-2 d-flex justify-content-between align-items-center mx-40" style={{ backgroundColor: headerBgColor}}>
//                                                 {headerLogo && <img src={headerLogo} alt="Header Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />}
//                                                 <div className="btn-group" role="group">
//                                                     {navButtons.home && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/')}
//                                                         >
//                                                             Home
//                                                         </button>
//                                                     )}
//                                                     {navButtons.aboutUs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/aboutUs')}
//                                                         >
//                                                             About Us
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourServices && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourServices')}
//                                                         >
//                                                             Our Services
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourTeam && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourTeam')}
//                                                         >
//                                                             Our Team
//                                                         </button>
//                                                     )}
//                                                     {navButtons.blogs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/blogs')}
//                                                         >
//                                                             Blogs
//                                                         </button>
//                                                     )}
//                                                     {navButtons.FAQs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/FAQs')}
//                                                         >
//                                                             FAQs
//                                                         </button>
//                                                     )}
//                                                     <button
//                                                         className="btn"
//                                                         style={{
//                                                             backgroundColor: bookButtonBgColor,
//                                                             borderRadius: bookButtonRadius,
//                                                             border: 'none',
//                                                             color: '#fff',
//                                                         }}
//                                                         onClick={() => alert('Book an Appointment')}
//                                                     >
//                                                         Book an Appointment
//                                                     </button>
//                                                     {callNumber && (
//                                                         <a
//                                                             href={`tel:${callNumber}`}
//                                                             className="btn"
//                                                             style={{
//                                                                 backgroundColor: callButtonBgColor,
//                                                                 borderRadius: callButtonRadius,
//                                                                 border: 'none',
//                                                                 color: '#fff',
//                                                                 textDecoration: 'none', // Ensure there's no underline
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                                 padding: '10px', // Adjust padding as needed
//                                                             }}
//                                                         >
//                                                             <i className="fas fa-phone-alt"></i>
//                                                         </a>
//                                                     )}

//                                                 </div>
//                                             </header>
//                                         ) : null}
//                                     </div>
//                 <div className="container my-5">
//                     <div className='row'>
//                         <button style={{ backgroundColor: 'red', color: 'white' }} onClick = {handleExitClick}>Exit Editing</button>
//                         <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleSaveHeader}>Save Data</button>
//                     </div>
                
//                     <div className="row mb-4">
                        
//                         <div className="col-md-12 text-center">
//                             <h2 className="my-4 text-primary">Header and Footer Configuration</h2>
//                         </div>
//                     </div>

//                     <div className="row mb-4">
//                         <div className="col-md-12">
//                             <div className="card shadow-lg">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Header Logo</h5>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleLogoChange(e, 'header')}
//                                         className="form-control-file"
//                                     />
//                                     {headerLogo && (
//                                         <div className="mt-3 text-center">
//                                             <img src={headerLogo} alt="Header Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />
//                                         </div>
//                                     )}

//                                     <h5 className="card-title mt-4">Footer Logo</h5>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleLogoChange(e, 'footer')}
//                                         className="form-control-file"
//                                     />
//                                     {footerLogo && (
//                                         <div className="mt-3 text-center">
//                                             <img src={footerLogo} alt="Footer Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />
//                                         </div>
//                                     )}

//                                     <h5 className="card-title mt-4">Navigation Buttons</h5>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             id="home"
//                                             name="home"
//                                             checked={navButtons.home || false}
//                                             onChange={handleNavButtonChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="home" className="form-check-label">Home</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             id="aboutUs"
//                                             name="aboutUs"
//                                             checked={navButtons.aboutUs || false}
//                                             onChange={handleNavButtonChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="aboutUs" className="form-check-label">About Us</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             id="ourServices"
//                                             name="ourServices"
//                                             checked={navButtons.ourServices || false}
//                                             onChange={handleNavButtonChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="ourServices" className="form-check-label">Our Services</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             id="ourTeam"
//                                             name="ourTeam"
//                                             checked={navButtons.ourTeam || false}
//                                             onChange={handleNavButtonChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="ourTeam" className="form-check-label">Our Team</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             id="blogs"
//                                             name="blogs"
//                                             checked={navButtons.blogs || false}
//                                             onChange={handleNavButtonChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="blogs" className="form-check-label">Blogs</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             id="FAQs"
//                                             name="FAQs"
//                                             checked={navButtons.FAQs || false}
//                                             onChange={handleNavButtonChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="FAQs" className="form-check-label">FAQs</label>
//                                     </div>


//                                     <h5 className="card-title mt-4">Display Navigation Buttons</h5>
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             id="headerOnly"
//                                             name="displayOn"
//                                             value="header"
//                                             checked={displayOn === 'header'}
//                                             onChange={handleDisplayChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="headerOnly" className="form-check-label">Header Only</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             id="footerOnly"
//                                             name="displayOn"
//                                             value="footer"
//                                             checked={displayOn === 'footer'}
//                                             onChange={handleDisplayChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="footerOnly" className="form-check-label">Footer Only</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             id="both"
//                                             name="displayOn"
//                                             value="both"
//                                             checked={displayOn === 'both'}
//                                             onChange={handleDisplayChange}
//                                             className="form-check-input"
//                                         />
//                                         <label htmlFor="both" className="form-check-label">Both</label>
//                                     </div>
                                    

//                                     <h5 className="card-title mt-4">Header Customization</h5>
//                                     <div className="form-group">
//                                         <label>Background Color</label>
//                                         <input
//                                             type="color"
//                                             name="bgColor"
//                                             value={headerBgColor}
//                                             onChange={(e) => handleColorChange(e, 'header')}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Button Color</label>
//                                         <input
//                                             type="color"
//                                             name="buttonColor"
//                                             value={headerButtonColor}
//                                             onChange={(e) => handleColorChange(e, 'header')}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Button Hover Color</label>
//                                         <input
//                                             type="color"
//                                             name="buttonHoverColor"
//                                             value={headerButtonHoverColor}
//                                             onChange={(e) => handleColorChange(e, 'header')}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Button Size</label>
//                                         <select
//                                             value={headerButtonSize}
//                                             onChange={handleSizeChange}
//                                             className="form-control"
//                                         >
//                                             <option value="sm">Small</option>
//                                             <option value="md">Medium</option>
//                                             <option value="lg">Large</option>
//                                         </select>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="checkbox"
//                                             checked={transparentButtons}
//                                             onChange={handleTransparencyChange}
//                                             className="form-check-input"
//                                         />
//                                         <label className="form-check-label">Transparent Buttons</label>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Buttons Radius</label>
//                                         <input
//                                         type="text"
//                                         value={buttonRadius}
//                                         onChange={handleButtonRadiusChange}
//                                         className="form-control"
//                                         placeholder="e.g., 8px"
//                                         />
//                                     </div>

//                                     <h5 className="card-title mt-4">Special Buttons</h5>
//                                     <div className="form-group">
//                                         <label>Book an Appointment Button Color</label>
//                                         <input
//                                         type="color"
//                                         value={bookButtonBgColor}
//                                         onChange={(e) => handleColorChange(e, 'bookButton')}
//                                         className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Book an Appointment Button Radius</label>
//                                         <input
//                                         type="text"
//                                         value={bookButtonRadius}
//                                         onChange={handleBookButtonRadiusChange}
//                                         className="form-control"
//                                         placeholder="e.g., 8px"
//                                         />
//                                     </div>
                                    
//                                     <div className="form-group">
//                                         <label>Call Us Button Color</label>
//                                         <input
//                                         type="color"
//                                         value={callButtonBgColor}
//                                         onChange={(e) => handleColorChange(e, 'callButton')}
//                                         className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Call Us Button Radius</label>
//                                         <input
//                                         type="text"
//                                         value={callButtonRadius}
//                                         onChange={handleCallButtonRadiusChange}
//                                         className="form-control"
//                                         placeholder="e.g., 8px"
//                                         />
//                                     </div>
                                    
//                                     <div className="form-group">
//                                         <label>Call Number</label>
//                                         <input
//                                         type="tel"
//                                         value={callNumber}
//                                         onChange={(e) => setCallNumber(e.target.value)}
//                                         className="form-control"
//                                         />
//                                     </div>
//                                     {/* Footer Heading */}
//                                     <div className="form-group">
//                                         <label>Footer Heading</label>
//                                         <input
//                                         type="text"
//                                         name="footerHeading"
//                                         value={footerData.footerHeading}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Heading Color</label>
//                                         <input
//                                         type="color"
//                                         name="headingColor"
//                                         value={footerData.headingColor}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Heading Font Size</label>
//                                         <input
//                                         type="text"
//                                         name="headingFontSize"
//                                         value={footerData.headingFontSize}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                     </div>
                                    
//                                     {/* Footer Description */}
//                                     <div className="form-group">
//                                         <label>Footer Description</label>
//                                         <input
//                                         type="text"
//                                         name="footerDescription"
//                                         value={footerData.footerDescription}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Description Color</label>
//                                         <input
//                                         type="color"
//                                         name="descriptionColor"
//                                         value={footerData.descriptionColor}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Description Font Size</label>
//                                         <input
//                                         type="text"
//                                         name="descriptionFontSize"
//                                         value={footerData.descriptionFontSize}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                     </div>
                                    
//                                     {/* Address */}
//                                     <div className="form-group">
//                                         <label>Address</label>
//                                         <input
//                                         type="text"
//                                         name="address"
//                                         value={footerData.address}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Address Color</label>
//                                         <input
//                                         type="color"
//                                         name="addressColor"
//                                         value={footerData.addressColor}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Address Font Size</label>
//                                         <input
//                                         type="text"
//                                         name="addressFontSize"
//                                         value={footerData.addressFontSize}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                     </div>
                                    
//                                     {/* Phone Number */}
//                                     <div className="form-group">
//                                         <label>Phone Number</label>
//                                         <input
//                                         type="number"
//                                         name="phoneNumber"
//                                         value={footerData.phoneNumber}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Phone Number Color</label>
//                                         <input
//                                         type="color"
//                                         name="phoneNumberColor"
//                                         value={footerData.phoneNumberColor}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Phone Number Font Size</label>
//                                         <input
//                                         type="text"
//                                         name="phoneNumberFontSize"
//                                         value={footerData.phoneNumberFontSize}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                     </div>
                                    
//                                     {/* Email */}
//                                     <div className="form-group">
//                                         <label>Email</label>
//                                         <input
//                                         type="email"
//                                         name="email"
//                                         value={footerData.email}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Email Color</label>
//                                         <input
//                                         type="color"
//                                         name="emailColor"
//                                         value={footerData.emailColor}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                         <label>Email Font Size</label>
//                                         <input
//                                         type="text"
//                                         name="emailFontSize"
//                                         value={footerData.emailFontSize}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         />
//                                     </div>
                                    
//                                     {/* Alignment */}
//                                     <div className="form-group">
//                                         <label>Text Alignment</label>
//                                         <select
//                                         name="alignment"
//                                         value={footerData.alignment}
//                                         onChange={handleFooterData}
//                                         className="form-control"
//                                         >
//                                         <option value="left">Left</option>
//                                         <option value="center">Center</option>
//                                         <option value="right">Right</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                    {/* //here was */}
//                 </div>
//                 <div className="footer-preview mt-4">
//                                         {displayOn === 'footer' || displayOn === 'both' ? (
//                                             <footer className="" style={{ backgroundColor: headerBgColor }}>
//                                                 {footerLogo && (
//                                                 <img
//                                                     src={footerLogo}
//                                                     alt="Footer Logo"
//                                                     className="img-fluid rounded"
//                                                     style={{ maxWidth: '150px' }}
//                                                 />
//                                                 )}
//                                                <div className="footer-content">
//                                                 <div className="footer-heading">
//                                                     <h5
//                                                     style={{
//                                                         color: footerData.headingColor,
//                                                         fontSize: footerData.headingFontSize,
//                                                         textAlign: footerData.alignment,
//                                                     }}
//                                                     >
//                                                     {footerData.footerHeading}
//                                                     </h5>
//                                                 </div>
//                                                 <div className="footer-description">
//                                                     <p
//                                                     style={{
//                                                         color: footerData.descriptionColor,
//                                                         fontSize: footerData.descriptionFontSize,
//                                                         textAlign: footerData.alignment,
//                                                     }}
//                                                     >
//                                                     {footerData.footerDescription}
//                                                     </p>
//                                                 </div>
//                                                 </div>
//                                                 <div className="footer-contact" style={{ textAlign: 'right' }}>
//                                                 <div className="contact-item">
//                                                     {/* <FaMapMarkerAlt style={{ color: footerData.addressColor }} /> */}
//                                                     <span
//                                                     style={{
//                                                         color: footerData.addressColor,
//                                                         fontSize: footerData.addressFontSize,
//                                                     }}
//                                                     >
//                                                     {footerData.address}
//                                                     </span>
//                                                 </div>
//                                                 <div className="contact-item">
//                                                     {/* <FaPhoneAlt style={{ color: footerData.phoneNumberColor }} /> */}
//                                                     <span
//                                                     style={{
//                                                         color: footerData.phoneNumberColor,
//                                                         fontSize: footerData.phoneNumberFontSize,
//                                                     }}
//                                                     >
//                                                     {footerData.phoneNumber}
//                                                     </span>
//                                                 </div>
//                                                 <div className="contact-item">
//                                                     {/* <Fa En velope style={{ color: footerData.emailColor }} /> */}
//                                                     <span
//                                                     style={{
//                                                         color: footerData.emailColor,
//                                                         fontSize: footerData.emailFontSize,
//                                                     }}
//                                                     >
//                                                     {footerData.email}
//                                                     </span>
//                                                 </div></div>
            
//                                                 <div className="btn-group" role="group">
//                                                     {navButtons.home && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/')}
//                                                         >
//                                                             Home
//                                                         </button>
//                                                     )}
//                                                     {navButtons.aboutUs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/aboutUs')}
//                                                         >
//                                                             About Us
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourServices && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourServices')}
//                                                         >
//                                                             Our Services
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourTeam && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourTeam')}
//                                                         >
//                                                             Our Team
//                                                         </button>
//                                                     )}
//                                                     {navButtons.blogs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/blogs')}
//                                                         >
//                                                             Blogs
//                                                         </button>
//                                                     )}
//                                                     {navButtons.FAQs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderRadius: buttonRadius,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/FAQs')}
//                                                         >
//                                                             FAQs
//                                                         </button>
//                                                     )}
                                                    
//                                                 </div>
//                                             </footer>
//                                         ) : null}
//                                     </div>   
//             </main>
//         </div>
//     );
// };

// export default HeaderFooter;


//  {/* <div className="row">
//                         <div className="col-md-12">
//                             <div className="card shadow-lg">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Preview</h5>
//                                     <div className="header-preview" style={{ backgroundColor: headerBgColor }}>
//                                         {displayOn === 'header' || displayOn === 'both' ? (
//                                             <header className="mb-4 p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: headerBgColor }}>
//                                                 {headerLogo && <img src={headerLogo} alt="Header Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />}
//                                                 <div className="btn-group" role="group">
//                                                     {navButtons.home && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/')}
//                                                         >
//                                                             Home
//                                                         </button>
//                                                     )}
//                                                     {navButtons.aboutUs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/aboutUs')}
//                                                         >
//                                                             About Us
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourServices && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourServices')}
//                                                         >
//                                                             Our Services
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourTeam && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourTeam')}
//                                                         >
//                                                             Our Team
//                                                         </button>
//                                                     )}
//                                                     {navButtons.blogs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/blogs')}
//                                                         >
//                                                             Blogs
//                                                         </button>
//                                                     )}
//                                                     {navButtons.FAQs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/FAQs')}
//                                                         >
//                                                             FAQs
//                                                         </button>
//                                                     )}
//                                                     <button
//                                                         className="btn"
//                                                         style={{
//                                                             backgroundColor: bookButtonBgColor,
//                                                             border: 'none',
//                                                             color: '#fff',
//                                                         }}
//                                                         onClick={() => alert('Book an Appointment')}
//                                                     >
//                                                         Book an Appointment
//                                                     </button>
//                                                     {callNumber && (
//                                                         <a
//                                                             href={`tel:${callNumber}`}
//                                                             className="btn"
//                                                             style={{
//                                                                 backgroundColor: callButtonBgColor,
//                                                                 border: 'none',
//                                                                 color: '#fff',
//                                                                 textDecoration: 'none', // Ensure there's no underline
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                                 padding: '10px', // Adjust padding as needed
//                                                             }}
//                                                         >
//                                                             <i className="fas fa-phone-alt"></i>
//                                                         </a>
//                                                     )}

//                                                 </div>
//                                             </header>
//                                         ) : null}
//                                     </div>

//                                     <div className="footer-preview mt-4">
//                                         {displayOn === 'footer' || displayOn === 'both' ? (
//                                             <footer className="text-center p-3" style={{ backgroundColor: headerBgColor }}>
//                                                 {footerLogo && <img src={footerLogo} alt="Footer Logo" className="img-fluid rounded" style={{ maxWidth: '150px' }} />}
//                                                 <div className="btn-group" role="group">
//                                                     {navButtons.home && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/')}
//                                                         >
//                                                             Home
//                                                         </button>
//                                                     )}
//                                                     {navButtons.aboutUs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/aboutUs')}
//                                                         >
//                                                             About Us
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourServices && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourServices')}
//                                                         >
//                                                             Our Services
//                                                         </button>
//                                                     )}
//                                                     {navButtons.ourTeam && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/ourTeam')}
//                                                         >
//                                                             Our Team
//                                                         </button>
//                                                     )}
//                                                     {navButtons.blogs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/blogs')}
//                                                         >
//                                                             Blogs
//                                                         </button>
//                                                     )}
//                                                     {navButtons.FAQs && (
//                                                         <button
//                                                             className={`btn btn-${headerButtonSize} text-white`}
//                                                             style={{
//                                                                 backgroundColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderColor: transparentButtons ? 'transparent' : headerButtonColor,
//                                                                 borderWidth: '2px',
//                                                                 borderStyle: 'solid',
//                                                             }}
//                                                             onMouseOver={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonHoverColor)}
//                                                             onMouseOut={(e) => !transparentButtons && (e.currentTarget.style.backgroundColor = headerButtonColor)}
//                                                             onClick={() => navigate('/FAQs')}
//                                                         >
//                                                             FAQs
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </footer>
//                                         ) : null}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}