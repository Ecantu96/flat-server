module.exports = (app) => {
    const lists = require('../../controllers/favouriteRoommate.Controller.js');

    // Create a new favourite Roomate
    app.post('/favouriteRoomate', lists.create);
	
	
    // Retrieve all favourite marked Roommate
    app.get('/fetchAllRoommateByuser', lists.fetchAllRoommateByuser);
	
	
	   // Retrieve all favourite Unmarked Roommate
    app.get('/fetchUnMarkfavouriteRoommate', lists.fetchAllUnMarkRoommate);
	
	//match Roommates By User
    app.get('/matchUsers', lists.matchUsers);
	
	 // Retrieve all List By User
   // app.get('/fetchallFavListByUser', lists.fetchallFavListByUser);

    // Retrieve a single List with noteId
     //  app.get('/fetchallFavList/:listId', lists.findFavOne);

    // Update a List with noteId
    //app.put('/roomsList/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/roomsList/:listId', lists.delete);
}