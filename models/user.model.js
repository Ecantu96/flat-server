const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('_helpers/role');


const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
	questionsNecessary: { type: String, required: false },
    interestedRoommate: { type: String, required: false },
	 questions: {
		 
					 LookingRoommate: {
						type: String,
						"enum": ["Quiet", "Loud", "Tidy", "Messy"]
					},
			
					
					LookingInRoommates:{   
					 type: String,
								"enum": ["Quiet", "Loud", "Tidy", "Messy"]
					},
					
					typeofperson:{
						type: String,
								"enum": ["Quiet", "Loud", "Tidy", "Messy"]
					},
					
					DoYouDrink:{ type: Boolean, required: false, default: false },
							
					DoYouSmoke:{ type: Boolean, required: false, default: false },
							
					LikeGoOut:{ type: Boolean, required: false, default: false },    
					    
					Workhours:{ 
							type: String, 
							 "enum": ["FullTime", "PartTime", "StudentFullTime", "StudentPartTime"]
					 },
					BedTime:{ 
							 type: String, 
							 "enum": ["time1", "time2", "time3" ]
					},
					RelationshipStatus:{  
						 type: String, 
						"enum": ["Single", "onRelationship", "Married"]
						
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
	
	DOB: { type: Date, default: Date.now },	
	gender: { type: String },	
	Role: { type: String, required: true },
	createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('User', schema);  