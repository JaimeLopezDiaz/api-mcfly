const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: {type: String, required: true},
    user: {type: String, required: true},
    favourite: {type: Boolean, default: false}
});

module.exports = mongoose.model('Note', noteSchema);