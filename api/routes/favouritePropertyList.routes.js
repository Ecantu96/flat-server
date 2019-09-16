module.exports = (app) => {
    const properties = require('../../controllers/favouritePropertyList.Controller.js');

    // Create a new List
    app.post('/MarkFavouriteProperty', properties.create);

    // Retrieve all Fav marked Math Results
    app.get('/FindFavrouiteMarkedPropertyList', properties.findFavPropertyList);
	
	
    //Retrieve Favorite Marked only
	
	 app.get('/FetchFavMarked', properties.find);
	 
	 //Fetch Users who interted in properties
	 app.get('/findUserInterestInproperty', properties.findUserInterestInproperty);

   
    // Delete a List with noteId
    app.delete('/property/:listId', properties.delete);
}