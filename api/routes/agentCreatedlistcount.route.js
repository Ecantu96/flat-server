module.exports = (app) => {
    const lists = require('../../controllers/agentCreatedlistcount.Controller.js');

    // Create a new List
   // app.post('/aparmentList', lists.create);

    // Retrieve all List
    app.get('/aprtmentListCount', lists.findAll);
	
    app.get('/findAllRoomCount', lists.findAllRoomCount);

    // Retrieve a single List with noteId
    //app.get('/aparmentList/:listId', lists.findOne);

    // Update a List with noteId
   // app.put('/aparmentList/:listId', lists.update);

    // Delete a List with noteId
    //app.delete('/aparmentList/:listId', lists.delete);
}

