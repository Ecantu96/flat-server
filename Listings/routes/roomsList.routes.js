module.exports = (app) => {
    const lists = require('../controllers/roomsList.controller.js');

    // Create a new List
    app.post('/roomsList', lists.create);

    // Retrieve all List
    app.get('/roomsList', lists.findAll);

    // Retrieve a single List with noteId
    app.get('/roomsList/:listId', lists.findOne);

    // Update a List with noteId
    app.put('/roomsList/:listId', lists.update);

    // Delete a List with noteId
    app.delete('/roomsList/:listId', lists.delete);
}