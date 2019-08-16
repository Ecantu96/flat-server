module.exports = (app) => {
    const lists = require('../../controllers/filter.Controller.js');


  
    app.get('/searchResult', lists.findAll);
	
	//Search Main Filter as per site filter requirement
    app.get('/filter', lists.FilterAsPerGiven);
	
	//Search For Amenities
    app.get('/amenities_search', lists.AmenitiesSearch);
	
	//return required data of apartment to display on search result
    app.get('/apartment_search', lists.ApartmentSearch);
	
	//Landing Page based On ID
    app.get('/list_details', lists.InnerDetailsPage);
	

	
    // Delete a List with noteId
    //app.delete('/SearchList/:listId', lists.delete);
}