const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    questionsNecessary: { type: String, required: true },
    interestedRoommate: { type: String, required: true },
    questions: {
		
		LookingRoommate:{
		 Quiet: { type: String, required: false },
		 Loud: { type: String, required: false },
		 Tidy: { type: String, required: false },
		 Messy: { type: String, required: false }
		},
		
		LookingInRoommates:{
		 Quiet: { type: String, required: false },
		 Loud: { type: String, required: false },
		 Tidy: { type: String, required: false },
		 Messy: { type: String, required: false }
		},
		
		BedTime:{
		 time1: { type: String, required: false },
		 time2: { type: String, required: false },
		 time3: { type: String, required: false }
		},
		
		DoYouDrink:{
		 Yes: { type: String, required: false },
		 No: { type: String, required: false }
		},
		
		DoYouSmoke:{
		 Yes: { type: String, required: false },
		 No: { type: String, required: false },
		},
		
		LikeGoOut:{
		 Yes: { type: String, required: false },
		 No: { type: String, required: false }
		},
		
		Workhours:{
		 FullTime: { type: String, required: false },
		 PartTime: { type: String, required: false }, 
		 StudentFullTime: { type: String, required: false },
		 StudentPartTime: { type: String, required: false }
		} 
		
		
		
		
	},  
	  
    	
	
     createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('User', schema);  