import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        
        if (Array.isArray(response.data)) {
          setForms(response.data);
        } else {
          console.error('Error: Response data is not an array', response.data);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleDeleteForm = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      setForms(forms.filter((form) => form._id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleEditForm = (id) => {
    navigate(`/edit-form/${id}`); // Navigate to edit page for the selected form
  };

  const handleViewForm = (id) => {
    navigate(`/view-form/${id}`); // Navigate to view page for the selected form
  };

  const handleCreateForm = () => {
    navigate('/create-form'); // Navigate to create form page
  };

  return (
    <div>
      <h1>Forms</h1>
      
      {/* Button to Create New Form */}
      <button onClick={handleCreateForm} style={{ marginBottom: '20px' }}>
        Create New Form
      </button>

      <div>
        {Array.isArray(forms) ? (
          forms.map((form) => (
            <div key={form._id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
              <h3>Form Title: {form.title}</h3>
              <button onClick={() => handleEditForm(form._id)}>Edit</button>
              <button onClick={() => handleViewForm(form._id)}>View</button>
              <button onClick={() => handleDeleteForm(form._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No forms available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
