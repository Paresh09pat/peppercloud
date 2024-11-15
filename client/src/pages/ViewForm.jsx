import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewForm() {
  const [form, setForm] = useState(null);
  const { id } = useParams(); // Get form ID from URL params

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(response.data); // Store form data in state
      } catch (error) {
        console.error('Error fetching form for viewing:', error);
      }
    };

    fetchForm();
  }, [id]);

  return (
    <div>
      <h1>View Form</h1>
      {form ? (
        <div>
          {/* Display the Form Title */}
          <h3>Form Title: {form.title}</h3>

          {/* Display each form input's type, title, and placeholder (value) */}
          <div>
            {form.inputs.map((input, index) => (
              <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <p><strong>Type:</strong> {input.type}</p>
                <p><strong>Title:</strong> {input.title}</p>
                <p><strong>Value:</strong> {input.placeholder}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewForm;
