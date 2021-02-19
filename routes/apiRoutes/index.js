// Required modules
const router = require('express').Router();
const { 
    readNotes, 
    validateNote, 
    createNote, 
    deleteNote 
} = require('../../lib/notes');

// Get all notes
router.get('/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

// Create a new note
router.post('/notes', (req, res) => {
    const notes = readNotes();

    if (!validateNote(req.body)) {
        res.status(400).send('Note is not properly formatted.');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

// Delete an existing note based on note id
router.delete('/notes/:id', (req, res) => {
    const notes = readNotes();

    if (!req.params.id) {
        res.status(400).send('No id found.');
    } else {
        const deletedNote = deleteNote(req.params.id, notes);
        res.json(deletedNote);
    }
});

module.exports = router;