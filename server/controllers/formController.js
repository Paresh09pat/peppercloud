const Form = require('../models/formModel'); 

// Create a new form
exports.createForm = async (req, res) => {
    try {
        const { title, inputs } = req.body;
        const newForm = new Form({
            title,
            inputs,
        });
        const savedForm = await newForm.save();
        res.status(200).json(savedForm);
    } catch (error) {
        console.error("Error creating form: ", error);
        res.status(500).json({ error: 'Error creating form' });
    }
};

// Get a form by ID
exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        console.error('Error fetching form:', error);
        res.status(500).json({ error: 'Error fetching form' });
    }
};

// Update form by ID
exports.updateFormById = async (req, res) => {
    try {
        const { title, inputs } = req.body;
        const updatedForm = await Form.findByIdAndUpdate(
            req.params.id,
            { title, inputs },
            { new: true } // Return the updated document
        );

        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(updatedForm);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: 'Error updating form' });
    }
};


// Get all forms
exports.getAllForms = async (req, res) => {
    try {
        // Find all forms in the database
        const forms = await Form.find();

        // Respond with the list of all forms
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ message: 'Error fetching forms.' });
    }
};
