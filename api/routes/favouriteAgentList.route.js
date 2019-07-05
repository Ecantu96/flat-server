module.exports = (app) => {
    const lists = require('../../controllers/favouriteAgentList.Controller.js');

    // Create a new favouriteList to Agent by User
    app.post('/markFavouriteByUser', lists.create);

    // Retrieve Fav. all Agent By Agent
    app.get('/fetchallFavListByAgent', lists.fetchallFavListByAgent);
	
	 // Retrieve all Fav. Agent By User
    app.get('/fetchallFavListByUser', lists.fetchallFavListByUser);
	
	 // Retrieve all Fav. Agent List By User
    app.get('/fetchallUnFavListByUser', lists.fetchallUnfavouriteListByUser);

    // Retrieve a single Agent with noteId
       app.get('/fetchallFavList/:listId', lists.findFavOne);

    // Update a List with noteId
    //app.put('/roomsList/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/roomsList/:listId', lists.delete);
}