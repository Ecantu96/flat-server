module.exports = (app) => {
    const properties = require('../../controllers/favouritePropertyList.Controller.js');

    // Create a new List
    app.post('/MarkFavouriteProperty', properties.create);

    // Retrieve all List
    app.get('/FindFavrouiteList', properties.findFavPropertyList);
	
	
    // Retrieve a single List with noteId
    //app.get('/property/:listId', properties.findOne);

   
    // Delete a List with noteId
    app.delete('/property/:listId', properties.delete);
}