import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditForm() {
  const [form, setForm] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formInputs, setFormInputs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get form ID from URL params

  useEffect(() => {
    if (!id) {
      console.error('No form ID found in the URL');
      return;
    }

    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(response.data);
        setFormTitle(response.data.title);
        setFormInputs(response.data.inputs);
      } catch (error) {
        console.error('Error fetching form for editing:', error);
      }
    };

    fetchForm();
  }, [id]);

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  const handleInputChange = (index, key, value) => {
    const updatedInputs = formInputs.map((input, i) =>
      i === index ? { ...input, [key]: value } : input
    );
    setFormInputs(updatedInputs);
  };

  const handleSaveForm = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/forms/${id}`, {
        title: formTitle,
        inputs: formInputs,
      });
      alert('Form updated successfully!');
      navigate('/'); // Navigate back to the home page after saving
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <div>
      <h1>Edit Form</h1>
      {form ? (
        <div>
          {/* Editable Form Title */}
          <input
            type="text"
            value={formTitle}
            onChange={handleTitleChange}
            placeholder="Form Title"
            style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
          />

          <div>
            {/* Editable Form Inputs */}
            {formInputs.map((input, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3>Edit Input {index + 1}</h3>
                
                <div style={{ marginBottom: '10px' }}>
                  {/* Editable Input Type */}
                  <label>Input Type: </label>
                  <select
                    value={input.type}
                    onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                    style={{ marginRight: '10px' }}
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="password">Password</option>
                    <option value="date">Date</option>
                    <option value="tel">Contact Number</option>
                    <option value="textarea">Textarea</option>
                  </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  {/* Editable Input Title */}
                  <label>Input Title: </label>
                  <input
                    type="text"
                    value={input.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    placeholder="Input Title"
                    style={{ marginRight: '10px', padding: '8px', width: '60%' }}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  {/* Editable Placeholder */}
                  <label>Placeholder: </label>
                  <input
                    type="text"
                    value={input.placeholder}
                    onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
                    placeholder="Placeholder"
                    style={{ padding: '8px', width: '60%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <button onClick={handleSaveForm} style={{ padding: '10px 20px', marginTop: '20px' }}>
            Save Changes
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditForm;
