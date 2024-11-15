// server/routes/formRoutes.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Create a new form
router.post('/create', async (req, res) => {
    try {
        const { title, inputs } = req.body;
        const newForm = new Form({ title, inputs });
        await newForm.save();
        res.status(201).json(newForm);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create form' });
    }
});

// Get all forms
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
});

// Get a form by ID
router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        res.json(form);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch form' });
    }
});

// Update a form
router.put('/:id/edit', async (req, res) => {
    try {
        const { title, inputs } = req.body;
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, { title, inputs }, { new: true });
        res.json(updatedForm);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update form' });
    }
});



// Delete an input from a form
router.delete('/:id', async (req, res) => {
    try {
        await Form.findByIdAndDelete(req.params.id);
        res.json({ message: 'Form deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete form' });
    }
});

module.exports = router;
