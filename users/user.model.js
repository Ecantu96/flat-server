const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('_helpers/role');


const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
	questionsNecessary: { type: String, required: false },
    interestedRoommate: { type: String, required: false },
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
		},
		
		
		
	},  
	
	Images:{
		
		
				ProfileImage:{
				imageName: { type: String, required: false  },
				imageData: { type: 'Buffer',
					 required: false ,
					 data: [  104, 101, 108, 108, 111, 32, 98, 117, 102, 102, 101, 114  ] 

					}

				},
				CoverImage:{
				   imageName: { type: String, required: false  },
					imageData: { type: 'Buffer',
					 required: false ,
					 data: [  101, 114, 32, 101, 111, 117, 98, 104, 109, 108, 107, 108  ] 

					}
				}
					
					  
	
	},
	
	  DOB: { type: String },	
	  gender: { type: String },	
      Role: { type: String, required: true },
     createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('User', schema);  