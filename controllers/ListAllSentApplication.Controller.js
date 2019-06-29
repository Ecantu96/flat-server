const ListSentApplication = require('../models/ListAllSentApplication.model.js');
const Role = require('../_helpers/role.js');

       
// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
    
	//const Userid = parseInt(req.params.id);
    // Create a List
    const listSentApplications = new ListSentApplication({
        appliedList: req.body.appliedList,
        AppliedList_Id: req.body.AppliedList_Id,
        User_id: req.body.User_id,
		currentUser: req.user.sub
				
    });
	
	


	  // Save List in the database
	  
	 // const ab = FavouriteList.findById(req.body.room_list_id);
	  
	if(  listSentApplications.AppliedList_Id == "" ){
		return res.status(400).json({ message: 'Applied List Id cant empty' });   //Bad Request
    }
	
    listSentApplications.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Application."
        });
    });
};



//Accept/Decline a application list based on true/false
exports.accept = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
   
	
	//const Userid = parseInt(req.params.id);
    // Create a List
    const accecptSentApplications = new ListSentApplication({
        AppliedList_Id: req.body.AppliedList_Id,
        User_id: req.body.User_id,
		currentUser: req.user.sub,
		Agent_Accept: req.body.Agent_Accept
		
    });

	  // Save List in the database
	  
	 // const ab = FavouriteList.findById(req.body.room_list_id);
	  
	if(  accecptSentApplications.AppliedList_Id == "" ){
		return res.status(400).json({ message: 'Applied List Id cant empty' });
    }
	
	
	
    accecptSentApplications.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        });
    });
};




// Retrieve and return all lists from the database.
exports.fetchAllApplicationListbyAgent = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);   
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	 //Applied List
	//var Agent_accept = ListSentApplication.find( { Agent_Accept: "true" } );
	
    ListSentApplication.find()
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite Roommate."
        });
    });
};


// Retrieve and return all lists from the database.
exports.fetchAcceptedApplicationListbyAgent = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	 //Applied List
	var applied_list = ListSentApplication.find( { appliedList: "true" } );
	
    ListSentApplication.find(applied_list)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Accepted Lists."
        });
    });
};




// Retrieve and return all lists from the database.
exports.fetchDeclienedApplicationListbyAgent = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	 //Applied List
	var decliend_list = ListSentApplication.find( { appliedList: "false" } );
	
    ListSentApplication.find(decliend_list)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Decliened Lists."
        });
    });
};



// Retrieve and return all Applicants BY Agent
exports.ViewAllApplicantByAgent = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
   if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    } 
	
		
	 			
		var Agent_accept = ListSentApplication.find( { Agent_Accept: "true" } );
		
	   ListSentApplication.find(Agent_accept)
      .then(list => list ? res.send(list) : res.sendStatus(404).json({ message: 'Not Found' }) )
       .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Applicants."
        });
    });  
	
};


// Retrieve and return all Applicants By Agent
exports.ViewSingleApplicantByAgent = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
   if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    } 
	
		
	 	/* ListSentApplication.distinct( "User_id" )
		.then(lists => {
        res.send(lists);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Favourite Roommate."
			});
		}); */
		
	   var Agent_accept = ListSentApplication.find( { Agent_Accept: "true" } );
		
	   ListSentApplication.findOne(Agent_accept)
      .then(list => list ? res.send(list) : res.sendStatus(404).json({ message: 'Not Found' }) )
       .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Applicant."
        });
    });  
	
};


// People who also interested List
exports.alsoInterstedinList = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
   if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    } 
	
					
			ListSentApplication.aggregate([
			 
						 { $group: { 
				_id: { AppliedList_Id: "$AppliedList_Id", value: "$value" },
				count: { $sum:  1 },
				 User_id: { $push: "$User_id" }
			}},
			{ $match: {
				count: { $gt : 1 }
			}}
			]).then(list => list ? res.send(list) : res.sendStatus(404).json({ message: 'Not Found' }) )
			   .catch(err => {
				res.status(500).send({
					message: err.message || "Some error occurred while retrieving Applicants."
				});
			}); 
		
			   			
			
};

 



// Find a single list with a listId
exports.findOne = (req, res) => {
	
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	//return res.send({User_id:req.body.User_id});
	
     ListSentApplication.findById(req.params.listId)
    .then(listSentApplications => {
        if(!listSentApplications) {
            return res.status(404).send({
                message: "List Application not found with id " + req.params.listId
            });            
        }
        res.send(listSentApplications);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List Application not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving List Applications with id " + req.params.listId
        });
    }); 
};


// Update a list identified by the listId in the request
exports.update = (req, res) => {
	
		const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	   
    // Find list and update it with the request body
    ListSentApplication.findByIdAndUpdate(req.params.listId, {
       appliedList: req.body.appliedList,
        AppliedList_Id: req.body.AppliedList_Id,
        User_id: req.body.User_id,
    }, {new: true})
    .then(listSentApplications => {
        if(!listSentApplications) {
            return res.status(404).send({
                message: "List Application not found with id " + req.params.listId
            });
        }
        res.send(listSentApplications);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List Application not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error updating list with id " + req.params.listId
        });
    });
};





