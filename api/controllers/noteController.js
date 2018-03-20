'use strict';

const Note = require('../models/Note');

exports.addNote = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({message: "Note can not be empty"});
    }

    let note = new Note({
        content: req.body.content,
        user: req.body.user
    });

    note.save((err, data) => {
        if(err) {
           console.log(err);
           return res.status(500).send({message: "Some error occurred while creating the Note."});
        }
        res.json("The note was created correctly");
    });
};

exports.listAllNotes = (req, res) => {
    Note.find({}, (err, notes) => {
        if(err){
            console.log(err);
            return res.status(500).send({message: "Some error occurred while listing all the notes."});
        }
        res.json(notes);
    });
};

exports.listNote = (req, res) => {
    Note.findById(req.params.noteId, (err, note) => {
        if (err){
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: `Note with id ${req.params.noteId} not found`});
            }
            return res.status(500).send({message: `Error retrieving note with id ${req.params.noteId}`});
        }

        if(!note) {
            return res.status(404).send({message: `Note with id ${req.params.noteId} not found`});
        }

        res.json(note);
    })
};

exports.addFavouriteNote = (req, res) => {
    Note.findById(req.params.noteId, (err, note) => {
        if(err) {
            console.log(err);
            if(err.kind === "ObjectId") {
                return res.status(404).send({message: `Note with id ${req.params.noteId} not found`});
            }
            return res.status(500).send({message: `Error finding note with id ${req.params.noteId}`});
        }

        if(!note) {
            return res.status(404).send({message: `Note with id ${req.params.noteId} not found`});
        }

        note.favourite = req.body.favourite;

        note.save((err, data) => {
            if(err) {
                return res.status(500).send({message: `Could not update note with id ${req.params.noteId}`});
            }
            res.json(data);
        });
    });
};

exports.listFavouriteNotes = (req, res) => {
    Note.find({favourite: true}, (err, notes) => {
        if(err){
            console.log(err);
            return res.status(500).send({message: "Some error occurred while listing all the favourite notes."});
        }
        res.json(notes);
    });
};