const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listSentApplication = new Schema({
	
		appliedList: { type: Boolean, required: false },
		
		AppliedList_Id: { type: String, required: true },
					
		User_id: { type:String, required: true },
		
		currentUser: { type:String, required: false },
		
		Agent_Accept: { type: Boolean, required: false },
										
        createdDate: { type: Date, default: Date.now }

});

listSentApplication.set('toJSON', { virtuals: true });  

module.exports = mongoose.model('ListSentApplication', listSentApplication);


