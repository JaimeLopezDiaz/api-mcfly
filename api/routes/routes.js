module.exports = (app) => {

    const noteController = require('../controllers/noteController');

    //Note services
    app.post('/api/note', noteController.addNote);
    app.get('/api/note', noteController.listAllNotes);
    app.get('/api/note/:noteId', noteController.listNote);
    app.put('/api/note/:noteId', noteController.addFavouriteNote);
    app.get('/api/favourite', noteController.listFavouriteNotes);

};