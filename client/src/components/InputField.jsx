import React from 'react';

function InputField({ type, title, placeholder, onDelete }) {
    return (
        <div className="input-field">
            <label>{title} ({type})</label>
            <input type={type} placeholder={placeholder} readOnly />
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default InputField;
