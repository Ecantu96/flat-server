module.exports = (app) => {
    const lists = require('../../controllers/favouriteApplicant.Controller.js');

    // Create a new favouriteList to Agent by User
    app.post('/markFavouriteApplicant', lists.create);

    // Retrieve Fav. all Agent By Agent
    app.get('/allMarkApplicants', lists.viewAllMarkApplicants);
	
		
	 // Retrieve all Fav. Agent List By Agent
    app.get('/allUnmarkFav', lists.viewAllUnmarkFav);

    // Retrieve a single Applicant with property Id
       app.get('/viewFavMarkApplicant/:listId', lists.findMarkFavOne);

    // Update a List with noteId
    //app.put('/roomsList/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/roomsList/:listId', lists.delete);
}