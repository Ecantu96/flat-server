module.exports = (app) => {
	
    const lists = require('../../controllers/neighbourhood.Controller.js');
	
	
    // Create a new List
    app.post('/neighbourhood', lists.create);
	
	
    // Retrieve latest 5 Lists
    app.get('/neighbourhoodList', lists.findAll);
	
	// Retrieve and return Appartment List Based on Neighbourhood ID from the database for Landing Page
	app.get('/appartmentByNeighbourhood/:Neighborhood_id', lists.aprtmentBasedonNiegbourhood);
	
	
	// Retrieve and return Roommate List Based on Neighbourhood ID from the database for Landing Page
	app.get('/roommatesByNeighbourhood/:Neighborhood_id', lists.roommateBasedonNiegbourhood);
	
	
	// Retrieve aprtment Location Based on Neighbourhood ID from the database for Landing Page
	app.get('/location-basedon-neighbourhood/:Neighborhood_id', lists.LocationsbasedonNeighborhood);
	
		
	// Retrieve Appartments Counts Lists
    app.get('/appartmentsCounts', lists.apartmentListCount);
	
	// Retrieve Appartments Counts Lists for Landing Page
    app.get('/appartmentsCountsLanding', lists.apartmentListCount);
	
	// Retrieve Roommate Counts Lists
    app.get('/roommateCount', lists.roommateCounts);
	
	// Retrieve UserLocations Counts Lists
    app.get('/locationCount', lists.LocationCount);
	
	// Retrieve UserLocations Counts Lists for Landing Page
    app.get('/locationCountLanding', lists.LocationCount);
	
	
	 // Retrieve all Neighborhoods Lists
    app.get('/AllNeighborhoods', lists.AllNeighborhoods);
	
	 // Retrieve all Neighborhoods Lists
    app.get('/infoNeighborhoodsLanding', lists.AllNeighborhoods);
	
	//Retrieve All Fav Neighbourhoods List
    app.get('/AllFavNeighborhoods', lists.FavNeighbourhoodList);
	
	
    // Update a List with list id
    app.put('/neighbourhood/:listId', lists.update);

    // Delete a List with list id
    app.delete('/neighbourhood/:listId', lists.delete);
}