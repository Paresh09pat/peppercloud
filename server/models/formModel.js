// models/formModel.js
const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    placeholder: { type: String },
});

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    inputs: [inputSchema],
});

module.exports = mongoose.model('Form', formSchema);
