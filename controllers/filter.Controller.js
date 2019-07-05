const SearchResult = require('../models/filter.model.js');
const Property = require('../models/agentPropertyList.model.js');
const db = require('../config/db.js');
const Role = require('../_helpers/role.js');


// Create and Save a new List
exports.create = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
    const SearchResults = new SearchResult({
        price: req.body.price,
        neighborhoods: req.body.neighborhoods,
        Beds: req.body.Beds,
        Baths: req.body.Baths,
        Amenities: req.body.Amenities,
        Pets: req.body.Pets,
        Subway: req.body.Subway,
        SubwayStops: req.body.SubwayStops,
        NoFreeOnly: req.body.NoFreeOnly,
        SortResultsBy: req.body.SortResultsBy,
		currentUser: req.user.sub,
		
    });
	
	 // const ab = FavouriteList.findById(req.body.room_list_id);
	  
	
	
    SearchResults.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Application."
        });
    });
};



// Retrieve and return all lists from the database.
exports.findAll = (req, res) => {
	
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	
		var search_query =  {}
		
		if (req.body.rentPrice) {
			search_query.rentPrice = req.body.rentPrice;
		}
	   
	 Property.find(search_query)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(404).send({
            message: err.message || "Apartment List Not Found"
        });
    }); 
};


// Find a single list with a listId
exports.findOne = (req, res) => {
    SearchResult.findById(req.params.listId)
    .then(SearchResults => {
        if(!SearchResults) {
            return res.status(404).send({
                message: "SearchResults not found with id " + req.params.listId
            });            
        }
        res.send(SearchResults);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "SearchResults not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving SearchResults with id " + req.params.listId
        });
    });
};

