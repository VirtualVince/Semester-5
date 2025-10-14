const mongoose = require('mongoose');

// Define the Note Schema
const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true
    },
    dateAdded: {
        type: String,
        required: true
    },
    dateUpdated: {
        type: String,
        required: true
    }
});

// Create and export the model
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;