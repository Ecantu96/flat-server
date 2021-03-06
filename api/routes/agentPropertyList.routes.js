module.exports = (app) => {
    const properties = require('../../controllers/agentPropertyList.Controller.js');

    // Create a new List
    app.post('/AddProperty', properties.create);

    // Retrieve all List
    app.get('/property', properties.findAll);
	
	 // Retrieve all List for User
    app.get('/properties', properties.findAllListForUsers);
	
	
	 // Retrieve Property List for Landing Page
    app.get('/property-landing', properties.findPropertyLanding);
	
		 // Retrieve Property List for Landing Page
    app.get('/property-few-landing', properties.findPropertyFewLanding);
	
    app.get('/property-agent-details', properties.findPropertyAgentForLanding);
   
    // Retrieve a single List with noteId
    app.get('/Favproperty/:listId', properties.findOne);

    // Update a List with noteId
    app.put('/property/:listId', properties.update); 

    // Delete a List with noteId
    app.delete('/property/:listId', properties.delete);
}