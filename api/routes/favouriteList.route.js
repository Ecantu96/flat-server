module.exports = (app) => {
    const lists = require('../../controllers/favouriteList.Controller.js');

    // Create a new List
    app.post('/favouriteList', lists.create);

    // Retrieve all List
    app.get('/fetchallFavListByAgent', lists.fetchallFavListByAgent);
	
	 // Retrieve all List By User
    app.get('/fetchallFavListByUser', lists.fetchallFavListByUser);

    // Retrieve a single List with noteId
       app.get('/fetchallFavList/:listId', lists.findFavOne);

    // Update a List with noteId
    //app.put('/roomsList/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/roomsList/:listId', lists.delete);
}