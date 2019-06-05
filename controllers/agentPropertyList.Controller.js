const Property = require('../models/agentPropertyList.model.js');
const Role = require('../_helpers/role.js');

// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
    if(!req.body.propertyAddress ) {
        return res.status(400).send({
            message: "Property Address can not be empty"
        });
    }
	
	
    // Create a List
    const property = new Property({
									propertyAddress: req.body.propertyAddress || "Untitled List", 
									unitNumber: req.body.unitNumber,
									propertyType: req.body.propertyType,
									roomForRent: req.body.roomForRent,
									rentPrice: req.body.rentPrice,
									securityDeposit: req.body.securityDeposit,
									Beds: req.body.Beds,
									Baths: req.body.Baths,
									squareFeet: req.body.squareFeet,
									leaseDuration: req.body.leaseDuration,
									dateAvailable: req.body.dateAvailable,
									leaseTerms: req.body.leaseTerms,
									Description: req.body.Description,
									HidePropertyAddress: req.body.HidePropertyAddress,
									Name: req.body.Name,
									Email: req.body.Email,
									Phone: req.body.Phone,
									propertyOwner: req.body.propertyOwner,
									managementCompanyBroker: req.body.managementCompanyBroker,
									Tenant: req.body.Tenant,
									HidePhoneOnListing: req.body.HidePhoneOnListing,
									AC: req.body.AC,
									BalconyDeck: req.body.BalconyDeck,
									Furnished: req.body.Furnished,
									HardwoodFloor: req.body.HardwoodFloor,
									wheelchairAccess: req.body.wheelchairAccess,
									GarageParking: req.body.GarageParking,
									OffStreetParking: req.body.OffStreetParking,
									None: req.body.None,
									InUnit: req.body.InUnit,
									SharedInBuilding: req.body.SharedInBuilding,
									NoPetsAllowed: req.body.NoPetsAllowed,
									Catsok: req.body.Catsok,
									SmallDogsOk: req.body.SmallDogsOk,
									LargeDogsOk: req.body.LargeDogsOk,
									PhotosAndMedia: req.body.PhotosAndMedia,
									ProvideGeneralAvailabilityByDay: req.body.ProvideGeneralAvailabilityByDay,
									AllowRentalApplications: req.body.AllowRentalApplications,
									agentId: req.user.sub,
									createdDate: req.body.createdDate
		
      });

	  // Save List in the database
	  
	 
	
    property.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."    //500 Server Error
        });
    });
};



// Retrieve and return all properties from the database.
exports.findAll = (req, res) => {
    Property.find()
    .then(properties => {
        res.send(properties);
    }).catch(err => {
        res.status(404).send({       
            message: err.message || "Properties Not Found"            //404 Not Found Result
        });
    });
};


// Find a single list with a listId
exports.findOne = (req, res) => {
    Property.findById(req.params.listId)
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "Property not found with id " + req.params.listId
            });            
        }
        res.send(property);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving list with id " + req.params.listId
        });
    });
};


// Update a list identified by the listId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.propertyAddress) {
        return res.status(400).send({
            message: "Property Address can not be empty"       // 400 Bad Request
        });
    }

    // Find list and update it with the request body
    Property.findByIdAndUpdate(req.params.listId, {
        propertyAddress: req.body.propertyAddress || "Untitled List", 
									unitNumber: req.body.unitNumber,
									propertyType: req.body.propertyType,
									roomForRent: req.body.roomForRent,
									rentPrice: req.body.rentPrice,
									securityDeposit: req.body.securityDeposit,
									Beds: req.body.Beds,
									Baths: req.body.Baths,
									squareFeet: req.body.squareFeet,
									leaseDuration: req.body.leaseDuration,
									dateAvailable: req.body.dateAvailable,
									leaseTerms: req.body.leaseTerms,
									Description: req.body.Description,
									HidePropertyAddress: req.body.HidePropertyAddress,
									Name: req.body.Name,
									Email: req.body.Email,
									Phone: req.body.Phone,
									propertyOwner: req.body.propertyOwner,
									managementCompanyBroker: req.body.managementCompanyBroker,
									Tenant: req.body.Tenant,
									HidePhoneOnListing: req.body.HidePhoneOnListing,
									AC: req.body.AC,
									BalconyDeck: req.body.BalconyDeck,
									Furnished: req.body.Furnished,
									HardwoodFloor: req.body.HardwoodFloor,
									wheelchairAccess: req.body.wheelchairAccess,
									GarageParking: req.body.GarageParking,
									OffStreetParking: req.body.OffStreetParking,
									None: req.body.None,
									InUnit: req.body.InUnit,
									SharedInBuilding: req.body.SharedInBuilding,
									NoPetsAllowed: req.body.NoPetsAllowed,
									Catsok: req.body.Catsok,
									SmallDogsOk: req.body.SmallDogsOk,
									LargeDogsOk: req.body.LargeDogsOk,
									PhotosAndMedia: req.body.PhotosAndMedia,
									ProvideGeneralAvailabilityByDay: req.body.ProvideGeneralAvailabilityByDay,
									AllowRentalApplications: req.body.AllowRentalApplications,
									AllowRentalApplications: req.body.AllowRentalApplications,
									agentId: req.user.sub,
									createdDate: req.body.createdDate
    }, {new: true})
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(property);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error updating list with id " + req.params.listId
        });
    });
};



// Delete a list with the specified listId in the request
exports.delete = (req, res) => {
    Property.findByIdAndRemove(req.params.listId)
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "Property not found with id " + req.params.listId
            });
        }
        res.send({message: "Property deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Property not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Property with id " + req.params.listId
        });
    });
};