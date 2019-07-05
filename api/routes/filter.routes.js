module.exports = (app) => {
    const lists = require('../../controllers/filter.Controller.js');


     app.post('/searchResultCreate', lists.create);
    // Create a new List
    app.get('/searchResult', lists.findAll);
	
    // Delete a List with noteId
    //app.delete('/SearchList/:listId', lists.delete);
}