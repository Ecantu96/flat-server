module.exports = (app) => {
    const lists = require('../../controllers/agentCreatedlistcount.Controller.js');

    app.get('/aprtmentListCount', lists.findAll);
	
    app.get('/findAllRoomCount', lists.findAllRoomCount);


    app.get('/CountApplications', lists.countApplications);

    
}

