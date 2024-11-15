import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function CreateForm() {
  const [formTitle, setFormTitle] = useState('');
  const [formInputs, setFormInputs] = useState([]);
  const [formId, setFormId] = useState(null); // Store form ID after creation
  const navigate = useNavigate();

  // Handle form title change
  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  // Handle adding a new input to the form
  const handleAddInput = (type) => {
    if (formInputs.length >= 20) {
      alert("You can't add more than 20 inputs.");
      return;
    }
    const newInput = {
      type,
      title: '',
      placeholder: '',
    };
    setFormInputs([...formInputs, newInput]);
  };

  // Handle input parameter changes
  const handleInputChange = (index, key, value) => {
    const updatedInputs = formInputs.map((input, i) => (
      i === index ? { ...input, [key]: value } : input
    ));
    setFormInputs(updatedInputs);
  };

  // Remove an input field
  const handleRemoveInput = (index) => {
    setFormInputs(formInputs.filter((_, i) => i !== index));
  };

  // Save the form to the backend
  const handleSaveForm = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/forms/create', {
        title: formTitle,
        inputs: formInputs,
      });
      if (response.status === 200) {
        alert('Form successfully submitted!');
        setFormId(response.data._id); // Store the form ID
        navigate(`/edit-form/${response.data._id}`); // Navigate to the edit page with the form ID
      }
    } catch (error) {
      console.error('Error saving form:', error.message);
    }
  };

  // Edit the form by navigating to the edit page
  const handleEditForm = () => {
    if (formId) {
      navigate(`/edit-form/${formId}`); // Navigate to edit page if formId exists
    } else {
      alert("Form not created yet!");
    }
  };

  return (
    <div className="create-form">
      <h1>Create Form</h1>
      <input
        type="text"
        placeholder="Form Title"
        value={formTitle}
        onChange={handleTitleChange}
      />

      {/* Buttons to Add Different Types of Inputs */}
      <div className="add-input-buttons">
        <button onClick={() => handleAddInput('text')}>Add Text Input</button>
        <button onClick={() => handleAddInput('email')}>Add Email Input</button>
        <button onClick={() => handleAddInput('number')}>Add Number Input</button>
        <button onClick={() => handleAddInput('password')}>Add Password Input</button>
        <button onClick={() => handleAddInput('date')}>Add Date Input</button>
        <button onClick={() => handleAddInput('tel')}>Add Contact Number</button>
        <button onClick={() => handleAddInput('textarea')}>Add Address</button>
      </div>

      <div className="form-inputs">
        {formInputs.map((input, index) => (
          <div key={index} className="input-field">
            <select
              value={input.type}
              onChange={(e) => handleInputChange(index, 'type', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="password">Password</option>
              <option value="date">Date</option>
              <option value="tel">Contact Number</option>
              <option value="textarea">Address</option>
            </select>
            <input
              type="text"
              placeholder="Input Title"
              value={input.title}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            />
            <input
              type="text"
              placeholder="Placeholder"
              value={input.placeholder}
              onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
            />
            <button onClick={() => handleRemoveInput(index)}>Remove</button>
          </div>
        ))}
      </div>

      <button onClick={handleSaveForm}>Save Form</button>

      {/* Edit Button to Navigate to the Edit Page */}
      {formId && (
        <button onClick={handleEditForm}>Edit Form</button>
      )}

      <div>
        <NavLink to="/"> Home Page</NavLink>
      </div>

    </div>
  );
}

export default CreateForm;
