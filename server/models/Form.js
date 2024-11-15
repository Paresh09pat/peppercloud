// server/models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    inputs: [
        {
            type: { type: String, required: true },
            title: { type: String },
            placeholder: { type: String },
        },
    ],
});

module.exports = mongoose.model('Form', formSchema);
