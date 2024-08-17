import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ImageModal({ show, handleClose, imageUrl, altText }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img 
                    src={imageUrl} 
                    alt={altText} 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ImageModal;
