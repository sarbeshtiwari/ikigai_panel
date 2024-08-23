import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Overview = ({ isOpen, onClose, description }) => {
  const { id } = useParams();
  const [editorHtml, setEditorHtml] = useState('');

  useEffect(() => {
    setEditorHtml(description);
  }, [description]);

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden={!isOpen}
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Dimmed background
    >
      <div className="modal-dialog modal-dialog-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">{id}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h1>Overview</h1>
            <div
              dangerouslySetInnerHTML={{ __html: editorHtml }} // Render HTML content
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
