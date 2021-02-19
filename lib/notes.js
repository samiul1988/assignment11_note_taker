// Require modules
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbPath = '../db/db.json';

module.exports.readNotes = () => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, dbPath)));
    return notes;
};

module.exports.createNote = ({title, text}, notesArr) => {
    let id = uuidv4(); // creates new uuid
    let newNote = { id, title, text };
    
    // add new note to the db list
    notesArr.push(newNote); 
    fs.writeFileSync(
        path.join(__dirname, dbPath),
        JSON.stringify(notesArr, null, 2)
    );

    return newNote;
};

module.exports.validateNote = (note) => {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};

module.exports.deleteNote = (id, notesArr) => {
    let noteToBeDeleted = notesArr.find( note => note.id === id);

    if (noteToBeDeleted) {
        // remove note from the db list
        let filteredNotesArr = notesArr.filter(note => note.id !== id); 
        fs.writeFileSync(
            path.join(__dirname, dbPath),
            JSON.stringify(filteredNotesArr, null, 2)
        );
    }
    return noteToBeDeleted;
};