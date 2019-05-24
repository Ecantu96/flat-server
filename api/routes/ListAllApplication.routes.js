module.exports = (app) => {
    const lists = require('../../controllers/ListAllSentApplication.Controller.js');

    // Create a new list Application
    app.post('/listApplication', lists.create);
	
	//Application List Accept/Decline by Agent
    app.post('/applicationAccept', lists.accept);
	
    // Retrieve all list applications
    app.get('/listApplicationByAgent', lists.fetchAllApplicationListbyAgent);
	
	 // View All Apllicant By Agent
      app.get('/viewAllApplicant', lists.ViewAllApplicantByAgent);

    // Retrieve a single List with noteId
      app.get('/listApplication/:listId', lists.findOne);

    // Update a List with noteId
     app.put('/listApplication/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/roomsList/:listId', lists.delete);
}