module.exports = (app) => {
    const lists = require('../../controllers/ListAllSentApplication.Controller.js');
     const User_id =  require('../../controllers/ListAllSentApplication.Controller.js');
    // Create a new list Application
    app.post('/listApplication', lists.create);
	
	//Application List Accept/Decline by Agent
    app.post('/applicationAccept', lists.accept);
	
    // Retrieve all list applications
    app.get('/listApplicationByAgent', lists.fetchAllApplicationListbyAgent);
	
	//Retrieve All accepted Applications
    app.get('/acceptedAgentApplications', lists.fetchAcceptedApplicationListbyAgent);
	
		//Retrieve All Declined Applications
    app.get('/declinedAgentApplications', lists.fetchDeclienedApplicationListbyAgent);
	
	 // View All Apllicant By Agent
      app.get('/viewAllApplicant', lists.ViewAllApplicantByAgent);
	  
	  //Search By Name List
      app.get('/searchTitleList', lists.searchByname);   
	  
	  
	   // View All Apllicant By Agent
      app.get('/viewSingleApplicant/:User_id', lists.ViewSingleApplicantByAgent);
	  
	  
	// People who also interested List
    app.get('/alsoInterstedInList', lists.alsoInterstedinList);
	  

    // Retrieve a single List with noteId 
      app.get('/listApplication/:listId', lists.findOne);

    // Update a List with noteId
     app.put('/listApplication/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/roomsList/:listId', lists.delete);
}