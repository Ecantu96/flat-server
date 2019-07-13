module.exports = (app) => {
    const lists = require('../../controllers/apartmentList.Controller.js');

    // Create a new List
    app.post('/createAparmentList', lists.create);

    // Retrieve all List
    app.get('/aparmentList', lists.findAll);
	
	//View Fav apartment list by Roommate
    app.get('/find-fav-apartment', lists.findFavlist);

    // Retrieve a single List with noteId
    app.get('/aparmentList/:listId', lists.findOne);

    // Update a List with noteId
    app.put('/aparmentList/:listId', lists.update);

    // Delete a List with noteId
    app.delete('/aparmentList/:listId', lists.delete);
}