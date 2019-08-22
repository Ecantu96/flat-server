const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const favPropertySchema = new Schema({
	    
      
		favMark: { type: Boolean, required: false },
		
		Roommate_id: { type: String, required: false },
		
		PropertyList_id:{ type: String, required: false }, 
		
		agentId:{ type: String, required: false }, 
		
		
				
      createdDate: { type: Date, default: Date.now }

});

favPropertySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FavProperty', favPropertySchema);
