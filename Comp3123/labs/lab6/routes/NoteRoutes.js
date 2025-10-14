const noteModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();

// Create a new Note
// POST http://localhost:8081/notes
noteRoutes.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        // Create a new note
        const note = new noteModel({
            noteTitle: req.body.content.noteTitle,
            noteDescription: req.body.content.noteDescription,
            priority: req.body.content.priority,
            dateAdded: req.body.content.dateAdded,
            dateUpdated: req.body.content.dateUpdated
        });

        // Save note to database
        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error occurred while creating the note."
        });
    }
});

// Retrieve all Notes
// GET http://localhost:8081/notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        // Find all notes
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error occurred while retrieving notes."
        });
    }
});

// Retrieve a single Note with noteId
// GET http://localhost:8081/notes/:noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        // Find note by ID
        const note = await noteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send(note);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    }
});

// Update a Note with noteId
// PUT http://localhost:8081/notes/:noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        // Find note and update
        const note = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            {
                noteTitle: req.body.content.noteTitle,
                noteDescription: req.body.content.noteDescription,
                priority: req.body.content.priority,
                dateAdded: req.body.content.dateAdded,
                dateUpdated: req.body.content.dateUpdated
            },
            { new: true } // Return the updated document
        );

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send(note);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    }
});

// Delete a Note with noteId
// DELETE http://localhost:8081/notes/:noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        // Find note and delete
        const note = await noteModel.findByIdAndDelete(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send({
            message: "Note deleted successfully!"
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    }
});

module.exports = noteRoutes;
