import React from 'react';
import './PostModel.css'; 

function PostModal({ show, onClose, post }) {
  if (!show) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
}

export default PostModal;
